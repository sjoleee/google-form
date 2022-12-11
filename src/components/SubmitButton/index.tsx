import React from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";

const SubmitButton = () => {
  const { getValues } = useFormContext();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/preview/result", { state: getValues() });
  };

  return (
    <S.Button type="button" onClick={handleClick}>
      제출
    </S.Button>
  );
};

export default SubmitButton;
