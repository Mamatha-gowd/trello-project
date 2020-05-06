import React, { Component } from "react";
import Checkitem from "./Checkitem";
import Form from "./Form";

class Checklist extends Component {
  state = {
    checkItems: this.props.checklist.checkItems,
    addCheckItembtn: false,
  };

  handleDeleteCheckItem = (checkItemId) => {
    let checkItems = this.state.checkItems.filter(
      (checkitem) => checkitem.id !== checkItemId
    );
    let url = `https://api.trello.com/1/checklists/${this.props.checklist.id}/checkItems/${checkItemId}?key=${this.props.userKey}&token=${this.props.token}`;
    fetch(url, {
      method: "DELETE",
    }).then((res) => {
      this.setState({ checkItems });
    });
  };

  handleShowCheckItem = () => {
    this.setState({ addCheckItembtn: true });
  };

  handleAddCheckItem = (e, name) => {
    e.preventDefault();
    let url = `https://api.trello.com/1/checklists/${this.props.checklist.id}/checkItems?name=${name}&key=${this.props.userKey}&token=${this.props.token}`;
    fetch(url, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
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
          <div className="py-2">
            {this.state.checkItems.map((checkitem) => {
              return (
                <Checkitem
                  key={checkitem.id}
                  checkitem={checkitem}
                  checklist={this.props.checklist}
                  handleDeleteCheckItem={this.handleDeleteCheckItem}
                  userKey={this.props.userKey}
                  token={this.props.token}
                />
              );
            })}
          </div>
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
