import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface CardProps {
  id: string;
  cardTitle: string;
  inputType: string;
  contents: string | ItemTypeProps[];
  isFocused: boolean;
}

export interface ItemTypeProps {
  id: string;
  text?: string;
  isEtc?: boolean;
}

interface PayloadProps {
  [key: string]: string;
}

interface actionProps {
  type: string;
  payload: PayloadProps;
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
      text: "옵션 1",
    },
  ],
  isFocused: true,
});

const cardSlice = createSlice({
  name: "Reducer",
  initialState: [initialCards] as CardProps[],
  reducers: {
    addCard: (state: CardProps[], action: actionProps) => {
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
      if (
        !(
          targetCard.inputType === inputTypes.RADIO ||
          targetCard.inputType === inputTypes.CHECKBOX ||
          targetCard.inputType === inputTypes.SELECT
        ) &&
        (action.payload.inputType === inputTypes.RADIO ||
          action.payload.inputType === inputTypes.CHECKBOX ||
          action.payload.inputType === inputTypes.SELECT)
      ) {
        targetCard.contents = [
          {
            id: String(Date.now()),
            text: "옵션 1",
          },
        ];
      } else if (
        (targetCard.inputType === inputTypes.RADIO ||
          targetCard.inputType === inputTypes.CHECKBOX ||
          targetCard.inputType === inputTypes.SELECT) &&
        !(
          action.payload.inputType === inputTypes.RADIO ||
          action.payload.inputType === inputTypes.CHECKBOX ||
          action.payload.inputType === inputTypes.SELECT
        )
      ) {
        targetCard.contents = "";
      }
      targetCard.inputType = action.payload.inputType as string;
    },

    addSelectItem: (state: CardProps[], action: actionProps) => {
      const contents = state.find((card) => card.id === action.payload.id)
        ?.contents as ItemTypeProps[];
      contents.push({ id: action.payload.contentId, text: action.payload.text });
    },

    removeSelectItem: (state: CardProps[], action: actionProps) => {
      const targetCard = state.find((card) => card.id === action.payload.cardId) as CardProps;
      const contents = targetCard.contents as ItemTypeProps[];
      const filteredContents = contents.filter((item) => item.id !== action.payload.contentId);
      targetCard.contents = filteredContents;
    },

    addEtcItem: (state: CardProps[], action: actionProps) => {
      const contents = state.find((card) => card.id === action.payload.id)
        ?.contents as ItemTypeProps[];
      contents.push({ id: action.payload.contentId, isEtc: true });
    },
  },
});

const store = configureStore({ reducer: cardSlice.reducer });
export type RootState = ReturnType<typeof store.getState>;
export const { addCard, focus, typeChange, addSelectItem, removeSelectItem, addEtcItem } =
  cardSlice.actions;

export default store;
