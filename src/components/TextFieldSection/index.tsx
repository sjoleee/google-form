import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import { CardProps, InputTypes, setText, StateProps } from "../../store";
import * as S from "./styles";

const TextFieldSection = ({ id }: Pick<CardProps, "id">) => {
  const dispatch = useDispatch();
  const { control } = useForm();

  const inputType = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.inputType;
  }) as string;

  const contents = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.contents;
  }) as string;

  const isFocused = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.isFocused;
  }) as boolean;

  const isTitle = inputType === InputTypes.TITLE;

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setText({ cardId: id, text: e.target.value }));
  };

  const handlePlaceholder = () => {
    if (isTitle) return "설문지 설명";
    if (inputType === InputTypes.TEXT) return "단답형 텍스트";
    return "장문형 텍스트";
  };

  return (
    <Controller
      name="TextFieldInput"
      control={control}
      render={() => (
        <S.TextField
          id="standard-basic"
          $isTitle={isTitle}
          $isFocused={isFocused}
          $inputType={inputType}
          variant="standard"
          value={contents}
          onChange={(e) => {
            handleDescriptionChange(e);
          }}
          placeholder={handlePlaceholder()}
          disabled={!isTitle}
        />
      )}
    />
  );
};

export default TextFieldSection;
