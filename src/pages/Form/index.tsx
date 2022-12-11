import React from "react";
import { useSelector } from "react-redux";

import * as S from "./styles";
import Card from "../../components/Card";
import AddCardButton from "../../components/AddCardButton";
import { InputTypes, StateProps } from "../../store";

const Form = () => {
  const { cards } = useSelector((state: StateProps) => state);

  const openPreviewTab = () => {
    window.open("/preview", "_blank");
  };

  return (
    <>
      <S.Header>
        <S.Eye onClick={openPreviewTab} />
      </S.Header>
      <S.Container>
        <S.CardList>
          {cards.map((card) => (
            <Card key={card.id} isTitle={card.inputType === InputTypes.TITLE} {...card} />
          ))}
        </S.CardList>
        <AddCardButton />
      </S.Container>
    </>
  );
};

export default Form;
