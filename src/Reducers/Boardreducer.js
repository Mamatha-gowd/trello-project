import { GET_BOARDS } from "../Actions/actiontypes";
const initialState = {
  boards: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };
    default:
      return state;
  }
}
