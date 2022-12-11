import React from "react";
import { useSelector } from "react-redux";
import { Controller, useFormContext } from "react-hook-form";

import { CardProps, StateProps } from "../../store";
import * as S from "./styles";

const InputTextField = ({ id }: Pick<CardProps, "id">) => {
  const { control } = useFormContext();

  const inputType = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.inputType;
  }) as string;

  return (
    <Controller
      name={id}
      control={control}
      render={({ field: { onChange } }) => (
        <S.TextField
          onChange={onChange}
          id="standard-basic"
          variant="standard"
          placeholder="내 답변"
          $inputType={inputType}
        />
      )}
    />
  );
};

export default InputTextField;
