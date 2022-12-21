import { configureStore, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { PersistState } from "redux-persist/lib/types";

export interface CardProps {
  id: string;
  cardTitle: string;
  inputType: string;
  contents: string | ItemTypeProps[];
  isFocused: boolean;
  isRequired: boolean;
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

export interface StateProps {
  cards: CardProps[];
  required: string;
  _persist: PersistState;
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
  isRequired: false,
};

const createNewCard = (cardId: string, cardTitle = "") => ({
  id: cardId,
  cardTitle,
  inputType: InputTypes.RADIO,
  contents: [
    {
      id: String(Number(cardId) + 1),
      text: "옵션 1",
    },
  ],
  isFocused: true,
  isRequired: false,
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

const requiredSlice = createSlice({
  name: "Required",
  initialState: "",
  reducers: {
    setRequiredCardId: (state: string, action: ActionProps) => action.payload.cardId,
    removeRequiredCardId: () => "",
  },
});

const cardSlice = createSlice({
  name: "Reducer",
  initialState: [initialCards] as CardProps[],
  reducers: {
    addCard: (state: CardProps[], action: ActionProps) => {
      const copiedState = state.map((card) => ({ ...card, isFocused: false }));

      if (Number(action.payload.focusedCardIndex) > 0) {
        copiedState.splice(
          Number(action.payload.focusedCardIndex) + 1,
          0,
          createNewCard(action.payload.cardId, action.payload.cardTitle),
        );
      } else {
        copiedState.push(createNewCard(action.payload.cardId, action.payload.cardTitle));
      }
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
      if (typeof copiedCard.contents === "object") {
        const itemTypeCopiedCardContents = copiedCard.contents.map((content, index) => ({
          ...content,
          id: String(Number(action.payload.copiedCardId) + index),
        }));
        copiedCard.contents = itemTypeCopiedCardContents;
      }
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
        targetCard.inputType === InputTypes.RADIO &&
        (action.payload.inputType === InputTypes.SELECT ||
          action.payload.inputType === InputTypes.CHECKBOX)
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

    setTitle: (state: CardProps[], action: ActionProps) => {
      const targetCard = state.find((card) => card.id === action.payload.cardId) as CardProps;
      targetCard.cardTitle = action.payload.text;
    },

    setText: (state: CardProps[], action: ActionProps) => {
      const targetCard = state.find((card) => card.id === action.payload.cardId) as CardProps;

      if (targetCard.inputType === InputTypes.TITLE) {
        targetCard.contents = action.payload.text;
      }
      if (
        targetCard.inputType === InputTypes.RADIO ||
        targetCard.inputType === InputTypes.CHECKBOX ||
        targetCard.inputType === InputTypes.SELECT
      ) {
        const contents = targetCard.contents as ItemTypeProps[];
        const targetContent = contents.find(
          (content) => content.id === action.payload.contentId,
        ) as ItemTypeProps;
        targetContent.text = action.payload.text;
      }
    },

    addEtcItem: (state: CardProps[], action: ActionProps) => {
      const contents = state.find((card) => card.id === action.payload.id)
        ?.contents as ItemTypeProps[];
      contents.push({ id: action.payload.contentId, isEtc: true });
    },

    toggleIsRequired: (state: CardProps[], action: ActionProps) => {
      const targetCard = state.find((card) => card.id === action.payload.id) as CardProps;
      targetCard.isRequired = !targetCard.isRequired;
    },

    moveCard: (state: CardProps[], action: ActionProps) => {
      const copiedState = [...state];
      const movingCard = copiedState.splice(Number(action.payload.sourceIndex), 1);
      copiedState.splice(Number(action.payload.destinationIndex), 0, ...movingCard);
      return copiedState;
    },

    moveContent: (state: CardProps[], action: ActionProps) => {
      const targetCard = state.find((card) => card.id === action.payload.cardId) as CardProps;
      const contents = targetCard.contents as ItemTypeProps[];
      const tmp = contents.splice(Number(action.payload.sourceIndex), 1);
      contents.splice(Number(action.payload.destinationIndex), 0, ...tmp);
    },
  },
});

const reducers = combineReducers({
  cards: cardSlice.reducer,
  required: requiredSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cards"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export const {
  addCard,
  copyCard,
  removeCard,
  focus,
  typeChange,
  addSelectItem,
  removeSelectItem,
  setTitle,
  setText,
  addEtcItem,
  toggleIsRequired,
  moveCard,
  moveContent,
} = cardSlice.actions;
export const { setRequiredCardId, removeRequiredCardId } = requiredSlice.actions;

export default store;
