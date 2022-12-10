import React from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { CardProps, focus, InputTypes } from "../../store";
import CardFooter from "../CardFooter";
import CardHeader from "../CardHeader";
import ItemTypeSection from "../ItemTypeSection";
import TextFieldSection from "../TextFieldSection";
import * as S from "./styles";

export interface extendedCardProps extends CardProps {
  isTitle: boolean;
}

const Card = ({ isTitle, id }: extendedCardProps) => {
  const dispatch = useDispatch();

  const isFocused = useSelector((state: CardProps[]) => {
    const currentCard = state.find((card) => card.id === id) as CardProps;
    return currentCard.isFocused;
  }, shallowEqual);

  const { inputType } = useSelector(
    (state: CardProps[]) => state.find((card) => card.id === id) as CardProps,
    shallowEqual,
  );

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
        {inputType === InputTypes.TITLE ||
        inputType === InputTypes.TEXT ||
        inputType === InputTypes.TEXTAREA ? (
          <TextFieldSection id={id} />
        ) : (
          <ItemTypeSection id={id} />
        )}
        {isFocused ? <CardFooter id={id} /> : null}
      </S.Card>
    </S.Contanier>
  );
};

export default React.memo(Card);
