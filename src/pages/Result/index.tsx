import React from "react";
import { useLocation } from "react-router-dom";

import ResultCard from "../../components/ResultCard";

const Result = () => {
  const { state } = useLocation();

  return <ResultCard results={state} />;
};

export default Result;
