import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface CardProps {
  id: string;
  cardTitle: string;
  inputType: string;
  contents: string | ItemTypeProps[];
  isFocused: boolean;
}

interface ItemTypeProps {
  id: string;
  title: string;
}

interface actionProps {
  type: string;
  payload: Partial<CardProps>;
}

export enum inputTypes {
  "TITLE" = "TITLE",
  "TEXT" = "TEXT",
  "TEXTAREA" = "TEXTAREA",
  "RADIO" = "RADIO",
  "CHECKBOX" = "CHECKBOX",
  "SELECT" = "SELECT",
}

const initialCards = {
  id: "TitleCard",
  cardTitle: "제목 없는 설문지",
  inputType: inputTypes.TITLE,
  contents: "",
  isFocused: false,
};

const createNewCard = (cardTitle = "") => ({
  id: String(Date.now()),
  cardTitle,
  inputType: inputTypes.RADIO,
  contents: [
    {
      id: String(Date.now()),
      title: "옵션 1",
    },
  ],

  isFocused: true,
});

const cardSlice = createSlice({
  name: "Reducer",
  initialState: [initialCards] as CardProps[],
  reducers: {
    add: (state: CardProps[], action: actionProps) => {
      const newState = state.map((card) => ({ ...card, isFocused: false }));
      newState.push(createNewCard(action.payload.cardTitle));
      return newState;
    },

    focus: (state: CardProps[], action: actionProps) => {
      const newState = state.map((card) =>
        action.payload.id === card.id
          ? { ...card, isFocused: true }
          : { ...card, isFocused: false },
      );
      return newState;
    },

    typeChange: (state: CardProps[], action: actionProps) => {
      const targetCard = state.find((card) => card.id === action.payload.id) as CardProps;
      targetCard.inputType = action.payload.inputType as string;
    },
  },
});

const store = configureStore({ reducer: cardSlice.reducer });
export type RootState = ReturnType<typeof store.getState>;
export const { add, focus, typeChange } = cardSlice.actions;

export default store;
