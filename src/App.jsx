import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import queryString from "query-string";

// styles
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

// components
import Header from "./components/header/Header";
import Content from "./components/main/Content";
import Auth from "./components/auth/Auth";
import NotFound from "./components/main/pages/page_not_found/PageNotFound";

// modals and other (react portal)
import ModalsAndOther from "./components/modals_and_other";
import ModalShoppingCart from "./components/modals_and_other/modal_shopping_cart/ModalShoppingCart";
import ModalProductItem from "./components/modals_and_other/modal_product_item/ModalProductItem";
import ModalSettings from "./components/modals_and_other/modal_settings/ModalSettings";
import GlobalTransitions from "./components/modals_and_other/global_transitions/GlobalTransitions";

// styled components -------------------------

const GlobalStyle = createGlobalStyle`
:root {
	--main_color: #fff;
	--additional_color: #959595;
	--style_color_1: #f1592a;
	--style_color_2: #70bc7b;

	--font_color_gray: #959595;
	--font_color_light: #fff;
	--font_color_dark: black;
}


* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	outline: none;
	font-family: "Comfortaa";
	-webkit-tap-highlight-color: transparent;
	-webkit-appearance: none;
}
/* 
html {
	overflow-y: hidden;
	
		@media (max-width: 1280px) {
			overflow-y: auto;
		}
	} */

`;

const PageWrapper = styled.div`
	overflow: hidden;
	position: absolute;
	display: flex;
	flex-direction: column;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: var(--main_color);

	@media (max-width: 300px) {
		display: none;
	}
`;

const Background = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
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

		let currency = props.cookies.get("currency");

		if (!currency || /[^UAH|USD|RUB]/.test(currency)) {
			props.cookies.set("currency", "UAH", { path: "/" });
		}

		this.state = {
			theme: { desktop: window.innerWidth > 1280 }
		};
	}

	static propTypes = {
		cookies: PropTypes.instanceOf(Cookies),
		location: PropTypes.object
	};

	componentDidMount() {
		window.addEventListener("resize", this.changeTheme);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.changeTheme);
	}

	changeTheme = () => {
		const { desktop } = this.state.theme;

		if (desktop && window.innerWidth <= 1280) {
			this.setState({
				theme: { desktop: false }
			});
		}

		if (!desktop && window.innerWidth > 1280) {
			this.setState({
				theme: { desktop: true }
			});
		}
	};

	render() {
		const devTheme = {
			sidebarWidth: 160
		};

		// react-router-dom props
		const { location } = this.props;

		// react-cookie props
		const { cookies } = this.props;

		// state
		const { theme } = this.state;

		return (
			<ThemeProvider theme={{ ...theme, ...devTheme }}>
				<>
					<GlobalStyle />
					<Switch location={location}>
						<Route exact path="/" render={() => <Redirect to="/content/main" />} />
						<Route
							path="/content"
							render={() => {
								return (
									<>
										<PageWrapper>
											<Header />
											<Content cookies={cookies} />
											{/* <Background /> */}
										</PageWrapper>
										<Nope>Nope!</Nope>
									</>
								);
							}}
						/>

						<Route
							exact
							path="/auth"
							render={({ history, location }) => <Auth cookies={cookies} history={history} location={location} />}
						/>

						<Route path="/page-not-found" component={NotFound} />
						<Route render={() => <Redirect to="/content/page-not-found" />} />
					</Switch>

					<ModalsAndOther>
						<Switch location={location}>
							<Route
								path="*/modal*"
								render={({ match, history, location }) => {
									const search = queryString.parse(location.search);

									if (search.type === "shopping-cart") {
										const props = {
											cookies,
											match,
											history,
											location
										};

										return <ModalShoppingCart {...props} />;
									} else if (search.type === "product-item") {
										const props = {
											cookies,
											match,
											history,
											location: { ...location, search }
										};

										return <ModalProductItem {...props} />;
									} else {
										return <Redirect to="/content/main" />;
									}
								}}
							/>
						</Switch>
						<ModalSettings cookies={cookies} />
						<GlobalTransitions />
					</ModalsAndOther>
				</>
			</ThemeProvider>
		);
	}
}

export default withRouter(withCookies(App));
