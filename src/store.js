import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "./Reducers";
import thunk from "redux-thunk";
const initialState = {};
const store = createStore(
  rootReducers,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
