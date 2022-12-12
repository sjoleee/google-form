import React from "react";
import { useSelector } from "react-redux";

import * as S from "./styles";
import Card from "../../components/Card";
import AddCardButton from "../../components/AddCardButton";
import { InputTypes, StateProps } from "../../store";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Form = () => {
  const { cards } = useSelector((state: StateProps) => state);

  const openPreviewTab = () => {
    window.open("/preview", "_blank");
  };

  const onDragEnd = () => {
    console.log("drag");
  };

  return (
    <>
      <S.Header>
        <S.Eye onClick={openPreviewTab} />
      </S.Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="card" type="card">
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
            </S.Container>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Form;
