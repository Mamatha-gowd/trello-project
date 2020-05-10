import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import Addchecklist from "./Form";
import Checklist from "./Checklist";
import { getCheckListAPI, addCheckListAPI, deleteCheckListAPI } from "./API";

class Model extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      checklist: [],
      addChecklist: false,
    };
  }

  handleAddChecklist = (e, name) => {
    e.preventDefault();
    addCheckListAPI(this.props.modal.cardId, name).then((res) => {
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
    deleteCheckListAPI(checklistid).then((res) => {
      let checklist = this.state.checklist.filter(
        (checklist) => checklist.id !== checklistid
      );
      this.setState({ checklist });
    });
  };

  componentDidMount() {
    getCheckListAPI(this.props.modal.cardId).then((res) => {
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
                  <Checklist key={checklist.id} checklist={checklist} />
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
export default Model;
