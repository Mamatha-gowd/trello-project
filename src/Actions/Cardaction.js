import { GET_CARDS, ADD_CARD, DELETE_CARD } from "./actiontypes";
const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const key = "23fe0646c0d1253eb430f7e02db925a0";
const getCards = (listid) => (dispatch) => {
  let url = `https://api.trello.com/1/lists/${listid}/cards?key=${key}&token=${token}`;
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((cards) => {
      dispatch({ type: GET_CARDS, payload: { listid, cards } });
    });
};

const addCard = (name, listid) => (dispatch) => {
  let url = `https://api.trello.com/1/cards?idList=${listid}&name=${name}&key=${key}&token=${token}`;
  fetch(url, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((card) => {
      dispatch({ type: ADD_CARD, payload: { card, listid } });
    });
};

const deleteCard = (listid, cardid) => (dispatch) => {
  let url = `https://api.trello.com/1/cards/${cardid}?key=${key}&token=${token}`;
  fetch(url, {
    method: "DELETE",
  }).then((res) => {
    dispatch({ type: DELETE_CARD, payload: { listid, cardid } });
  });
};
export { getCards, addCard, deleteCard };
