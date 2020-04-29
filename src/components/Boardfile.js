import React, { Component } from "react";
import Board from "./Board";
import { connect } from "react-redux";
import { getBoards } from "../Actions/Boardaction";
class Boardfile extends Component {
  componentDidMount() {
    this.props.getBoards();
  }
  render() {
    console.log(this.props);
    const board = this.props.boards.map((board) => {
      return <Board key={board.id} board={board} />;
    });
    return (
      <div>
        <div className="d-flex justify-content-start board ">{board}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ boards: state.Boardreducer.boards });
export default connect(mapStateToProps, { getBoards })(Boardfile);
