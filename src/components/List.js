import React, { Component } from "react";
import Card from "./deleteCard";
import Input from "./Form";
import Modal from "./Modal";
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

  handleDeleteCard = (e, cardId) => {
    e.preventDefault();
    let url = `https://api.trello.com/1/cards/${cardId}?key=${this.props.userKey}&token=${this.props.token}`;
    fetch(url, {
      method: "DELETE",
    }).then((res) => {
      let cards = this.state.cards.filter((card) => card.cardId !== cardId);
      this.setState({ cards });
    });
  };

  handleAddCard = (e, name) => {
    e.preventDefault();
    this.setState({ addCard: true });
    let url = `https://api.trello.com/1/cards?idList=${this.props.list.listId}&name=${name}&key=${this.props.userKey}&token=${this.props.token}`;
    fetch(url, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        let cards = [
          ...this.state.cards,
          { cardId: res.id, cardName: res.name },
        ];
        this.setState({ cards });
      });
  };

  openModal = (e, card) => {
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
    let url = `https://api.trello.com/1/lists/${this.props.list.listId}/cards?key=${this.props.userKey}&token=${this.props.token}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        let cards = res.map((card) => {
          return { cardId: card.id, cardName: card.name };
        });
        this.setState({ cards });
      });
  }
  render() {
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
        {this.props.list.listName}
        {this.state.cards.map((card) => {
          return (
            <button
              className="btn btn-light mb-2 p-2 w-100  h-20 rounded d-flex justify-content-between align-items-center flex-wrap add-card"
              onClick={(e) => this.openModal(e, card)}
              id={card.cardId}
            >
              <div className="text-left" style={{ width: "80%" }}>
                {card.cardName}
              </div>
              <Card
                onDelete={this.handleDeleteCard}
                data={card}
                key={card.cardId}
              />
            </button>
          );
        })}
        {this.state.show ? (
          <Modal
            removeModal={this.removeModal}
            show={this.state.show}
            data={this.state.cards}
            modal={this.state.modal}
            userKey={this.props.userKey}
            token={this.props.token}
          />
        ) : null}
        <div className="card-footer bg-light">
          {this.state.addCard ? (
            <Input onAdd={this.handleAddCard} onDelete={this.cancelAddCard} />
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
