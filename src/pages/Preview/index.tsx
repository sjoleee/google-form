/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import PreviewCard from "../../components/PreviewCard";
import { InputTypes, removeRequiredCardId, setRequiredCardId, StateProps } from "../../store";
import * as S from "./styles";

const Preview = () => {
  const { cards } = useSelector((state: StateProps) => state);
  const methods = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = () => {
    const CardIdArr = Object.keys(methods.getValues());
    for (let i = 0; i < CardIdArr.length; i++) {
      for (let j = 1; j < cards.length; j++) {
        if (CardIdArr[i] === cards[j].id && cards[j].isRequired) {
          if (typeof cards[j].contents === "object" && cards[j].inputType !== InputTypes.RADIO) {
            const isRequiredComplete = Object.values(methods.getValues()[cards[j].id]).some(
              (value) => !!value,
            );
            if (isRequiredComplete) {
              dispatch(removeRequiredCardId());
              continue;
            } else {
              dispatch(setRequiredCardId({ cardId: cards[j].id }));
              throw new Error("필수값 입력 필요");
            }
          } else {
            const isRequiredComplete = !!methods.getValues()[cards[j].id];

            if (isRequiredComplete) {
              dispatch(removeRequiredCardId());
              continue;
            } else {
              dispatch(setRequiredCardId({ cardId: cards[j].id }));
              throw new Error("필수값 입력 필요");
            }
          }
        }
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(() => {
          try {
            handleClick();
            navigate("/preview/result", { state: methods.getValues() });
          } catch (e) {
            console.dir(e);
          }
        })}
      >
        {cards.map((card) => (
          <PreviewCard key={card.id} id={card.id} />
        ))}
        <S.PreviewSubmitSection>
          <S.SubmitButton type="submit">제출</S.SubmitButton>
          <S.ClearButton
            type="button"
            onClick={() => {
              window.location.reload();
            }}
          >
            양식 지우기
          </S.ClearButton>
        </S.PreviewSubmitSection>
      </form>
    </FormProvider>
  );
};

export default Preview;
