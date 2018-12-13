import React from "react";
import ReactDOM from "react-dom";

import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

// store
import store from "./store";

// history
import { createBrowserHistory } from "history";

// components
import App from "./App";

const history = createBrowserHistory();

document.querySelector("html").onkeydown = e => {
	if (e.keyCode === 9) return false;
};

ReactDOM.render(
	<CookiesProvider>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>
	</CookiesProvider>,
	document.getElementById("root")
);
