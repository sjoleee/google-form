import React from "react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import { CardProps, InputTypes, StateProps } from "../../store";
import * as S from "./styles";

const TextFieldSection = ({ id }: Pick<CardProps, "id">) => {
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
          placeholder={handlePlaceholder()}
          defaultValue={contents}
          disabled={!isTitle}
        />
      )}
    />
  );
};

export default TextFieldSection;
