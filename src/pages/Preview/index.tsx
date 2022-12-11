import React from "react";
import { useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";

import PreviewCard from "../../components/PreviewCard";
import { StateProps } from "../../store";
import SubmitButton from "../../components/SubmitButton";
import * as S from "./styles";

const Preview = () => {
  const { cards } = useSelector((state: StateProps) => state);
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <div>
        {cards.map((card) => (
          <PreviewCard key={card.id} id={card.id} />
        ))}
      </div>
      <S.PreviewSubmitSection>
        <SubmitButton />
        <S.ClearButton
          onClick={() => {
            window.location.reload();
          }}
        >
          양식 지우기
        </S.ClearButton>
      </S.PreviewSubmitSection>
    </FormProvider>
  );
};

export default Preview;
