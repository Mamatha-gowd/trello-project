import React from "react";
import { Link } from "react-router-dom";
const Board = (props) => {
  const { board } = props;
  return (
    <div>
      <Link to={`/boards/${board.boardId}`}>
        <div className="btn rounded bg-primary text-white m-2 mt-5">
          <div>{board.boardName}</div>
        </div>
      </Link>
    </div>
  );
};
export default Board;
