import React, { Component } from "react";
import Board from "./Board";
import { getBoardsAPI } from "./API";

class boardContainer extends Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    getBoardsAPI().then((res) => {
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
export default boardContainer;
