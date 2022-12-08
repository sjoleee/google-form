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

const cardSlice = createSlice({
  name: "Reducer",
  initialState: [
    {
      id: "TitleCard",
      title: "",
      inputType: "string",
      contents: { description: "" },
      isfocused: false,
    },
  ] as CardProps[],
  reducers: {
    add: (state: CardProps[], action: actionProps) => {
      state.push(action.payload);
    },
  },
});

const store = configureStore({ reducer: cardSlice.reducer });
export const { add } = cardSlice.actions;

export default store;
