import React, { Component } from "react";
import additem from "./additem";
import { updateCheckitem, updateState } from "../Actions/Checklistaction";
import { connect } from "react-redux";

class Checkitem extends Component {
  state = {
    updatecheckitem: false,
  };

  handleInput = (e, input) => {
    e.preventDefault();
    this.props.updateCheckitem(
      this.props.checklist.idCard,
      this.checkitem.id,
      input
    );
    this.setState({ updatecheckitem: false });
  };

  cancelupdatecheckitem = (e) => {
    e.preventDefault();
    this.setState({ updatecheckitem: false });
  };

  showupdatecheckitem = () => {
    this.setState({ updatecheckitem: true });
  };

  render() {
    return (
      <div className="d-flex justify-content-between align-items-center py-2 px-3 rounded ">
        <div onClick={this.showupdatecheckitem}>
          {this.state.updatecheckitem ? (
            <additem
              onAdd={this.handleInput}
              onDelete={this.cancelupdatecheckitem}
            />
          ) : null}
        </div>
        <button
          className="btn btn-light align-right"
          onClick={(e) => this.props.deleteCheckitem(this.checkitem.id)}
        >
          &times;
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  checkitems: state.Checklistreducer.checkitems,
});
export default connect(mapStateToProps, { updateCheckitem, updateState })(
  Checkitem
);
