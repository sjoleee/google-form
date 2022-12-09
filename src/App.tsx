import React from "react";
import { useSelector } from "react-redux";

import * as S from "./styles";
import Card from "./components/Card";
import AddCardButton from "./components/AddCardButton";
import { CardProps, inputTypes } from "./store";

const App = () => {
  const cards = useSelector((state: CardProps[]) => state);

  return (
    <S.Container>
      <S.CardList>
        {cards.map((card) => (
          <Card key={card.id} isTitle={card.inputType === inputTypes.TITLE} {...card} />
        ))}
      </S.CardList>
      <AddCardButton />
    </S.Container>
  );
};

export default App;
