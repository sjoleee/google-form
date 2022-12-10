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

interface ActionProps {
  type: string;
  payload: PayloadProps;
}

export enum InputTypes {
  TITLE = "TITLE",
  TEXT = "TEXT",
  TEXTAREA = "TEXTAREA",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  SELECT = "SELECT",
}

const initialCards = {
  id: "TitleCard",
  cardTitle: "제목 없는 설문지",
  inputType: InputTypes.TITLE,
  contents: "",
  isFocused: false,
};

const createNewCard = (cardTitle = "") => ({
  id: String(Date.now()),
  cardTitle,
  inputType: InputTypes.RADIO,
  contents: [
    {
      id: String(Date.now()),
      text: "옵션 1",
    },
  ],
  isFocused: true,
});

const sortEtcItem = (currentContents: ItemTypeProps[]) => {
  const etcIndex = currentContents.findIndex((content) => content.isEtc);
  if (etcIndex !== -1) {
    const etcItem = { ...currentContents[etcIndex] };
    currentContents.splice(etcIndex, 1);
    currentContents.push(etcItem);
  }
  return currentContents;
};

const deleteEtcItem = (currentContents: ItemTypeProps[]) => {
  const etcIndex = currentContents.findIndex((content) => content.isEtc);
  if (etcIndex !== -1) {
    currentContents.splice(etcIndex, 1);
  }
  return currentContents;
};

const cardSlice = createSlice({
  name: "Reducer",
  initialState: [initialCards] as CardProps[],
  reducers: {
    addCard: (state: CardProps[], action: ActionProps) => {
      const copiedState = state.map((card) => ({ ...card, isFocused: false }));
      copiedState.push(createNewCard(action.payload.cardTitle));
      return copiedState;
    },

    copyCard: (state: CardProps[], action: ActionProps) => {
      const copiedState = state.map((card) => ({ ...card, isFocused: false }));
      const targetCard = copiedState.find((card) => card.id === action.payload.cardId) as CardProps;
      const targetCardIndex = copiedState.findIndex((card) => card.id === action.payload.cardId);
      const copiedCard = {
        ...targetCard,
        id: action.payload.copiedCardId,
        isFocused: true,
      };
      copiedState.splice(targetCardIndex + 1, 0, copiedCard);
      return copiedState;
    },

    removeCard: (state: CardProps[], action: ActionProps) => {
      const copiedState = state.map((card) => ({ ...card, isFocused: false }));
      const targetCardIndex = copiedState.findIndex((card) => card.id === action.payload.cardId);
      const filteredState = copiedState.filter((card) => card.id !== action.payload.cardId);
      if (targetCardIndex !== 1) {
        return filteredState.map((card, index) =>
          index === targetCardIndex - 1 ? { ...card, isFocused: true } : card,
        );
      }
      if (targetCardIndex === 1) {
        return filteredState.map((card, index) =>
          index === targetCardIndex ? { ...card, isFocused: true } : card,
        );
      }

      return filteredState;
    },

    focus: (state: CardProps[], action: ActionProps) => {
      const copiedState = state.map((card) =>
        action.payload.id === card.id
          ? { ...card, isFocused: true }
          : { ...card, isFocused: false },
      );
      return copiedState;
    },

    typeChange: (state: CardProps[], action: ActionProps) => {
      const targetCard = state.find((card) => card.id === action.payload.id) as CardProps;
      if (
        !(
          targetCard.inputType === InputTypes.RADIO ||
          targetCard.inputType === InputTypes.CHECKBOX ||
          targetCard.inputType === InputTypes.SELECT
        ) &&
        (action.payload.inputType === InputTypes.RADIO ||
          action.payload.inputType === InputTypes.CHECKBOX ||
          action.payload.inputType === InputTypes.SELECT)
      ) {
        targetCard.contents = [
          {
            id: String(Date.now()),
            text: "옵션 1",
          },
        ];
      } else if (
        (targetCard.inputType === InputTypes.RADIO ||
          targetCard.inputType === InputTypes.CHECKBOX ||
          targetCard.inputType === InputTypes.SELECT) &&
        !(
          action.payload.inputType === InputTypes.RADIO ||
          action.payload.inputType === InputTypes.CHECKBOX ||
          action.payload.inputType === InputTypes.SELECT
        )
      ) {
        targetCard.contents = "";
      }
      if (
        (targetCard.inputType === InputTypes.RADIO ||
          targetCard.inputType === InputTypes.CHECKBOX) &&
        action.payload.inputType === InputTypes.SELECT
      ) {
        deleteEtcItem(targetCard.contents as ItemTypeProps[]);
      }
      targetCard.inputType = action.payload.inputType as string;
    },

    addSelectItem: (state: CardProps[], action: ActionProps) => {
      const contents = state.find((card) => card.id === action.payload.id)
        ?.contents as ItemTypeProps[];
      contents.push({ id: action.payload.contentId, text: action.payload.text });
      sortEtcItem(contents);
    },

    removeSelectItem: (state: CardProps[], action: ActionProps) => {
      const targetCard = state.find((card) => card.id === action.payload.cardId) as CardProps;
      const contents = targetCard.contents as ItemTypeProps[];
      const filteredContents = contents.filter((item) => item.id !== action.payload.contentId);
      targetCard.contents = filteredContents;
    },

    addEtcItem: (state: CardProps[], action: ActionProps) => {
      const contents = state.find((card) => card.id === action.payload.id)
        ?.contents as ItemTypeProps[];
      contents.push({ id: action.payload.contentId, isEtc: true });
    },
  },
});

const store = configureStore({ reducer: cardSlice.reducer });
export type RootState = ReturnType<typeof store.getState>;
export const {
  addCard,
  copyCard,
  removeCard,
  focus,
  typeChange,
  addSelectItem,
  removeSelectItem,
  addEtcItem,
} = cardSlice.actions;

export default store;
