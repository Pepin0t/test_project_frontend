import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import queryString from "query-string";

// styles
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

// images
import bg from "./images/background_21.jpg";

// components
import Header from "./components/header/Header";
import Content from "./components/main/Content";
import Footer from "./components/footer/Footer";
import Auth from "./components/auth/Auth";
import NotFound from "./components/main/pages/page_not_found/PageNotFound";

// modals and other (react portal)
import ModalsAndOther from "./components/modals_and_other";
import ModalShoppingCart from "./components/modals_and_other/modal_shopping_cart/ModalShoppingCart";
import ModalProductItem from "./components/modals_and_other/modal_product_item/ModalProductItem";
import ModalSettings from "./components/modals_and_other/modal_settings/ModalSettings";

// styled components -------------------------

const GlobalStyle = createGlobalStyle`
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	outline: none;
	font-family: "Comfortaa";
	-webkit-tap-highlight-color: transparent;
	-webkit-appearance: none;
	
}

html {
	overflow-y: hidden;
	
		@media (max-width: 1280px) {
			overflow-y: auto;
		}
	}

`;

const PageWrapper = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	min-height: 100%;
	width: 100%;

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
		const Fragment = React.Fragment;

		const devTheme = {
			sidebarWidth: 160,
			themeColor: function(opacity = 0) {
				return "rgba(0, 0, 0, " + opacity + ")";
			}
		};

		// react-router-dom props
		const { location } = this.props;

		// react-cookie props
		const { cookies } = this.props;

		// state
		const { theme } = this.state;

		return (
			<ThemeProvider theme={{ ...theme, ...devTheme }}>
				<Fragment>
					<GlobalStyle />
					<Switch>
						<Route exact path="/" render={() => <Redirect to="/content/main" />} />
						<Route
							path="/content"
							render={() => {
								return (
									<Fragment>
										<PageWrapper>
											<Header />
											<Content cookies={cookies} />
											<Footer />
											<Background />
										</PageWrapper>
										<Nope>Nope!</Nope>
									</Fragment>
								);
							}}
						/>

						<Auth path="/auth" cookies={cookies} history={history} />

						<Route path="/page-not-found" component={NotFound} />
						<Route render={() => <Redirect to="/page-not-found" />} />
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
					</ModalsAndOther>
				</Fragment>
			</ThemeProvider>
		);
	}
}

export default withRouter(withCookies(App));
