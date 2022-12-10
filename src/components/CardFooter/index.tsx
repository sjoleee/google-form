import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { CardProps, copyCard, removeCard, toggleIsRequired } from "../../store";
import * as S from "./styles";

const CardFooter = ({ id }: Pick<CardProps, "id">) => {
  const dispatch = useDispatch();

  const isRequired = useSelector((state: CardProps[]) => {
    const currentCard = state.find((card) => card.id === id) as CardProps;
    return currentCard.isRequired;
  });

  const handleChange = () => {
    dispatch(toggleIsRequired({ id }));
  };

  return (
    <S.Container>
      <S.Copy
        onClick={(e) => {
          e.stopPropagation();
          dispatch(copyCard({ cardId: id, copiedCardId: String(Date.now()) }));
        }}
      />
      <S.Trash
        onClick={(e) => {
          e.stopPropagation();
          dispatch(removeCard({ cardId: id }));
        }}
      />
      <S.VerticalLine />
      <S.FormControlLabel
        control={<S.Switch name="required" checked={isRequired} onChange={handleChange} />}
        label="필수"
        labelPlacement="start"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </S.Container>
  );
};

export default CardFooter;
