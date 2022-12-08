import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface CardProps {
  id: string;
  title: string;
  inputType: string;
  contents: contentsProps;
  isFocused: boolean;
}

interface contentsProps {
  description?: string;
  text?: string;
  textarea?: string;
  radio?: ItemTypeProps[];
  checkbox?: ItemTypeProps[];
  select?: ItemTypeProps[];
}

interface ItemTypeProps {
  id: string;
  title: string;
}

interface actionProps {
  type: string;
  payload: Partial<CardProps>;
}

const initialCards = [
  {
    id: "TitleCard",
    title: "",
    inputType: "string",
    contents: { description: "" },
    isFocused: false,
  },
];

const createNewCard = () => ({
  id: String(Date.now()),
  title: "",
  inputType: "radio",
  contents: {
    radio: [
      {
        id: String(Date.now()),
        title: "옵션 1",
      },
    ],
  },
  isFocused: true,
});

const cardSlice = createSlice({
  name: "Reducer",
  initialState: [...initialCards] as CardProps[],
  reducers: {
    add: (state: CardProps[]) => {
      const newState = state.map((card) => ({ ...card, isFocused: false }));
      newState.push(createNewCard());
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
  },
});

const store = configureStore({ reducer: cardSlice.reducer });
export type RootState = ReturnType<typeof store.getState>;
export const { add, focus } = cardSlice.actions;

export default store;
