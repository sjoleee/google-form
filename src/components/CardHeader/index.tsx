import { MenuItem, SelectChangeEvent } from "@mui/material";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import { inputTypes, typeChange } from "../../store";
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) setFocus(id);
  }, [isFocused]);

  const handleChange = (e: SelectChangeEvent<unknown>, child: React.ReactNode) => {
    dispatch(typeChange({ id, inputType: e.target.value as string }));
  };

  return (
    <S.Container>
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
      {!isTitle && isFocused ? (
        <Controller
          name="inputTypeSelect"
          control={control}
          render={() => (
            <S.Select onChange={handleChange} defaultValue={inputTypes.RADIO}>
              <MenuItem value={inputTypes.TEXT}>단답형</MenuItem>
              <MenuItem value={inputTypes.TEXTAREA}>장문형</MenuItem>
              <MenuItem value={inputTypes.RADIO}>객관식 질문</MenuItem>
              <MenuItem value={inputTypes.CHECKBOX}>체크박스</MenuItem>
              <MenuItem value={inputTypes.SELECT}>드롭다운</MenuItem>
            </S.Select>
          )}
        />
      ) : null}
    </S.Container>
  );
};

export default CardHeader;
