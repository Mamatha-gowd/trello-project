import React, { Component } from "react";
import { connect } from "react-redux";
import Checkitem from "./Checkitem";
import Add from "./addcard";
import {
  getCheckitems,
  addCheckitem,
  deleteCheckitem,
  updateState,
} from "../Actions/Checklistaction";

class Checklist extends Component {
  state = {
    addcheckitem: false,
  };

  handleDeletecheckitem = (e, checkitemid) => {
    e.preventDefault();
    this.props.deleteCheckitem(this.props.checklist.id, checkitemid);
  };

  showAddcheckitem = () => {
    this.setState({ addcheckitem: true });
  };

  updateState = (e, checkitem, state) => {
    e.preventDefault();
    this.props.updateState(this.props.checklist.idCard, checkitem, state);
  };

  handleAddcheckitem = (e, input) => {
    e.preventDefault();
    this.props.addCheckitem(input, this.props.checklist.id);
    this.setState({ addcheckitem: false });
  };

  cancelCheckitem = (e) => {
    e.preventDefault();
    this.setState({ addcheckitem: false });
  };

  componentDidMount() {
    this.props.getCheckitems(
      this.props.checklist.id,
      this.props.checklist.checkItems
    );
  }

  render() {
    return (
      <div className="my-3">
        <div className="d-flex justify-content-between align-items-center">
          {this.props.checklist.name}
          <button
            className="btn btn-light"
            onClick={(e) =>
              this.props.deleteChecklist(e, this.props.checklist.id)
            }
          >
            Remove
          </button>
        </div>
        <div className="py-2">
          {this.props.checkitems[this.props.checklist.id] !== undefined
            ? this.props.checkitems[this.props.checklist.id].map((obj) => {
                console.log(obj);
                return (
                  //   <Checkitem
                  //     key={obj.id}
                  //     checkitem={obj}
                  //     checklist={this.props.checklist}
                  //     deleteCheckitem={this.handleDeletecheckitem}
                  //   />
                  <div className="d-flex justify-content-between mt-2">
                    {obj.state === "incomplete" ? (
                      <input
                        type="checkbox"
                        className="form-control checkitem"
                        checked={false}
                        onChange={(e) => {
                          this.updateState(e, obj.id, obj.state);
                        }}
                      ></input>
                    ) : (
                      <input
                        type="checkbox"
                        className="form-control checkitem"
                        checked={true}
                        onChange={(e) => {
                          this.updateState(e, obj.id, obj.state);
                        }}
                      ></input>
                    )}
                    <label className="px-3">{obj.name}</label>
                    <button
                      className="btn btn-light cancel-button"
                      onClick={(e) => this.handleDeletecheckitem(e, obj.id)}
                    >
                      X
                    </button>
                  </div>
                );
              })
            : null}
        </div>
        {this.state.addcheckitem ? (
          <Add
            onAdd={this.handleAddcheckitem}
            onDelete={this.cancelCheckitem}
          />
        ) : (
          <div
            className="btn px-2 py-0 d-flex add-card"
            onClick={this.showAddcheckitem}
          >
            Add item
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  checkitems: state.Checklistreducer.checkitems,
});
export default connect(mapStateToProps, {
  getCheckitems,
  addCheckitem,
  deleteCheckitem,
  updateState,
})(Checklist);
