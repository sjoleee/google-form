import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

import * as S from "./styles";
import { addCard } from "../../store";

const AddCardButton = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCard({ cardTitle: "제목없는 질문" }));
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
