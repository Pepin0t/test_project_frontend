import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// styles
import styled from "styled-components";

// components
import Banner from "./Banner";
import MainPage from "./pages/MainPage";
import GoodsPage from "./pages/goods_page/GoodsPage";
import ContactsPage from "./pages/ContactsPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

// styled components -------------------------
const StyledMain = styled.main.attrs({
	role: "main"
})`
	margin: 0 auto;
	padding: 0 15px;
	width: 1140px;
	flex-grow: 1;
	/* border-right: 1px solid lightgray; */
	/* border-left: 1px solid lightgray; */
	display: flex;
	flex-direction: column;

	@media (max-width: 1140px) {
		width: 100%;
	}
`;

// -------------------------------------------

class Main extends Component {
	render() {
		const Fragment = React.Fragment;
		return (
			<Fragment>
				{/* <Banner /> */}
				<StyledMain>
					<Switch>
						<Route exact path="/" component={MainPage} />

						<Route path="/goods" component={GoodsPage} />
						<Route
							exact
							path="/contacts"
							component={ContactsPage}
						/>
						<Route exact path="/about" component={AboutPage} />
						<Route component={NotFound} />
					</Switch>
				</StyledMain>
				{/* <Banner /> */}
			</Fragment>
		);
	}
}

export default Main;
