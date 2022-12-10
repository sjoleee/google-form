import React from "react";
import { useSelector } from "react-redux";

import * as S from "./styles";
import Card from "./components/Card";
import AddCardButton from "./components/AddCardButton";
import { CardProps, InputTypes } from "./store";

const App = () => {
  const cards = useSelector((state: CardProps[]) => state);

  return (
    <S.Container>
      <S.CardList>
        {cards.map((card) => (
          <Card key={card.id} isTitle={card.inputType === InputTypes.TITLE} {...card} />
        ))}
      </S.CardList>
      <AddCardButton />
    </S.Container>
  );
};

export default App;
