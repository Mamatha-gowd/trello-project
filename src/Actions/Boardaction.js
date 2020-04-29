import { GET_BOARDS } from "./actiontypes";
const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const url = "https://api.trello.com";
const key = "23fe0646c0d1253eb430f7e02db925a0";

const getBoards = () => (dispatch) => {
  let url = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`;
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((boards) => dispatch({ type: GET_BOARDS, payload: boards }));
};
export { getBoards };
