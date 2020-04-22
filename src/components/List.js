import React, { Component } from "react";
import Card from "./card";
import Input from "./addcard";
import Modal from "./Modal";
const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const url = "https://api.trello.com";
const key = "23fe0646c0d1253eb430f7e02db925a0";
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
    let url = `https://api.trello.com/1/cards/${data}?key=${key}&token=${token}`;
    fetch(url, {
      method: "DELETE",
    });
    this.setState({
      cards: this.state.cards.filter((obj) => obj.id !== data),
    });
  };

  handleInput = (e, name) => {
    e.preventDefault();
    this.setState({ addCard: true });
    let url = `https://api.trello.com/1/cards?idList=5e8838bc95f9447a48ade567&name=${name}&key=${key}&token=${token}`;
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

  activeModal = (e) => {
    this.setState({
      show: true,
      modal: e,
    });
  };

  removeModal = (e) => {
    this.setState({ show: false });
  };

  componentDidMount() {
    let url = `https://api.trello.com/1/lists/5e8838bc95f9447a48ade567/cards?key=${key}&token=${token}`;
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
      <div className="cards m-2 todo-list" onClick={this.handleClick}>
        <div className="card-header bg-light rounded-2">Doing</div>
        <div className="card-body border-0 bg-light" id="body">
          {this.state.cards.map((card) => {
            console.log(card.id);
            return (
              <button
                className="btn btn-primary btn-sm mb-2 add-card"
                onClick={(e) => this.activeModal(card)}
                id={card.id}
                key={card.id}
              >
                {card.name}
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
        </div>
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
              className="btn btn secondary  add-card"
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
