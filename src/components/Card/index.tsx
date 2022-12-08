import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { focus, RootState } from "../../store";
import * as S from "./styles";

const Card = ({ isTitle, id }: { isTitle?: boolean; id: string }) => {
  const dispatch = useDispatch();

  const isFocused = useSelector((state: RootState) => {
    const currentCard = state.find((card) => card.id === id);
    return currentCard ? currentCard.isFocused : false;
  });

  const setIsFocused = () => {
    dispatch(focus({ id }));
  };

  return (
    <S.Contanier isFocused={isFocused}>
      <S.Card
        isFocused={isFocused}
        onClick={() => {
          setIsFocused();
        }}
      >
        {isTitle ? <S.TitleHighlight /> : null}
        <S.ClickHighlight isFocused={isFocused} />
      </S.Card>
    </S.Contanier>
  );
};

Card.defaultProps = {
  isTitle: false,
};

export default Card;
