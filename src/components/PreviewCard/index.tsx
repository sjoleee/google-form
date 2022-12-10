import React from "react";
import { useSelector } from "react-redux";

import { CardProps, InputTypes, StateProps } from "../../store";
import * as S from "./styles";

const PreviewCard = ({ id }: Pick<CardProps, "id">) => {
  const inputType = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.inputType;
  }) as string;

  const isTitle = inputType === InputTypes.TITLE;

  return (
    <S.Contanier>
      <S.Card isTitle={isTitle}>{isTitle ? <S.TitleHighlight /> : null}</S.Card>
    </S.Contanier>
  );
};

export default PreviewCard;
