import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Card from "./card";
import Input from "./addcard";
import Modal from "./Modal";
import Listfile from "./Listfile";
const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const url = "https://api.trello.com";
const key = "23fe0646c0d1253eb430f7e02db925a0";
const listid = "5e8838bc95f9447a48ade567";
class List extends Component {
  state = {
    addCard: false,
    show: false,
    cards: [],
    modal: {},
  };
  showAddCard = () => {
    this.setState({
      addCard: true,
    });
  };

  cancelAddCard = (e) => {
    e.preventDefault();
    this.setState({
      addCard: false,
    });
  };

  deleteCard = (e, data) => {
    e.preventDefault();
    let url = `https://api.trello.com/1/cards/${data}?key=${key}&token=${token}`;
    fetch(url, {
      method: "DELETE",
    });
    this.setState({
      cards: this.state.cards.filter((obj) => obj.id !== data),
      show: false,
    });
  };

  handleInput = (e, name) => {
    e.preventDefault();
    this.setState({ addCard: true });
    let url = `https://api.trello.com/1/cards?idList=${this.props.list.id}&name=${name}&key=${key}&token=${token}`;
    fetch(url, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        let cardname = result.name;
        let cardid = result.id;
        this.setState({
          cards: [
            ...this.state.cards,
            {
              name: cardname,
              id: cardid,
            },
          ],
        });
      });
  };

  activeModal = (e, card) => {
    if (!e.target.className.includes("delete-card")) {
      this.setState({
        show: true,
        modal: card,
      });
    }
  };

  removeModal = (e) => {
    this.setState({ show: false });
  };

  componentDidMount() {
    let url = `https://api.trello.com/1/lists/${this.props.list.id}/cards?key=${key}&token=${token}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        let data = result;
        for (let i = 0; i < data.length; i++) {
          let cardname = data[i].name;
          let cardid = data[i].id;
          this.setState(() => ({
            cards: [
              ...this.state.cards,
              {
                name: cardname,
                id: cardid,
              },
            ],
          }));
        }
      });
  }
  render() {
    const cards = this.state.cards;
    const { addCard } = this.state.addCard;
    console.log(cards);
    return (
      <div
        className="rounded p-2 mr-2 ml-2 mt-3 d-inline-block todo-list"
        style={{
          backgroundColor: "lightgrey",
          fontSize: "1.5em",
          width: "12em",
          boxSizing: "border-box",
        }}
        onClick={this.handleClick}
      >
        {this.props.list.name}
        {/* <button
            className="btn text-black float-right"
            onClick={(e) => this.props.deleteList(e, this.props.list.id)}
          >
            delete
          </button> */}

        {/* <div className="card-body border-0 bg-light" id="body"> */}
        {this.state.cards.map((card) => {
          console.log(card.id);
          return (
            <button
              className="btn btn-light mb-2 p-2 w-100 mt-5 h-20 rounded d-flex justify-content-between align-items-center flex-wrap add-card"
              onClick={(e) => this.activeModal(e, card)}
              id={card.id}
              key={card.id}
            >
              <div className="text-left" style={{ width: "80%" }}>
                {card.name}
              </div>
              <Card
                onDelete={this.deleteCard}
                data={card}
                key={card.id}
                id={card.id}
                name={card.name}
              />
            </button>
          );
        })}
        {/* </div> */}
        {this.state.show ? (
          <Modal
            removeModal={this.removeModal}
            show={this.state.show}
            data={this.state.cards}
            modal={this.state.modal}
          />
        ) : null}
        <div className="card-footer bg-light">
          {this.state.addCard ? (
            <Input onAdd={this.handleInput} onDelete={this.cancelAddCard} />
          ) : (
            <div
              className="btn px-2 py-0 d-flex add-card"
              onClick={this.showAddCard}
            >
              Add another card
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default List;
