import React from "react";
import { useSelector } from "react-redux";
import { Controller, useFormContext } from "react-hook-form";

import { CardProps, ItemTypeProps, StateProps } from "../../store";
import * as S from "./styles";

const InputCheckbox = ({ id }: Pick<CardProps, "id">) => {
  const { control } = useFormContext();

  const contents = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.contents;
  }) as ItemTypeProps[];

  return (
    <S.Container>
      {contents.map((content) => (
        <Controller
          key={content.id}
          name={`${id}.${content.id}`}
          control={control}
          render={({ field: { onChange } }) => (
            <S.CheckboxContainer>
              <S.Checkbox
                type="checkbox"
                id={content.id}
                value={content.text}
                onChange={(e) => {
                  onChange(e.currentTarget.checked);
                }}
              />
              <label htmlFor={content.id}>
                <span>{content.text}</span>
              </label>
            </S.CheckboxContainer>
          )}
        />
      ))}
    </S.Container>
  );
};

export default InputCheckbox;
