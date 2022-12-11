import React from "react";
import { useSelector } from "react-redux";

import { CardProps, InputTypes, StateProps } from "../../store";
import InputCheckbox from "../InputCheckbox";
import InputRadio from "../InputRadio";
import InputSelect from "../InputSelect";
import InputTextField from "../InputTextField";
import PreviewCardTitle from "../PreviewCardTitle";
import * as S from "./styles";

const PreviewCard = ({ id }: Pick<CardProps, "id">) => {
  const inputType = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.inputType;
  }) as string;

  const isTitle = inputType === InputTypes.TITLE;

  return (
    <S.Container>
      <S.Card>
        {isTitle ? <S.TitleHighlight /> : null}
        <PreviewCardTitle id={id} />
        {inputType === InputTypes.TEXT ? <InputTextField id={id} /> : null}
        {inputType === InputTypes.TEXTAREA ? <InputTextField id={id} /> : null}
        {inputType === InputTypes.RADIO ? <InputRadio id={id} /> : null}
        {inputType === InputTypes.CHECKBOX ? <InputCheckbox id={id} /> : null}
        {inputType === InputTypes.SELECT ? <InputSelect id={id} /> : null}
      </S.Card>
    </S.Container>
  );
};

export default PreviewCard;
