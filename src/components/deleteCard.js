import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Card = (props) => {
  const { data } = props;
  return (
    <button
      className="btn btn-light btn-sm  delete-card "
      onClick={(e) => {
        props.onDelete(e, data.cardId);
      }}
    >
      X
    </button>
  );
};
export default Card;
