import {
  GET_CHECKITEMS,
  ADD_CHECKITEM,
  DELETE_CHECKITEM,
  UPDATE_CHECKITEM,
  UPDATE_STATE,
} from "../Actions/actiontypes";

const initialsState = { checkitems: {} };
export default function (state = initialsState, action) {
  switch (action.type) {
    case GET_CHECKITEMS:
      return {
        ...state,
        checkitems: {
          ...state.checkitems,
          [action.payload.checklistid]: action.payload.checkitems,
        },
      };
    case ADD_CHECKITEM:
      return {
        ...state,
        checkitems: {
          ...state.checkitems,
          [action.payload.checklistid]: [
            ...state.checkitems[action.payload.checklistid],
            action.payload.checkitem,
          ],
        },
      };
    case DELETE_CHECKITEM:
      return {
        ...state,
        checkitems: {
          ...state.checkitems,
          [action.payload.checklistid]: state.checkitems[
            action.payload.checklistid
          ].filter((item) => item.id !== action.payload.checkitemid),
        },
      };
    case UPDATE_CHECKITEM:
      return {
        ...state,
        checkitems: {
          ...state.checkitems,
          [action.payload.checkitem.idChecklist]: state.checkitems[
            action.payload.checkitem.idChecklist
          ].filter((item) => {
            if (item.id === action.payload.checkitemid) {
              item.name = action.payload.checkitem.name;
              return item;
            }
            return item;
          }),
        },
      };
    case UPDATE_STATE:
      return {
        ...state,
        checkitems: {
          ...state.checkitems,
          [action.payload.checkitem.idChecklist]: state.checkitems[
            action.payload.checkitem.idChecklist
          ].filter((item) => {
            if (item.id === action.payload.checkitemid) {
              item.state = action.payload.checkitem.state;
              return item;
            }
            return item;
          }),
        },
      };
    default:
      return state;
  }
}
