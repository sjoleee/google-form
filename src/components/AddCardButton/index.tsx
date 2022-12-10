import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

import * as S from "./styles";
import { addCard, StateProps } from "../../store";

const AddCardButton = () => {
  const dispatch = useDispatch();
  const { cards } = useSelector((state: StateProps) => state);

  useEffect(() => {
    if (cards.length < 2) dispatch(addCard({ cardTitle: "제목없는 질문" }));
  }, []);

  return (
    <S.Fab
      color="primary"
      aria-label="add"
      onClick={() => {
        dispatch(addCard({}));
      }}
    >
      <AddIcon />
    </S.Fab>
  );
};

export default AddCardButton;
