import React from "react";
import { useDispatch } from "react-redux";

import { CardProps, focus, inputTypes } from "../../store";
import CardHeader from "../CardHeader";
import ItemTypeSection from "../ItemTypeSection";
import TextFieldSection from "../TextFieldSection";
import * as S from "./styles";

export interface extendedCardProps extends CardProps {
  isTitle: boolean;
}

const Card = ({ isTitle, id, isFocused, inputType }: extendedCardProps) => {
  const dispatch = useDispatch();

  const setIsFocused = () => {
    dispatch(focus({ id }));
  };

  return (
    <S.Contanier isFocused={isFocused}>
      <S.Card
        isFocused={isFocused}
        onClick={() => {
          setIsFocused();
        }}
      >
        {isTitle ? <S.TitleHighlight /> : null}
        <S.ClickHighlight isFocused={isFocused} />
        <CardHeader isTitle={isTitle} id={id} />
        {inputType === inputTypes.TITLE ||
        inputType === inputTypes.TEXT ||
        inputType === inputTypes.TEXTAREA ? (
          <TextFieldSection id={id} />
        ) : (
          <ItemTypeSection id={id} />
        )}
      </S.Card>
    </S.Contanier>
  );
};

export default React.memo(Card);
