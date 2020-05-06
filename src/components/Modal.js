import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import Addchecklist from "./Form";
import Checklist from "./Checklist";

class ChecklistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      checklist: [],
      addChecklist: false,
      removeModal: this.props.removeModal,
    };
  }

  handleAddChecklist = (e, input) => {
    e.preventDefault();
    let url = `https://api.trello.com/1/checklists?idCard=${this.props.modal.cardId}&name=${input}&key=${this.props.userKey}&token=${this.props.token}`;
    fetch(url, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        let checklist = [...this.state.checklist, res];
        this.setState({ checklist });
      });
  };

  showAddChecklist = () => {
    this.setState({
      addChecklist: true,
    });
  };

  cancelAddChecklist = (e) => {
    console.log(e);
    e.preventDefault();
    this.setState({
      addChecklist: false,
    });
  };
  handleDeleteChecklist = (e, checklistid) => {
    e.preventDefault();
    let url = `https://api.trello.com/1/checklists/${checklistid}?key=${this.props.userKey}&token=${this.props.token}`;
    fetch(url, {
      method: "DELETE",
    }).then((res) => {
      let checklist = this.state.checklist.filter(
        (checklist) => checklist.id !== checklistid
      );
      this.setState({ checklist });
    });
  };

  componentDidMount() {
    let url = `https://api.trello.com/1/cards/${this.props.modal.cardId}/checklists?key=${this.props.userKey}&token=${this.props.token}`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({ checklist: res });
      });
  }

  render() {
    const { addChecklist } = this.state;
    console.log(this.state.checklist);
    return (
      <Modal show={this.props.show} onHide={this.props.removeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modal.cardName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addChecklist ? (
            <Addchecklist
              onAdd={this.handleAddChecklist}
              onDelete={this.cancelAddChecklist}
            />
          ) : (
            <div className="add-checklist" onClick={this.showAddChecklist}>
              <button className="btn btn-light">Add checklist</button>
            </div>
          )}
          <div className="checklist mt-2">
            {this.state.checklist.map((checklist) => {
              return (
                <div className="form mt-4">
                  <label className="label">{checklist.name}</label>
                  <button
                    onClick={(e) => this.handleDeleteChecklist(e, checklist.id)}
                    className="btn btn-light float-right"
                  >
                    Remove
                  </button>
                  <Checklist
                    key={checklist.id}
                    checklist={checklist}
                    userKey={this.props.userKey}
                    token={this.props.token}
                  />
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.removeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ChecklistModal;
