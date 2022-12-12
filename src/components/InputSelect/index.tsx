import { MenuItem, Select } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

import { CardProps, ItemTypeProps, StateProps } from "../../store";

const InputSelect = ({ id }: Pick<CardProps, "id">) => {
  const { control } = useFormContext();

  const contents = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.contents;
  }) as ItemTypeProps[];

  return (
    <Controller
      control={control}
      name={id}
      render={({ field: { onChange } }) => (
        <Select defaultValue="" onChange={onChange} autoWidth displayEmpty>
          <MenuItem value="">
            <em>선택</em>
          </MenuItem>
          {contents.map((content) => (
            <MenuItem key={content.id} value={content.id}>
              {content.text}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};

export default InputSelect;
