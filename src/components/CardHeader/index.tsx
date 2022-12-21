import React from "react";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { CardProps, InputTypes, setTitle, StateProps, typeChange } from "../../store";
import { extendedCardProps } from "../Card";
import * as S from "./styles";

const CardHeader = ({ id, isTitle }: Pick<extendedCardProps, "id" | "isTitle">) => {
  const { control, register } = useForm();
  const dispatch = useDispatch();
  const isFocused = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.isFocused;
  }, shallowEqual);

  const { cardTitle } = useSelector(
    (state: StateProps) => state.cards.find((card) => card.id === id) as CardProps,
    shallowEqual,
  );

  const handleCardTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setTitle({ cardId: id, text: e.target.value }));
  };

  const handleInputTypeChange = (e: SelectChangeEvent<unknown>) => {
    dispatch(typeChange({ id, inputType: e.target.value as string }));
  };

  return (
    <S.Container>
      <Controller
        name="CardTitle"
        control={control}
        render={() => (
          <S.TextField
            {...register(id)}
            id="filled-basic"
            $isTitle={isTitle}
            $isFocused={isFocused}
            value={cardTitle}
            onChange={(e) => {
              handleCardTitleChange(e);
            }}
            placeholder={isTitle ? "설문지 제목" : "질문"}
            variant="filled"
          />
        )}
      />
      {!isTitle && isFocused ? (
        <Controller
          name="inputTypeSelect"
          control={control}
          render={() => (
            <S.Select onChange={handleInputTypeChange} defaultValue={InputTypes.RADIO}>
              <MenuItem value={InputTypes.TEXT}>단답형</MenuItem>
              <MenuItem value={InputTypes.TEXTAREA}>장문형</MenuItem>
              <MenuItem value={InputTypes.RADIO}>객관식 질문</MenuItem>
              <MenuItem value={InputTypes.CHECKBOX}>체크박스</MenuItem>
              <MenuItem value={InputTypes.SELECT}>드롭다운</MenuItem>
            </S.Select>
          )}
        />
      ) : null}
    </S.Container>
  );
};

export default React.memo(CardHeader);
