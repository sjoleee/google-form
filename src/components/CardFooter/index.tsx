import React from "react";

import * as S from "./styles";

const CardFooter = () => (
  <S.Container>
    <S.Copy />
    <S.Trash />
    <S.VerticalLine />
    <S.FormControlLabel
      control={<S.Switch name="required" />}
      label="필수"
      labelPlacement="start"
    />
  </S.Container>
);

export default CardFooter;
