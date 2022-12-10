import React from "react";
import { useSelector } from "react-redux";

import { StateProps } from "../../store";

const Preview = () => {
  const { cards } = useSelector((state: StateProps) => state);

  return <div>{cards.length}</div>;
};

export default Preview;
