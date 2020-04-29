import { GET_CARDS, ADD_CARD, DELETE_CARD } from "../Actions/actiontypes";

const initialState = {
  cards: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.listid]: action.payload.cards,
        },
      };
    case ADD_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.listid]: [
            ...state.cards[action.payload.listid],
            action.payload.card,
          ],
        },
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.listid]: state.cards[action.payload.listid].filter(
            (card) => card.id !== action.payload.cardid
          ),
        },
      };
    default:
      return state;
  }
}
