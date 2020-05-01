import {
  GET_CHECKITEMS,
  ADD_CHECKITEM,
  DELETE_CHECKITEM,
  UPDATE_CHECKITEM,
  UPDATE_STATE,
} from "./actiontypes";
const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const key = "23fe0646c0d1253eb430f7e02db925a0";

const getCheckitems = (checklistid, checkitems) => (dispatch) => {
  dispatch({ type: GET_CHECKITEMS, payload: { checklistid, checkitems } });
};

const addCheckitem = (name, checklistid) => (dispatch) => {
  let url = `https://api.trello.com/1/checklists/${checklistid}/checkItems?name=${name}&key=${key}&token=${token}`;
  fetch(url, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((checkitem) => {
      dispatch({ type: ADD_CHECKITEM, payload: { checklistid, checkitem } });
    });
};

const deleteCheckitem = (checklistid, checkitemid) => (dispatch) => {
  let url = `https://api.trello.com/1/checklists/${checklistid}/checkItems/${checkitemid}?key=${key}&token=${token}`;
  fetch(url, {
    method: "DELETE",
  }).then((res) =>
    dispatch({ type: DELETE_CHECKITEM, payload: { checklistid, checkitemid } })
  );
};

const updateCheckitem = (cardid, checkitemid, name) => (dispatch) => {
  let url = `https://api.trello.com/1/cards/${cardid}/checkItem/${checkitemid}?name=${name}&key=${key}&token=${token}`;
  fetch(url, {
    method: "PUT",
  })
    .then((res) => res.json())
    .then((checkitem) => {
      dispatch({ type: UPDATE_CHECKITEM, payload: { checkitem, checkitemid } });
    });
};

const updateState = (cardid, checkitemid, state) => (dispatch) => {
  //state === "complete" ? "incomplete" : "complete";
  let url = `https://api.trello.com/1/cards/${cardid}/checkItem/${checkitemid}?state=${
    state === "complete" ? "incomplete" : "complete"
  }&key=${key}&token=${token}`;
  fetch(url, {
    method: "PUT",
  })
    .then((res) => res.json())
    .then((checkitem) => {
      dispatch({ type: UPDATE_STATE, payload: { checkitem, checkitemid } });
    });
};

export {
  getCheckitems,
  addCheckitem,
  deleteCheckitem,
  updateCheckitem,
  updateState,
};
