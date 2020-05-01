import React, { Component } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import Addchecklist from "./addcard";
import Additem from "./additem";
import Checklist from "./Checklist";
import {
  getChecklists,
  addChecklist,
  deleteChecklist,
} from "../Actions/Modalaction";

class ChecklistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      // updateCheckItem: true,
      // addCheckitem: false,
      addChecklist: false,
      removeModal: this.props.removeModal,
    };
  }

  handleAddChecklist = (e, input) => {
    e.preventDefault();
    this.props.addChecklist(input, this.props.modal.id);
  };

  // removeUpdateCheckItem = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     updateCheckItem: false,
  //   });
  // };

  // checklistItemUpdate = (e, checkitemname) => {
  //   console.log(checkitemname);
  //   if (e.target.className === "update") {
  //     return;
  //   }
  //   this.setState({
  //     updateCheckItem: true,
  //     checkitemname: checkitemname,
  //   });
  // };

  // removeChecklistitem = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     addCheckitem: false,
  //   });
  // };

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

  // showAddCheckitem = (name, checklistid) => {
  //   this.setState({
  //     addCheckitem: true,
  //     checklistname: name,
  //     checklistid: checklistid,
  //   });
  // };

  // handleAddCheckitem = (e, input, checklistid) => {
  //   e.preventDefault();
  //   console.log(input, e, checklistid);
  //   let url = `https://api.trello.com/1/checklists/${checklistid}/checkItems?name=${input}&key=${key}&token=${token}`;
  //   fetch(url, {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       this.state.checklist.forEach((obj, index, arr) => {
  //         let c;
  //         if (obj.checklistid === checklistid) {
  //           c = obj.checkitems;
  //           c.push(result);
  //           console.log(c);
  //           let newchecklist = this.state.checklist;
  //           newchecklist[index] = {
  //             name: result.name,
  //             checklistid: result.idChecklist,
  //             checkitems: c,
  //             key: result.idChecklist,
  //           };
  //           console.log(newchecklist);
  //           this.setState({
  //             checklist: newchecklist,
  //             addCheckitem: true,
  //           });
  //         }
  //       });
  //     });
  // };

  // handleDeleteCheckItem = (e, checklistid, checkitemid) => {
  //   console.log(e);
  //   let url = `https://api.trello.com/1/checklists/${checklistid}/checkItems/${checkitemid}?key=${key}&token=${token}`;
  //   fetch(url, {
  //     method: "DELETE",
  //   });
  //   this.state.checklist.forEach((obj, index, arr) => {
  //     let c;
  //     if (obj.checklistid === checklistid) {
  //       c = obj.checkitems.filter((data) => data.id !== checkitemid);
  //       console.log(c);
  //       let newchecklist = this.state.checklist;
  //       newchecklist[index] = {
  //         checkitems: c,
  //         checklistid: obj.checklistid,
  //         key: obj.checklistid,
  //         name: obj.name,
  //       };
  //       console.log(newchecklist);
  //       this.setState({
  //         checklist: newchecklist,
  //       });
  //     }
  //   });
  // };

  // updateCheckitemstate = (checklistid, checkitemid, state) => {
  //   let url = `https://api.trello.com/1/cards/${this.props.modal.id}/checkItem/${checkitemid}?state=${state}&key=${key}&token=${token}`;
  //   fetch(url, {
  //     method: "PUT",
  //   });
  //   this.state.checklist.forEach((obj, index, arr) => {
  //     let c;
  //     if (obj.checklistid === checklistid) {
  //       c = obj.checkitems;
  //       c.map((data) => {
  //         if (data.id === checkitemid) {
  //           data.state = state;
  //         }
  //         return data;
  //       });
  //       console.log(c);
  //       let newchecklist = this.state.checklist;
  //       newchecklist[index] = {
  //         checkitems: c,
  //         name: obj.name,
  //         checklistid: checklistid,
  //         key: checklistid,
  //       };
  //       console.log(newchecklist);
  //       this.setState({
  //         checklist: newchecklist,
  //       });
  //     }
  //   });
  // };

  // handleUpdateCheckitem = (e, input, checklistid, checkitemid) => {
  //   e.preventDefault();
  //   let url = `https://api.trello.com/1/cards/${this.props.modal.id}/checkItem/${checkitemid}?name=${input}&key=${key}&token=${token}`;
  //   fetch(url, {
  //     method: "PUT",
  //   });
  //   this.state.checklist.forEach((obj, index, arr) => {
  //     let c;
  //     if (obj.checklistid === checklistid) {
  //       c = obj.checkitems;
  //       c.map((data) => {
  //         if (obj.checklistid === checkitemid) {
  //           data.name = input;
  //         }
  //         return data;
  //       });
  //       console.log(c);
  //       let newchecklist = this.state.checklist;
  //       newchecklist[index] = {
  //         checkitems: c,
  //         name: input,
  //         checklistid: checklistid,
  //         key: checklistid,
  //       };
  //       console.log(newchecklist);
  //       this.setState({
  //         checklist: newchecklist,
  //       });
  //     }
  //   });
  // };

  // handleChange = (e) => {
  //   this.setState({ input: e.target.value });
  // };

  deleteChecklist = (e, checklistid) => {
    e.preventDefault();
    this.props.deleteChecklist(checklistid);
  };

  componentDidMount() {
    this.props.getChecklists(this.props.modal.id);
  }

  render() {
    console.log(this.props.modal.id);
    const { addChecklist } = this.state;
    return (
      <Modal show={this.props.show} onHide={this.props.removeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modal.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
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
          </div>

          <div>
            {this.props.checklists.map((checklist) => {
              return (
                <Checklist
                  key={checklist.id}
                  checklist={checklist}
                  deleteChecklist={this.deleteChecklist}
                />
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
const mapStateToProps = (state) => ({
  checklists: state.Modalreducer.checklists,
});
export default connect(mapStateToProps, {
  getChecklists,
  addChecklist,
  deleteChecklist,
})(ChecklistModal);
