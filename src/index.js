import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

// store
import store from "./store";

// history
import createBrowserHistory from "history/createBrowserHistory";

// styles
import "./index.css";

// components
import App from "./App";

import registerServiceWorker from "./registerServiceWorker";

const history = createBrowserHistory();

document.querySelector("html").onkeydown = e => {
	if (e.keyCode === 9) return false;
};

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
