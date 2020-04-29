import { GET_LISTS, ADD_LIST } from "../Actions/actiontypes";
const initialState = { lists: [] };
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LISTS:
      return {
        ...state,
        lists: action.payload,
      };
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    default:
      return state;
  }
}
