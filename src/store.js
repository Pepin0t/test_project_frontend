import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import createBrowserHistory from "history/createBrowserHistory";

import rootReducer from "./reducers";

const history = createBrowserHistory();

const initialState = {};

const store = createStore(
	connectRouter(history)(rootReducer),
	initialState,
	compose(applyMiddleware(routerMiddleware(history), thunk))
);

export default store;
