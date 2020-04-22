import React, { Component } from "react";
import Addcheckbox from "./addcheckbox";
const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const url = "https://api.trello.com";
const key = "23fe0646c0d1253eb430f7e02db925a0";

class Checkitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkitemstate: this.props.checkitems.state,
      input: this.props.checkitems.name,
      updatecheckitem: false,
    };
  }

  checkItemState = (checkitem, checklist) => {
    let url = `https://api.trello.com/1/cards/${checklist.idCard}/checkItem/${
      checkitem.id
    }?key=${key}&token=${token}&state=${
      this.state.checkitemstate === "complete" ? "incomplete" : "complete"
    }`;
    fetch(url, {
      method: "PUT",
    });
    this.setState((state) => {
      return {
        checkitemstate:
          state.checkitemstate === "complete" ? "incomplete" : "complete",
      };
    });
  };

  handleInput = (e, input) => {
    e.preventDefault();
    let url = `https://api.trello.com/1/cards/${this.props.checklist.idCard}/checkItem/${this.props.checkitems.checklistid}?key=${key}&token=${token}&name=${input}`;
    fetch(url, {
      method: "PUT",
    });
    this.setState({ updatecheckitem: false });
  };

  handleupdatecheckitem = () => {
    this.setState({ updatecheckitem: true });
  };

  handleRemove = (e) => {
    e.preventDefault();
    this.setState({ updatecheckitem: false });
  };

  render() {
    console.log(this.props.checklist);
    const { onRemove, checklist } = this.props;
    return (
      <div className="d-flex justify-content-between align-items-center px-3 rounded checkItem">
        <input
          type="checkbox"
          checked={this.state.checkitemstate === "complete" ? true : false}
          onChange={() =>
            this.checkItemState(this.props.checkitems, this.props.checklist)
          }
        />
        <div onClick={this.handleupdatecheckitem}>
          {this.state.checkitemstate ? (
            this.state.checkitemstate === "complete" ? (
              <h5>{this.state.input}</h5>
            ) : (
              <h5>{this.state.input}</h5>
            )
          ) : (
            <Addcheckbox
              handleInput={this.handleInput}
              handleRemove={this.handleRemove}
              //   handleChange={this.handleChange}
              //input={this.state.input}
            />
          )}
        </div>
        <button
          className="float-right"
          onClick={(e) => onRemove(e, checklist.checklistid, checklist.check)}
        >
          X
        </button>
      </div>
    );
  }
}
export default Checkitem;
