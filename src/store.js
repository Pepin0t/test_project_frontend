import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const history = createBrowserHistory();

let initialState = {};

const store = createStore(rootReducer(history), initialState, compose(applyMiddleware(routerMiddleware(history), thunk)));

export default store;
