import {
  GET_CHECKLISTS,
  ADD_CHECKLIST,
  DELETE_CHECKLIST,
} from "../Actions/actiontypes";
const initialState = {
  checklists: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CHECKLISTS:
      return {
        ...state,
        checklists: action.payload,
      };
    case ADD_CHECKLIST:
      return {
        ...state,
        checklists: [...state.checklists, action.payload],
      };
    case DELETE_CHECKLIST:
      return {
        ...state,
        checklists: state.checklists.filter(
          (checklist) => checklist.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
