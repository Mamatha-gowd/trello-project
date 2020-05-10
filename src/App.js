import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import boardContainer from "./components/boardContainer";
import listContainer from "./components/listContainer";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={boardContainer} />
        <Route path="/boards/:id" component={listContainer} />
      </BrowserRouter>
    </div>
  );
}

export default App;
