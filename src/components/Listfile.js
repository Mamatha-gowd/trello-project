import React, { Component } from "react";
import Input from "./Form";
import List from "./List";

class Listfile extends Component {
  state = {
    lists: [],
    addlist: false,
    key: "23fe0646c0d1253eb430f7e02db925a0",
    token: "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9",
    boardId: this.props.match.params.id,
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
    let url = `https://api.trello.com/1/boards/${this.state.boardId}/lists?key=${this.state.key}&token=${this.state.token}`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        let lists = res.map((list) => {
          return { listId: list.id, listName: list.name };
        });
        this.setState({ lists });
      });
  }
  handleAddList = (e, name) => {
    e.preventDefault();
    this.setState({ addlist: true });
    let url = `https://api.trello.com/1/lists?name=${name}&idBoard=${this.state.boardId}&key=${this.state.key}&token=${this.state.token}`;
    fetch(url, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        let lists = [
          ...this.state.lists,
          { listId: res.id, listName: res.name },
        ];
        this.setState({ lists });
      });
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
        {this.state.lists.map((list) => (
          <List
            list={list}
            key={list.listId}
            userKey={this.state.key}
            token={this.state.token}
          />
        ))}
        <div
          style={{
            display: "inline-block",
            width: "15em",
            marginTop: "15px",
          }}
        >
          {this.state.addlist ? (
            <Input onAdd={this.handleAddList} onDelete={this.cancelAddList} />
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
                style={{ backgroundColor: "lightgrey" }}
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
export default Listfile;
