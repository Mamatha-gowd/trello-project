import React, { Component } from "react";
import Input from "./addcard";
import List from "./List";
import Board from "./Board";
const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const url = "https://api.trello.com";
const key = "23fe0646c0d1253eb430f7e02db925a0";
const boardid = "5e8760dd0480e75528f188ef";

class Listfile extends Component {
  state = {
    lists: [],
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
    const id = this.props.match.params.id;
    let url = `https://api.trello.com/1/boards/${id}/lists?key=${key}&token=${token}`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        let data = result;
        for (let i = 0; i < data.length; i++) {
          let listname = data[i].name;
          let listid = data[i].id;
          this.setState(() => ({
            lists: [
              ...this.state.lists,
              {
                name: listname,
                id: listid,
              },
            ],
          }));
        }
      });
  }
  //   deleteList =(e,listid)=>{
  //       e.preventDefault();
  //       let url =
  //   }

  handleInput = (e, name) => {
    e.preventDefault();
    this.setState({ addlist: true });
    let url = `https://api.trello.com/1/lists?name=${name}&idBoard=${boardid}&key=${key}&token=${token}`;
    fetch(url, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        let listname = result.name;
        let listid = result.id;
        this.setState({
          lists: [
            ...this.state.lists,
            {
              name: listname,
              id: listid,
            },
          ],
        });
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
export default Listfile;
