import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { addSelectItem, CardProps, inputTypes, ItemTypeProps, removeSelectItem } from "../../store";
import * as S from "./styles";

const ItemTypeSection = ({ id }: Pick<CardProps, "id">) => {
  const dispatch = useDispatch();

  const inputType = useSelector(
    (state: CardProps[]) => state.find((card) => card.id === id)?.inputType,
  ) as string;

  const isFocused = useSelector(
    (state: CardProps[]) => state.find((card) => card.id === id)?.isFocused,
  ) as boolean;

  const contents = useSelector(
    (state: CardProps[]) => state.find((card) => card.id === id)?.contents,
  ) as ItemTypeProps[];

  const { control } = useForm();

  return (
    <>
      {contents.map((content) => (
        <S.Container key={content.id} $isFocused={isFocused}>
          {inputType === inputTypes.RADIO ? <S.Circle /> : null}
          {inputType === inputTypes.CHECKBOX ? <S.Sqare /> : null}
          {inputType === inputTypes.SELECT ? (
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
                defaultValue={`옵션 ${contents.length}`}
              />
            )}
          />
          {isFocused ? (
            <S.DeleteIcon
              onClick={() => {
                dispatch(removeSelectItem({ cardId: id, contentId: content.id }));
              }}
            />
          ) : null}
        </S.Container>
      ))}
      {isFocused ? (
        <button
          type="button"
          onClick={() => {
            const contentId = String(Date.now());
            dispatch(
              addSelectItem({
                id,
                contentId,
                text: `옵션 ${contents.length + 1}`,
              }),
            );
          }}
        >
          추가
        </button>
      ) : null}
    </>
  );
};

export default ItemTypeSection;
