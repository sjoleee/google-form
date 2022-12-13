import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  addEtcItem,
  addSelectItem,
  CardProps,
  InputTypes,
  ItemTypeProps,
  removeSelectItem,
  setText,
  StateProps,
} from "../../store";
import * as S from "./styles";

const ItemTypeSection = ({ id }: Pick<CardProps, "id">) => {
  const dispatch = useDispatch();

  const inputType = useSelector(
    (state: StateProps) => state.cards.find((card) => card.id === id)?.inputType,
  ) as string;

  const isFocused = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.isFocused;
  });

  const contents = useSelector(
    (state: StateProps) => state.cards.find((card) => card.id === id)?.contents,
  ) as ItemTypeProps[];

  const haveEtc = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    const contents = currentCard.contents as ItemTypeProps[];
    if (currentCard.inputType === InputTypes.CHECKBOX) {
      return true;
    }
    return contents.some((content) => content.isEtc);
  });

  const { control } = useForm();

  const handleChangeContentText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    contentId: string,
  ) => {
    dispatch(setText({ cardId: id, contentId, text: e.target.value }));
  };

  return (
    <div>
      <Droppable droppableId={id} type="content">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {contents.map((content, idx) => (
              <Draggable draggableId={content.id} index={idx} key={content.id}>
                {(provided) => (
                  <S.Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    key={content.id}
                    $isFocused={isFocused}
                  >
                    <S.ContentDndHandle $isFocused={isFocused} {...provided.dragHandleProps} />
                    {inputType === InputTypes.RADIO ? <S.Circle /> : null}
                    {inputType === InputTypes.CHECKBOX ? <S.Sqare /> : null}
                    {inputType === InputTypes.SELECT ? (
                      <S.NumberSpan>{contents.indexOf(content) + 1}</S.NumberSpan>
                    ) : null}
                    <Controller
                      name="TextFieldInput"
                      control={control}
                      render={() => (
                        <S.TextField
                          id="standard-basic"
                          $isFocused={isFocused}
                          variant="standard"
                          value={content.isEtc ? "기타..." : content.text}
                          onChange={(e) => {
                            handleChangeContentText(e, content.id);
                          }}
                          disabled={content.isEtc}
                        />
                      )}
                    />
                    {isFocused && contents.length > 1 ? (
                      <S.DeleteIcon
                        onClick={() => {
                          dispatch(removeSelectItem({ cardId: id, contentId: content.id }));
                        }}
                      />
                    ) : null}
                  </S.Container>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isFocused ? (
        <S.Container $isFocused={isFocused}>
          {inputType === InputTypes.RADIO ? <S.Circle /> : null}
          {inputType === InputTypes.CHECKBOX ? <S.Sqare /> : null}
          {inputType === InputTypes.SELECT ? (
            <S.NumberSpan>{contents.length + 1}</S.NumberSpan>
          ) : null}
          <S.ItemAddButton
            type="button"
            onClick={() => {
              const contentId = String(Date.now());
              dispatch(
                addSelectItem({
                  id,
                  contentId,
                  text: `옵션 ${contents.filter((content) => !content.isEtc).length + 1}`,
                }),
              );
            }}
          >
            옵션 추가
          </S.ItemAddButton>
          {inputType !== InputTypes.SELECT && !haveEtc ? (
            <>
              <span>또는</span>
              <S.EtcAddButton
                type="button"
                onClick={() => {
                  const contentId = String(Date.now());
                  dispatch(
                    addEtcItem({
                      id,
                      contentId,
                    }),
                  );
                }}
              >
                기타 추가
              </S.EtcAddButton>
            </>
          ) : null}
        </S.Container>
      ) : null}
    </div>
  );
};

export default ItemTypeSection;
