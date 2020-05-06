import React, { Component } from "react";
import Board from "./Board";
const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const key = "23fe0646c0d1253eb430f7e02db925a0";

class Boardfile extends Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    let url = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        let boards = res.map((board) => {
          return { boardId: board.id, boardName: board.name };
        });
        console.log(boards);
        this.setState({ boards });
      });
  }

  render() {
    const board = this.state.boards.map((board) => {
      return <Board key={board.boardId} board={board} />;
    });
    return (
      <div>
        <div className="d-flex justify-content-start board ">{board}</div>
      </div>
    );
  }
}
export default Boardfile;
