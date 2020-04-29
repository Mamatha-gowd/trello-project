import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import Card from "./card";
import Input from "./addcard";
import Modal from "./Modal";
import { getCards, addCard, deleteCard } from "../Actions/Cardaction";
class List extends Component {
  constructor(props) {
    super();
    this.state = {
      addCard: false,
      show: false,
      modal: {},
    };
  }
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
    this.props.deleteCard(this.props.list.id, data);
  };

  handleInput = (e, name) => {
    e.preventDefault();
    this.props.addCard(name, this.props.list.id);
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
    this.props.getCards(this.props.list.id);
  }
  render() {
    console.log(this.props);
    const { addCard } = this.state.addCard;
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
        {this.props.cards[this.props.list.id] !== undefined
          ? this.props.cards[this.props.list.id].map((cards) => {
              return (
                <button
                  className="btn btn-light mb-2 p-2 w-100  h-20 rounded d-flex justify-content-between align-items-center flex-wrap add-card"
                  onClick={(e) => this.activeModal(e, cards)}
                  id={cards.id}
                  key={cards.id}
                >
                  <div className="text-left" style={{ width: "80%" }}>
                    {cards.name}
                  </div>
                  <Card
                    onDelete={this.deleteCard}
                    data={cards}
                    key={cards.id}
                    id={cards.id}
                    //name={cardDetails.name}
                  />
                </button>
              );
            })
          : null}
        {/* </div> */}
        {this.state.show ? (
          <Modal
            removeModal={this.removeModal}
            show={this.state.show}
            data={this.state.cardDetails}
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
const mapStateToProps = (state) => ({ cards: state.Cardreducer.cards });
export default connect(mapStateToProps, { getCards, addCard, deleteCard })(
  List
);
