import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import Input from "./addcard";
import CheckList from "./checklist";
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
      //cardId: this.props.cards.id,
      // addChecklist: false,
      removeModal: this.props.removeModal,
      input: "",
    };
  }

  handleInput = async (e, input) => {
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
    });
  };

  handleCheckitem = (e, input, checklistid) => {
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
            // c.filter((data)=>data.id === checkitemid)
            // c.map((data)=>{if (obj.checklistid === checklistid) {
            //   data.name = input;
            // }})
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
            });
          }
        });
      });
  };

  handleDeleteCheckItem = (checklistid, checkitemid) => {
    let url = `https://api.trello.com/1/checklists/${checklistid}/checkItems/${checkitemid}?key=${key}&token=${token}`;
    fetch(url, {
      method: "DELETE",
    });
    this.setState({
      checkItems: this.state.checkItems.filter((obj) => obj.id !== checkitemid),
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
    const { input } = this.state;
    return (
      <Modal show={this.props.show} onHide={this.props.removeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modal.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div classname="body">
            <form>
              <h5>Add checklist</h5>
              <input
                type="text"
                className="form-control mb-2"
                onChange={this.handleChange}
                value={input}
              />
              <button
                type="submit"
                className="btn btn-success mt-2"
                onClick={(e) => this.handleInput(e, input)}
              >
                Add
              </button>
            </form>
          </div>

          {this.state.checklist.map((items) => {
            console.log(items);
            return (
              <CheckList
                key={items.id}
                checklistdata={items}
                deleteChecklist={this.deleteChecklist}
                handleCheckitem={this.handleCheckitem}
              />
            );
          })}
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
