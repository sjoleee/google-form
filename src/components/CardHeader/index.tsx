import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import * as S from "./styles";

const CardHeader = ({
  id,
  isTitle,
  isFocused,
  title,
}: {
  id: string;
  isTitle: boolean;
  isFocused: boolean;
  title: string;
}) => {
  const { control, setFocus, register } = useForm();
  useEffect(() => {
    if (isFocused) setFocus(id);
  }, [isFocused]);

  return (
    <Controller
      name="CardTitle"
      control={control}
      render={() => (
        <S.TextField
          {...register(id)}
          id="filled-basic"
          $isTitle={isTitle}
          $isFocused={isFocused}
          defaultValue={title}
          placeholder={isTitle ? "설문지 제목" : "질문"}
          variant="filled"
        />
      )}
    />
  );
};

export default CardHeader;
