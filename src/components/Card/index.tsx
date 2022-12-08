import React, { useState } from "react";

import * as S from "./styles";

const Card = ({ isTitle }: { isTitle?: boolean }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <S.Contanier isClicked={isClicked}>
      <S.Card
        isClicked={isClicked}
        onClick={() => {
          setIsClicked((prev) => !prev);
        }}
      >
        {isTitle ? <S.TitleHighlight /> : null}
        <S.ClickHighlight isClicked={isClicked} />
      </S.Card>
    </S.Contanier>
  );
};

Card.defaultProps = {
  isTitle: false,
};

export default Card;
