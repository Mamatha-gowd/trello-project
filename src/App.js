import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Boardfile from "./components/Boardfile";
import Listfile from "./components/Listfile";
function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path="/" component={Boardfile} />
          <Route path="/boards/:id" component={Listfile} />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
