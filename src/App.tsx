import React from "react";
import { useSelector } from "react-redux";

import * as S from "./styles";
import Card from "./components/Card";
import AddCardButton from "./components/AddCardButton";
import { CardProps } from "./store";

const App = () => {
  const cards = useSelector((state: CardProps[]) => state);

  return (
    <S.Container>
      <S.CardList>
        {cards.map((card) => (
          <Card
            key={card.id}
            isTitle={card.id === "TitleCard"}
            id={card.id}
            isFocused={card.isFocused}
            title={card.title}
          />
        ))}
      </S.CardList>
      <AddCardButton />
    </S.Container>
  );
};

export default App;
