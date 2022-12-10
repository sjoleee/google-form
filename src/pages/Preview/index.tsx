import React from "react";
import { useSelector } from "react-redux";

import PreviewCard from "../../components/PreviewCard";
import { StateProps } from "../../store";

const Preview = () => {
  const { cards } = useSelector((state: StateProps) => state);

  return (
    <div>
      {cards.map((card) => (
        <PreviewCard key={card.id} id={card.id} />
      ))}
    </div>
  );
};

export default Preview;
