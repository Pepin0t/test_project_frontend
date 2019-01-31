import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Cookies } from "react-cookie";

// client API
import { Auth_API } from "../../client_api/index";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, fullscreenEnterIcon, fullscreenExitIcon } from "../../images/SVG/icons";

// actions
import { fullscreenMode } from "../../actions/applicationSettingsActions";

// components
import MainPage from "./pages/main_page/MainPage";
import GoodsPage from "./pages/goods_page/GoodsPage";
import ContactsPage from "./pages/contacts_page/ContactsPage";
import AboutPage from "./pages/about_page/AboutPage";

import UserAccess from "../user_access/UserAccess";

import SearchBar from "../header/header_components/search_bar/SearchBar";

class Content extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: null
		};
	}

	static propTypes = {
		fullscreenMode: PropTypes.func,
		cookies: PropTypes.instanceOf(Cookies),
		location: PropTypes.object,
		fullscreen: PropTypes.bool
	};

	// переделать!!
	static getDerivedStateFromProps(props) {
		if (/^.*\/main/.test(props.location.pathname)) {
			return {
				title: "Главная"
			};
		} else if (props.location.pathname === "/admin") {
			return {
				title: "Admin Page"
			};
		} else if (/^.*\/goods/.test(props.location.pathname)) {
			return {
				title: "Товары"
			};
		} else if (props.location.pathname === "/about") {
			return {
				title: "О нас"
			};
		} else if (props.location.pathname === "/contacts") {
			return {
				title: "Контакты"
			};
		} else if (props.location.pathname === "/delivery") {
			return {
				title: "Доставка"
			};
		} else {
			return { title: "" };
		}
	}

	onFullscreen = () => {
		this.props.fullscreen ? this.props.fullscreenMode(false) : this.props.fullscreenMode(true);
	};

	render() {
		// console.log(this.props);
		// redux props
		const { fullscreen, cookies, location } = this.props;

		return (
			<StyledContent fullscreen={fullscreen}>
				<Background />
				<Header>
					<Title>{this.state.title}</Title>
					<HeaderButtons>
						{fullscreen && <SearchBar />}
						<FullscreenToggleButton onClick={this.onFullscreen}>
							{fullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
						</FullscreenToggleButton>
					</HeaderButtons>
				</Header>
				<Body>
					<Switch location={location}>
						<Route path="/content/main" component={MainPage} />
						<Route path="/content/goods" component={GoodsPage} />
						<Route path="/content/contacts" component={ContactsPage} />
						<Route path="/content/about" component={AboutPage} />

						{/* private routes */}
						{["/content/user-account", "/content/admin"].map((path, i) => {
							return (
								<Route
									key={"route-" + i}
									path={path}
									render={({ location, history }) => {
										return <UserAccess location={location} history={history} cookies={cookies} />;
									}}
								/>
							);
						})}

						<Route render={() => <Redirect to="/page-not-found" />} />
					</Switch>
				</Body>
			</StyledContent>
		);
	}
}

const mapStateToProps = store => ({
	fullscreen: store.applicationSettings.fullscreen
});

export default withRouter(
	connect(
		mapStateToProps,
		{ fullscreenMode }
	)(Content)
);

// styled components -------------------------

const StyledContent = styled.div`
	${props => (props.theme.desktop ? desktop.styledContent : mobile.styledContent)};
`;

const Background = styled.div`
	${props => (props.theme.desktop ? desktop.background : mobile.background)};
`;

const Header = styled.header`
	${props => (props.theme.desktop ? desktop.header : mobile.header)};
`;

const Title = styled.header`
	${props => (props.theme.desktop ? desktop.title : mobile.title)};
`;

const HeaderButtons = styled.div`
	${props => (props.theme.desktop ? desktop.headerButtons : mobile.headerButtons)};
`;

const FullscreenEnterIcon = styled(IconConstructor).attrs({
	body: fullscreenEnterIcon
})`
	${desktop.fullscreenEnterIcon};
`;

const FullscreenExitIcon = styled(IconConstructor).attrs({
	body: fullscreenExitIcon
})`
	${desktop.fullscreenExitIcon};
`;

const FullscreenToggleButton = styled.div`
	${desktop.fullscreenToggleButton};
`;

const Body = styled.div`
	${props => (props.theme.desktop ? desktop.body : mobile.body)};
`;

// -------------------------------------------
