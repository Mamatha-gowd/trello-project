import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import Addchecklist from "./addcard";
import AddCheckitem from "./addcheckitem";
import AddCheckbox from "./addcheckbox";
import Additem from "./additem";
const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const url = "https://api.trello.com";
const key = "23fe0646c0d1253eb430f7e02db925a0";

class ChecklistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      checklist: [],
      updateCheckItem: true,
      addCheckitem: false,
      addChecklist: false,
      removeModal: this.props.removeModal,
    };
  }

  handleAddChecklist = async (e, input) => {
    e.preventDefault();
    let url = `https://api.trello.com/1/checklists?idCard=${this.props.modal.id}&name=${input}&key=${key}&token=${token}`;
    let data = await fetch(url, {
      method: "POST",
    });
    data = await data.json();
    this.setState({
      checklist: [
        ...this.state.checklist,
        {
          name: data.name,
          checklistid: data.id,
          checkitems: data.checkItems,
          key: data.id,
        },
      ],
      addChecklist: false,
    });
  };

  removeUpdateCheckItem = (e) => {
    e.preventDefault();
    this.setState({
      updateCheckItem: false,
    });
  };

  checklistItemUpdate = (e, checkitemname) => {
    console.log(checkitemname);
    if (e.target.className === "update") {
      return;
    }
    this.setState({
      updateCheckItem: true,
      checkitemname: checkitemname,
    });
  };

  removeChecklistitem = (e) => {
    e.preventDefault();
    this.setState({
      addCheckitem: false,
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

  showAddCheckitem = (name, checklistid) => {
    this.setState({
      addCheckitem: true,
      checklistname: name,
      checklistid: checklistid,
    });
  };

  handleAddCheckitem = (e, input, checklistid) => {
    e.preventDefault();
    console.log(input, e, checklistid);
    let url = `https://api.trello.com/1/checklists/${checklistid}/checkItems?name=${input}&key=${key}&token=${token}`;
    fetch(url, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.state.checklist.forEach((obj, index, arr) => {
          let c;
          if (obj.checklistid === checklistid) {
            c = obj.checkitems;
            c.push(result);
            console.log(c);
            let newchecklist = this.state.checklist;
            newchecklist[index] = {
              name: result.name,
              checklistid: result.idChecklist,
              checkitems: c,
              key: result.idChecklist,
            };
            console.log(newchecklist);
            this.setState({
              checklist: newchecklist,
              addCheckitem: true,
            });
          }
        });
      });
  };

  handleDeleteCheckItem = (e, checklistid, checkitemid) => {
    console.log(e);
    let url = `https://api.trello.com/1/checklists/${checklistid}/checkItems/${checkitemid}?key=${key}&token=${token}`;
    fetch(url, {
      method: "DELETE",
    });
    this.state.checklist.forEach((obj, index, arr) => {
      let c;
      if (obj.checklistid === checklistid) {
        c = obj.checkitems.filter((data) => data.id !== checkitemid);
        console.log(c);
        let newchecklist = this.state.checklist;
        newchecklist[index] = {
          checkitems: c,
          checklistid: obj.checklistid,
          key: obj.checklistid,
          name: obj.name,
        };
        console.log(newchecklist);
        this.setState({
          checklist: newchecklist,
        });
      }
    });
  };

  updateCheckitemstate = (checklistid, checkitemid, state) => {
    let url = `https://api.trello.com/1/cards/${this.props.modal.id}/checkItem/${checkitemid}?state=${state}&key=${key}&token=${token}`;
    fetch(url, {
      method: "PUT",
    });
    this.state.checklist.forEach((obj, index, arr) => {
      let c;
      if (obj.checklistid === checklistid) {
        c = obj.checkitems;
        c.map((data) => {
          if (data.id === checkitemid) {
            data.state = state;
          }
          return data;
        });
        console.log(c);
        let newchecklist = this.state.checklist;
        newchecklist[index] = {
          checkitems: c,
          name: obj.name,
          checklistid: checklistid,
          key: checklistid,
        };
        console.log(newchecklist);
        this.setState({
          checklist: newchecklist,
        });
      }
    });
  };

  handleUpdateCheckitem = (e, input, checklistid, checkitemid) => {
    e.preventDefault();
    let url = `https://api.trello.com/1/cards/${this.props.modal.id}/checkItem/${checkitemid}?name=${input}&key=${key}&token=${token}`;
    fetch(url, {
      method: "PUT",
    });
    this.state.checklist.forEach((obj, index, arr) => {
      let c;
      if (obj.checklistid === checklistid) {
        c = obj.checkitems;
        c.map((data) => {
          if (obj.checklistid === checkitemid) {
            data.name = input;
          }
          return data;
        });
        console.log(c);
        let newchecklist = this.state.checklist;
        newchecklist[index] = {
          checkitems: c,
          name: input,
          checklistid: checklistid,
          key: checklistid,
        };
        console.log(newchecklist);
        this.setState({
          checklist: newchecklist,
        });
      }
    });
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  deleteChecklist = async (e, checklistid) => {
    e.preventDefault();
    let url = `https://api.trello.com/1/checklists/${checklistid}?key=${key}&token=${token}`;
    await fetch(url, {
      method: "DELETE",
    });
    this.setState({
      checklist: this.state.checklist.filter(
        (obj) => obj.checklistid !== checklistid
      ),
    });
  };

  async componentDidMount() {
    let url = `https://api.trello.com/1/cards/${this.props.modal.id}/checklists?key=${key}&token=${token}`;
    let data = await fetch(url, {
      method: "GET",
    });
    data = await data.json();
    console.log(data);
    data.map((obj) =>
      this.setState({
        checklist: [
          ...this.state.checklist,
          {
            name: obj.name,
            checklistid: obj.id,
            checkitems: obj.checkItems,
            key: obj.id,
          },
        ],
      })
    );
  }

  render() {
    const { addCheckitem, addChecklist, updateCheckItem } = this.state;
    return (
      <Modal show={this.props.show} onHide={this.props.removeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modal.name}</Modal.Title>
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
            {this.state.checklist.map((obj) => {
              return (
                <div className="form mt-4" key={obj.checklistid}>
                  <label className="label">{obj.name}</label>
                  <button
                    onClick={(e) => this.deleteChecklist(e, obj.checklistid)}
                    className="btn btn-light float-right"
                  >
                    Remove
                  </button>
                  {obj.checkitems.map((checkitem) => {
                    return updateCheckItem &&
                      checkitem.name === this.state.checkitemname ? (
                      <AddCheckitem
                        checkitemid={checkitem.id}
                        checklistid={obj.checklistid}
                        itemname={checkitem.name}
                        onAdd={this.handleUpdateCheckitem}
                        onRemove={this.removeUpdateCheckItem}
                      />
                    ) : (
                      <div
                        onClick={(e) =>
                          this.checklistItemUpdate(e, checkitem.name)
                        }
                        className="checklistitems mt-3 update"
                        key={checkitem.id}
                      >
                        <AddCheckbox
                          key={obj.checklistid}
                          checklistid={obj.checklistid}
                          checkitemid={checkitem.id}
                          updateState={this.updateCheckitemstate}
                          name={checkitem.name}
                          deleteCheckitem={this.handleDeleteCheckItem}
                          state={checkitem.state}
                        />
                      </div>
                    );
                  })}
                  {addCheckitem && obj.name === this.state.checklistname ? (
                    <Additem
                      onAdd={this.handleAddCheckitem}
                      onRemove={this.removeChecklistitem}
                      checklistid={obj.checklistid}
                    />
                  ) : (
                    <div
                      className="add-item"
                      onClick={() =>
                        this.showAddCheckitem(obj.name, obj.checklistid)
                      }
                    >
                      <Button variant="light">add item</Button>
                    </div>
                  )}
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
