import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Tooltip } from "@mui/material";

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

  const onDragEnd = ({ destination, source }: DropResult) => {
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
        <Tooltip title="미리보기">
          <S.Eye onClick={openPreviewTab} />
        </Tooltip>
      </S.Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <S.Container>
          <Droppable droppableId="card" type="card" direction="vertical">
            {(provided) => (
              <div>
                <S.CardList {...provided.droppableProps} ref={provided.innerRef}>
                  {cards.map((card, idx) => (
                    <Card
                      key={card.id}
                      idx={idx}
                      isTitle={card.inputType === InputTypes.TITLE}
                      {...card}
                    />
                  ))}
                </S.CardList>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddCardButton />
        </S.Container>
      </DragDropContext>
    </>
  );
};

export default Form;
