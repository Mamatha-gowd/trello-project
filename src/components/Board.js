import React, { Component } from "react";
import { Link } from "react-router-dom";

const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const url = "https://api.trello.com";
const key = "23fe0646c0d1253eb430f7e02db925a0";

const Board = (props) => {
  const { board } = props;
  return (
    <div>
      <Link to={`/boards/${board.id}`}>
        <div className="btn rounded bg-primary text-white m-2 mt-5">
          <div>{board.name}</div>
        </div>
      </Link>
    </div>
  );
};
export default Board;
