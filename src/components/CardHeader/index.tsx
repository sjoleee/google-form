import { MenuItem, SelectChangeEvent } from "@mui/material";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { CardProps, inputTypes, typeChange } from "../../store";
import { extendedCardProps } from "../Card";
import * as S from "./styles";

const CardHeader = ({ id, isTitle }: Pick<extendedCardProps, "id" | "isTitle">) => {
  const { control, setFocus, register } = useForm();
  const dispatch = useDispatch();
  const { isFocused, cardTitle } = useSelector(
    (state: CardProps[]) => state.find((card) => card.id === id) as CardProps,
    shallowEqual,
  );

  useEffect(() => {
    if (isFocused && !isTitle) setFocus(id);
  }, [isFocused]);

  const handleChange = (e: SelectChangeEvent<unknown>) => {
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
            defaultValue={cardTitle}
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
            <S.Select onChange={handleChange} defaultValue={inputTypes.RADIO}>
              <MenuItem value={inputTypes.TEXT}>단답형</MenuItem>
              <MenuItem value={inputTypes.TEXTAREA}>장문형</MenuItem>
              <MenuItem value={inputTypes.RADIO}>객관식 질문</MenuItem>
              <MenuItem value={inputTypes.CHECKBOX}>체크박스</MenuItem>
              <MenuItem value={inputTypes.SELECT}>드롭다운</MenuItem>
            </S.Select>
          )}
        />
      ) : null}
    </S.Container>
  );
};

export default React.memo(CardHeader);
