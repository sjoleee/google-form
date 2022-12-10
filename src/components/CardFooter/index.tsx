import React from "react";
import { useDispatch } from "react-redux";

import { CardProps, copyCard } from "../../store";
import * as S from "./styles";

const CardFooter = ({ id }: Pick<CardProps, "id">) => {
  const dispatch = useDispatch();
  return (
    <S.Container>
      <S.Copy
        onClick={() => {
          dispatch(copyCard({ cardId: id, copiedCardId: String(Date.now()) }));
        }}
      />
      <S.Trash />
      <S.VerticalLine />
      <S.FormControlLabel
        control={<S.Switch name="required" />}
        label="필수"
        labelPlacement="start"
      />
    </S.Container>
  );
};

export default CardFooter;
