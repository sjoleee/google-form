import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import PreviewCard from "../../components/PreviewCard";
import { StateProps } from "../../store";

// import * as S from "./styles";

const Result = () => {
  const { state } = useLocation();
  const { cards } = useSelector((state: StateProps) => state);

  return (
    <div>
      {cards.map((card) => (
        <PreviewCard key={card.id} id={card.id} />
      ))}
    </div>
  );
};

export default Result;
