import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Boardfile from "./components/Boardfile";
import Listfile from "./components/Listfile";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Boardfile} />
        <Route path="/boards/:id" component={Listfile} />
      </BrowserRouter>
    </div>
  );
}

export default App;
