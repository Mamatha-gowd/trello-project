import React, { Component } from "react";
import { updateCheckListItemStateAPI, updateCheckListItemAPI } from "./API";
import Form from "./checkItemForm";
class CheckItem extends Component {
  state = {
    checkItemstate: this.props.checkitem.state,
    updateCheckitem: false,
    input: this.props.checkitem.name,
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

  handleUpdateCheckItem = (e) => {
    e.preventDefault();
    updateCheckListItemAPI(
      this.props.checklist.idCard,
      this.props.checkitem.id,
      this.state.input
    ).then((res) => {
      this.setState({ updateCheckitem: false });
    });
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleCancel = () => {
    this.setState({ updateCheckitem: false });
  };

  handleUpdateCheckitem = () => {
    this.setState({ updateCheckitem: true });
  };

  render() {
    return (
      <div className="d-flex justify-content-between align-items-center py-2 px-3 mt-3 rounded">
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
        <div style={{ width: "90%" }} onClick={this.handleUpdateCheckitem}>
          {this.state.updateCheckitem ? (
            <Form
              onAdd={this.handleUpdateCheckItem}
              handleCancel={this.handleCancel}
              handleChange={this.handleChange}
              input={this.state.input}
            />
          ) : (
            <label>{this.state.input}</label>
          )}
        </div>
        <button
          className="btn btn-light p-1 align-middle checkitem"
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
