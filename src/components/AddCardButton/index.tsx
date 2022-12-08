import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

import * as S from "./styles";
import { add } from "../../store";

const AddCardButton = () => {
  const dispatch = useDispatch();

  const AddCard = () => {
    dispatch(add());
  };

  useEffect(() => {
    AddCard();
  }, []);

  return (
    <S.Fab color="primary" aria-label="add" onClick={AddCard}>
      <AddIcon />
    </S.Fab>
  );
};

export default AddCardButton;
