import React, { Component } from "react";
import List from "./components/List";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="text-center h4 m-2 pt-1">Trello Clone</div>
        <List />
      </div>
    );
  }
}

export default App;
