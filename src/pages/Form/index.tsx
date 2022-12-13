import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import * as S from "./styles";
import Card from "../../components/Card";
import AddCardButton from "../../components/AddCardButton";
import { InputTypes, moveCard, moveContent, StateProps } from "../../store";

const Form = () => {
  const { cards } = useSelector((state: StateProps) => state);
  const dispatch = useDispatch();

  const openPreviewTab = () => {
    window.open("/preview", "_blank");
  };

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) {
      return;
    }
    if (source.droppableId === "card" && destination.index === 0) {
      return;
    }
    if (source.droppableId === "card") {
      dispatch(
        moveCard({
          sourceIndex: String(source.index),
          destinationIndex: String(destination.index),
        }),
      );
    } else if (destination.droppableId === source.droppableId) {
      dispatch(
        moveContent({
          cardId: source.droppableId,
          sourceIndex: String(source.index),
          destinationIndex: String(destination.index),
        }),
      );
    }
  };

  return (
    <>
      <S.Header>
        <S.Eye onClick={openPreviewTab} />
      </S.Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="card" type="card" direction="vertical">
          {(provided) => (
            <S.Container {...provided.droppableProps} ref={provided.innerRef}>
              <S.CardList>
                {cards.map((card, idx) => (
                  <Card
                    key={card.id}
                    idx={idx}
                    isTitle={card.inputType === InputTypes.TITLE}
                    {...card}
                  />
                ))}
              </S.CardList>
              <AddCardButton />
              {provided.placeholder}
            </S.Container>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Form;
