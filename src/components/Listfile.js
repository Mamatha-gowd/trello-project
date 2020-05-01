import React, { Component } from "react";
import Input from "./addcard";
import List from "./List";
import { connect } from "react-redux";
import { getLists, addList } from "../Actions/Listaction";

class Listfile extends Component {
  state = {
    addlist: false,
  };

  showAddList = () => {
    this.setState({
      addlist: true,
    });
  };

  cancelAddList = (e) => {
    e.preventDefault();
    this.setState({
      addlist: false,
    });
  };

  componentDidMount() {
    this.props.getLists(this.props.match.params.id);
  }

  handleInput = (e, name) => {
    e.preventDefault();
    this.props.addList(name, this.props.match.params.id);
    this.setState({ addlist: true });
  };
  render() {
    return (
      <div
        className="align-items-start list-container board"
        style={{
          whiteSpace: "wrap",
          height: "100vh",
        }}
      >
        {this.props.lists.map((list) => (
          <List list={list} key={list.id} />
        ))}
        <div
          style={{
            display: "inline-block",
            width: "15em",
            marginTop: "15px",
          }}
        >
          {this.state.addlist ? (
            <Input onAdd={this.handleInput} onDelete={this.cancelAddList} />
          ) : (
            <div
              className="rounded p-2 mr-2 d-inline-block "
              style={{
                backgroundColor: "lightgrey",
                fontSize: "1.5em",
                width: "10em",
                boxSizing: "border-box",
              }}
            >
              <button
                className="btn text-black listbutton"
                Style={{ backgroundColor: "lightgrey" }}
                onClick={this.showAddList}
              >
                + Add another list
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ lists: state.Listreducer.lists });

export default connect(mapStateToProps, { getLists, addList })(Listfile);
console.log(mapStateToProps);
