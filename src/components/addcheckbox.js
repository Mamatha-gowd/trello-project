import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Addcheckbox extends Component {
  render() {
    const {
      checklistid,
      checkitemid,
      updateState,
      name,
      deleteCheckitem,
      state,
    } = this.props;
    return (
      <div className="d-flex text-start align-items-center">
        {state === "incomplete" ? (
          <input
            type="checkbox"
            className="update"
            onClick={() => updateState(checklistid, checkitemid, "complete")}
          />
        ) : (
          <input
            type="checkbox"
            className="update"
            onClick={() => updateState(checklistid, checkitemid, "incomplete")}
          />
        )}
        <div className="checkitems">
          <h5>{name}</h5>
        </div>
        <button
          className="btn btn-light delete-checkitem"
          onClick={(e) => deleteCheckitem(e, checklistid, checkitemid)}
        >
          x
        </button>
      </div>
    );
  }
}
export default Addcheckbox;
