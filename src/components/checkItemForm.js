import React from "react";
export default function Form(props) {
  return (
    <form>
      <input
        type="text"
        className="form-control "
        placeholder="enter name"
        onChange={props.handleChange}
        value={props.input}
      />

      <button
        className="btn btn-success mr-3 mt-2"
        onClick={(e) => props.onAdd(e, props.input)}
      >
        update
      </button>

      <button
        className="btn btn-light mt-2"
        onClick={(e) => props.handleCancel(e)}
      >
        X
      </button>
    </form>
  );
}
