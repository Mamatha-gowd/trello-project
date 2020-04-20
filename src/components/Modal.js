import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import Input from "./addcard";
const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const url = "https://api.trello.com";
const key = "23fe0646c0d1253eb430f7e02db925a0";

class ChecklistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checklist: [],
      cardId: props.cardId,
      addChecklist: false,
      show: true,
    };
  }

  componentDidMount() {
    let url = `https://api.trello.com/1/cards/${this.state.cardId}/checklists?key=${key}&token=${token}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        this.setStae({
          checklist: [
            ...this.state.checklist,
            { name: result.name, checklistid: [result.id, result.checkItems] },
          ],
        });
      });
  }

  render() {
    return (
      <Modal size="lg" show={this.state.show}>
        {/* onHide={handleClose} */}
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            {/* onClick={handleClose} */}
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ChecklistModal;
