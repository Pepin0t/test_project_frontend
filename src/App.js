import React, { Component } from "react";
import { Route } from "react-router-dom";

// styles
import styled from "styled-components";

// images
import bg from "./images/background_21.jpg";

// components
import Header from "./components/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer";

// modals and other (react portal)
import ModalsAndOther from "./components/modals_and_other";
import ModalShoppingCart from "./components/modals_and_other/ModalShoppingCart";
import ModalProductItem from "./components/modals_and_other/ModalProductItem";
import ModalSettings from "./components/modals_and_other/ModalSettings";

// styled components -------------------------

const PageWrapper = styled.div`
	width: 100%;
	min-height: 100vh;
	max-height: 100vh;
	display: flex;
	flex-direction: column;

	@media (max-width: 300px) {
		display: none;
	}
`;

const Background = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	background-image: url(${bg});
	background-size: cover;

	z-index: -1000;

	@media (max-width: 1280px) {
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

class App extends Component {
	constructor(props) {
		super(props);

		if (!/currency=/.test(document.cookie) || /currency=[^UAH|USD|RUB]/.test(document.cookie)) {
			document.cookie = "currency=UAH; path=/";
		}
	}

	render() {
		const Fragment = React.Fragment;
		return (
			<Fragment>
				<PageWrapper>
					<Header />
					<Main />
					<Footer />
					<Background />
				</PageWrapper>
				<Nope>Nope!</Nope>

				<ModalsAndOther>
					<ModalShoppingCart />
					<Route path="/goods/:category/:productId" component={ModalProductItem} />
					<ModalSettings />
				</ModalsAndOther>
			</Fragment>
		);
	}
}

export default App;
