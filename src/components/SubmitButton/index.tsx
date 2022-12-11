import React from "react";
import { useFormContext } from "react-hook-form";

import * as S from "./styles";

const SubmitButton = () => {
  const { getValues } = useFormContext();
  return (
    <S.Button
      type="button"
      onClick={() => {
        console.log(getValues());
      }}
    >
      제출
    </S.Button>
  );
};

export default SubmitButton;
