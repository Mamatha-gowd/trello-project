import { GET_CHECKLISTS, ADD_CHECKLIST, DELETE_CHECKLIST } from "./actiontypes";
const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const key = "23fe0646c0d1253eb430f7e02db925a0";
const getChecklists = (cardid) => (dispatch) => {
  let url = `https://api.trello.com/1/cards/${cardid}/checklists?key=${key}&token=${token}`;
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((checklists) => {
      dispatch({ type: GET_CHECKLISTS, payload: checklists });
    });
};

const addChecklist = (name, cardid) => (dispatch) => {
  let url = `https://api.trello.com/1/checklists?idCard=${cardid}&name=${name}&key=${key}&token=${token}`;
  fetch(url, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((checklist) => {
      dispatch({ type: ADD_CHECKLIST, payload: checklist });
    });
};

const deleteChecklist = (checklistid) => (dispatch) => {
  let url = `https://api.trello.com/1/checklists/${checklistid}?key=${key}&token=${token}`;
  fetch(url, {
    method: "DELETE",
  }).then((res) => dispatch({ type: DELETE_CHECKLIST, payload: checklistid }));
};

export { getChecklists, addChecklist, deleteChecklist };
