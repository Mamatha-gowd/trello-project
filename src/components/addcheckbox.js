import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Addcheckbox extends Component {
  //   state = {
  //     input: "",
  //   };

  inputText = (e) => this.setState({ input: e.target.value });
  render() {
    const { input } = this.props.input;
    const { onAdd, onDelete } = this.props;
    return (
      <form>
        <input
          type="text"
          className="form-control "
          placeholder="enter checkitem name"
          onChange={this.inputText}
          value={this.props.input}
        />

        <button
          className="btn btn-success mr-4 mt-2"
          onClick={(e) => onAdd(e, input)}
        >
          update
        </button>

        <button className="btn btn-light" onClick={(e) => onDelete(e)}>
          X
        </button>
      </form>
    );
  }
}
export default Addcheckbox;
