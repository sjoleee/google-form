import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface CardProps {
  id: string;
  title: string;
  inputType: string;
  contents: contentsProps;
  isfocused: boolean;
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
  payload: CardProps;
}

const initialCards = [
  {
    id: "TitleCard",
    title: "",
    inputType: "string",
    contents: { description: "" },
    isfocused: false,
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
  isfocused: true,
});

const cardSlice = createSlice({
  name: "Reducer",
  initialState: [...initialCards] as CardProps[],
  reducers: {
    add: (state: CardProps[]) => {
      state.push(createNewCard());
    },
  },
});

const store = configureStore({ reducer: cardSlice.reducer });
export const { add } = cardSlice.actions;

export default store;
