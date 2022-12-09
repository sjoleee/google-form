import React from "react";
import { useDispatch } from "react-redux";

import { focus } from "../../store";
import CardHeader from "../CardHeader";
import * as S from "./styles";

const Card = ({
  isTitle,
  id,
  isFocused,
  title,
}: {
  isTitle: boolean;
  id: string;
  isFocused: boolean;
  title: string;
}) => {
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
        <CardHeader isTitle={isTitle} isFocused={isFocused} title={title} id={id} />
      </S.Card>
    </S.Contanier>
  );
};

export default React.memo(Card);
