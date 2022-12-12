import React from "react";
import { useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import PreviewCard from "../../components/PreviewCard";
import { StateProps } from "../../store";
import * as S from "./styles";

const Preview = () => {
  const { cards } = useSelector((state: StateProps) => state);
  const methods = useForm();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/preview/result", { state: methods.getValues() });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleClick)}>
        {cards.map((card) => (
          <PreviewCard key={card.id} id={card.id} />
        ))}
        <S.PreviewSubmitSection>
          <S.SubmitButton type="submit">제출</S.SubmitButton>
          <S.ClearButton
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
