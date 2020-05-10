import React, { Component } from "react";
import { updateCheckListItemStateAPI } from "./API";
class CheckItem extends Component {
  state = {
    checkItemstate: this.props.checkitem.state,
  };

  handleCheckItemState = (checkitem, checklist) => {
    updateCheckListItemStateAPI(
      checklist,
      checkitem,
      this.state.checkItemstate
    ).then((res) => {
      this.setState((state) => {
        return {
          checkItemstate:
            state.checkItemstate === "complete" ? "incomplete" : "complete",
        };
      });
    });
  };

  render() {
    return (
      <div className="d-flex justify-content-between align-items-center mt-3 rounded">
        <input
          type="checkbox"
          checked={this.state.checkItemstate === "complete" ? true : false}
          onChange={() =>
            this.handleCheckItemState(
              this.props.checkitem,
              this.props.checklist
            )
          }
        />
        <div>
          <label>{this.props.checkitem.name}</label>
        </div>
        <button
          className="btn btn-light align-right checkitem"
          onClick={() =>
            this.props.handleDeleteCheckItem(this.props.checkitem.id)
          }
        >
          &times;
        </button>
      </div>
    );
  }
}
export default CheckItem;
