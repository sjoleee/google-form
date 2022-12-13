import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { CardProps, focus, InputTypes, StateProps } from "../../store";
import CardFooter from "../CardFooter";
import CardHeader from "../CardHeader";
import ItemTypeSection from "../ItemTypeSection";
import TextFieldSection from "../TextFieldSection";
import * as S from "./styles";

export interface extendedCardProps extends CardProps {
  isTitle: boolean;
  idx: number;
}

const Card = ({ isTitle, id, idx }: extendedCardProps) => {
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
    <div>
      <Draggable draggableId={id} index={idx} key={id}>
        {(provided) => (
          <S.Container ref={provided.innerRef} {...provided.draggableProps} isFocused={isFocused}>
            <S.Card
              isFocused={isFocused}
              isTitle={isTitle}
              onClick={() => {
                setIsFocused();
              }}
            >
              {isTitle ? (
                <S.TitleHighlight />
              ) : (
                <S.CardDndHandle {...provided.dragHandleProps}>
                  <S.Dots />
                </S.CardDndHandle>
              )}
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
        )}
      </Draggable>
    </div>
  );
};

export default React.memo(Card);
