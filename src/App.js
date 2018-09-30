import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

// styles CSS
// import "./style/App.css";
import styled from "styled-components";

// modals and other (react portal)
import ModalsAndOther from "./components/modals_and_other";
import ArrowToTop from "./components/modals_and_other/ArrowToTop";
import ModalShoppingCart from "./components/modals_and_other/ModalShoppingCart";
import ModalProductItem from "./components/modals_and_other/ModalProductItem";
import ModalSettings from "./components/modals_and_other/ModalSettings";

// components
import Header from "./components/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer";

// Redux store
import store from "./store";

// history
import createBrowserHistory from "history/createBrowserHistory";

// styled components -------------------------

const PageWrapper = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	@media (max-width: 300px) {
		display: none;
	}
`;

const Nope = styled.div`
	display: none;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 100vh;

	@media (max-width: 300px) {
		display: flex;
	}
`;

// -------------------------------------------

const history = createBrowserHistory();

class App extends Component {
	render() {
		const Fragment = React.Fragment;
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Fragment>
						<PageWrapper>
							<Header />
							<Main />
							<Footer />
						</PageWrapper>
						<Nope>Nope!</Nope>

						<ModalsAndOther>
							<ArrowToTop />
							<ModalShoppingCart />
							<ModalProductItem />
							<ModalSettings />
						</ModalsAndOther>
					</Fragment>
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default App;
