import React from "react";
import { useDispatch } from "react-redux";

import { CardProps, focus } from "../../store";
import CardHeader from "../CardHeader";
import * as S from "./styles";

export interface extendedCardProps extends CardProps {
  isTitle: boolean;
}

const Card = ({ isTitle, id, isFocused }: extendedCardProps) => {
  const dispatch = useDispatch();

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
        <CardHeader isTitle={isTitle} id={id} />
        {}
      </S.Card>
    </S.Contanier>
  );
};

export default React.memo(Card);
