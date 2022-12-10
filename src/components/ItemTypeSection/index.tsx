import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  addEtcItem,
  addSelectItem,
  CardProps,
  InputTypes,
  ItemTypeProps,
  removeSelectItem,
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
    return contents.some((content) => content.isEtc);
  });

  const { control } = useForm();

  return (
    <>
      {contents.map((content) => (
        <S.Container key={content.id} $isFocused={isFocused}>
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
                defaultValue={content.isEtc ? "기타..." : content.text}
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
      ))}
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
    </>
  );
};

export default ItemTypeSection;
