import { GET_LISTS, ADD_LIST } from "./actiontypes";
const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const key = "23fe0646c0d1253eb430f7e02db925a0";

const getLists = (boardid) => (dispatch) => {
  let url = `https://api.trello.com/1/boards/${boardid}/lists?key=${key}&token=${token}`;
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((lists) => {
      dispatch({ type: GET_LISTS, payload: lists });
    });
};

const addList = (name, boardid) => (dispatch) => {
  let url = `https://api.trello.com/1/lists?name=${name}&idBoard=${boardid}&key=${key}&token=${token}`;
  fetch(url, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((list) => {
      dispatch({ type: ADD_LIST, payload: list });
    });
};
export { getLists, addList };
