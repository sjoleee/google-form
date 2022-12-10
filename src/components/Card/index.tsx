import React from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { CardProps, focus, InputTypes, StateProps } from "../../store";
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

  const isFocused = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.isFocused;
  }, shallowEqual);

  const { inputType } = useSelector(
    (state: StateProps) => state.cards.find((card) => card.id === id) as CardProps,
    shallowEqual,
  );

  const setIsFocused = () => {
    if (!isFocused) dispatch(focus({ id }));
  };

  return (
    <S.Container isFocused={isFocused}>
      <S.Card
        isFocused={isFocused}
        isTitle={isTitle}
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
        {isFocused && !isTitle ? <CardFooter id={id} /> : null}
      </S.Card>
    </S.Container>
  );
};

export default React.memo(Card);
