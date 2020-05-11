import React, { Component } from "react";
import Checkitem from "./Checkitem";
import Form from "./Form";
import { addCheckListItemAPI, deleteCheckListItemAPI } from "./API";

class Checklist extends Component {
  state = {
    checkItems: this.props.checklist.checkItems,
    addCheckItembtn: false,
  };

  handleDeleteCheckItem = (checkItemId) => {
    let checkItems = this.state.checkItems.filter(
      (checkitem) => checkitem.id !== checkItemId
    );
    deleteCheckListItemAPI(this.props.checklist.id, checkItemId).then((res) => {
      this.setState({ checkItems });
    });
  };

  handleShowCheckItem = () => {
    this.setState({ addCheckItembtn: true });
  };

  handleAddCheckItem = (e, name) => {
    e.preventDefault();
    addCheckListItemAPI(this.props.checklist.id, name).then((res) => {
      let checkItems = [...this.state.checkItems, res];
      this.setState({ checkItems });
    });
  };

  handleCancelCheckItem = (e) => {
    e.preventDefault();
    this.setState({ addCheckItembtn: false });
  };

  render() {
    return (
      <div className="my-3">
        <div className="d-flex justify-content-between align-items-center">
          {this.props.checklist.name}
          <button
            className="btn btn-light"
            onClick={(e) =>
              this.props.handleDeleteChecklist(e, this.props.checklist.id)
            }
          >
            Delete
          </button>
        </div>
        <div className="py-2">
          {this.state.checkItems.map((checkitem) => {
            return (
              <Checkitem
                key={checkitem.id}
                checkitem={checkitem}
                checklist={this.props.checklist}
                handleDeleteCheckItem={this.handleDeleteCheckItem}
              />
            );
          })}
        </div>

        {this.state.addCheckItembtn ? (
          <Form
            onAdd={this.handleAddCheckItem}
            onDelete={this.handleCancelCheckItem}
          />
        ) : (
          <div
            className="btn px-2 py-0 d-flex "
            onClick={this.handleShowCheckItem}
          >
            Add item
          </div>
        )}
      </div>
    );
  }
}
export default Checklist;
