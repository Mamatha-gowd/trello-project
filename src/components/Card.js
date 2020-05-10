import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Card = (props) => {
  const { data, openModal } = props;
  return (
    <button
      className="btn btn-light w-100 my-2 p-2 rounded d-flex justify-content-between align-items-center flex-wrap"
      onClick={(e) => openModal(e, data)}
    >
      <div className="text-left" style={{ whiteSpace: "normal", width: "90%" }}>
        {props.data.cardName}
      </div>
      <button
        className="btn btn-light p-1 rounded delete-card "
        onClick={(e) => {
          props.onDelete(e, data.cardId);
        }}
      >
        &times;
      </button>
    </button>
  );
};
export default Card;
