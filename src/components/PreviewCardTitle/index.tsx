import React from "react";
import { useSelector } from "react-redux";

import { CardProps, InputTypes, StateProps } from "../../store";
import * as S from "./styles";

const PreviewCardTitle = ({ id }: Pick<CardProps, "id">) => {
  const inputType = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.inputType;
  }) as string;

  const cardTitle = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.cardTitle;
  }) as string;

  const contents = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.contents;
  }) as string;

  const isRequired = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.isRequired;
  }) as boolean;

  const haveRequired = useSelector((state: StateProps) =>
    state.cards.some((card) => card.isRequired),
  ) as boolean;

  const isTitle = inputType === InputTypes.TITLE;

  return (
    <S.Container>
      <S.TitleSection>
        <S.Title isTitle={isTitle}>{cardTitle}</S.Title>
        {isRequired ? <S.RequireMark>*</S.RequireMark> : null}
      </S.TitleSection>
      {isTitle ? (
        <>
          <S.DescriptionSection>
            <S.Description>{contents}</S.Description>
          </S.DescriptionSection>
          <S.Footer>{haveRequired ? <S.RequireMark>* 필수항목</S.RequireMark> : null}</S.Footer>
        </>
      ) : null}
    </S.Container>
  );
};

export default PreviewCardTitle;
