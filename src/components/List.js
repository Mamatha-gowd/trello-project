import React, { Component } from "react";
import Card from "./Card";
import Input from "./Form";
import Modal from "./Modal";
import { getListCardsAPI, addCardAPI, deleteCardAPI } from "./API";
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
    deleteCardAPI(cardId).then((res) => {
      let cards = this.state.cards.filter((card) => card.cardId !== cardId);
      this.setState({ cards });
    });
  };

  handleAddCard = (e, name) => {
    e.preventDefault();
    this.setState({ addCard: true });
    addCardAPI(name, this.props.list.listId).then((res) => {
      let cards = [...this.state.cards, { cardId: res.id, cardName: res.name }];
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
    getListCardsAPI(this.props.list.listId).then((res) => {
      let cards = res.map((card) => {
        return { cardId: card.id, cardName: card.name };
      });
      this.setState({ cards });
    });
  }
  render() {
    return (
      <div
        className="rounded p-2 ml-2 mt-3 mr-2 d-inline-block todo-list"
        style={{
          backgroundColor: "lightgrey",
          fontSize: "1.5em",
          width: "12em",
          boxSizing: "border-box",
        }}
      >
        {this.props.list.listName}
        {this.state.cards.map((card) => {
          return (
            <Card
              onDelete={this.handleDeleteCard}
              data={card}
              key={card.cardId}
              openModal={this.openModal}
            />
          );
        })}
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
