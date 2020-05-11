import React from "react";
export default function Form(props) {
  return (
    <form className="w-100">
      <input
        type="text"
        className="form-control "
        placeholder="enter name"
        onChange={props.handleChange}
        value={props.input}
      />

      <button
        className="btn btn-success py-1 px-2 mr-3 mt-2"
        onClick={(e) => props.onAdd(e, props.input)}
      >
        update
      </button>
      <button
        className="btn btn-light p-0 mt-2"
        onClick={(e) => props.onDelete(e)}
      >
        &times;
      </button>
    </form>
  );
}
