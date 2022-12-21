import React from "react";
import { Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { CardProps, copyCard, removeCard, StateProps, toggleIsRequired } from "../../store";
import * as S from "./styles";

const CardFooter = ({ id }: Pick<CardProps, "id">) => {
  const dispatch = useDispatch();

  const isRequired = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.isRequired;
  });

  const handleChange = () => {
    dispatch(toggleIsRequired({ id }));
  };

  return (
    <S.Container>
      <Tooltip title="복사">
        <S.Copy
          onClick={(e) => {
            e.stopPropagation();
            dispatch(copyCard({ cardId: id, copiedCardId: String(Date.now()) }));
          }}
        />
      </Tooltip>
      <Tooltip title="삭제">
        <S.Trash
          onClick={(e) => {
            e.stopPropagation();
            dispatch(removeCard({ cardId: id }));
          }}
        />
      </Tooltip>
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
