import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import { Cookies } from "react-cookie";

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
import AdminPage from "./pages/admin_page/AdminPage";
import NotFound from "./pages/page_not_found/PageNotFound";
import SearchBar from "../header/header_components/search_bar/SearchBar";

class Content extends Component {
	state = {
		title: null
	};

	static propTypes = {
		fullscreenMode: PropTypes.func,
		cookies: PropTypes.instanceOf(Cookies),
		location: PropTypes.object,
		fullscreen: PropTypes.bool
	};

	// переделать!!
	static getDerivedStateFromProps(props) {
		if (props.location.pathname === "/main") {
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
			return { title: "Страница не найдена" };
		}
	}

	onFullscreen = () => {
		this.props.fullscreen ? this.props.fullscreenMode(false) : this.props.fullscreenMode(true);
	};

	render() {
		// redux props
		const { fullscreen, location } = this.props;

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
						<Route exact path="*/main" component={MainPage} />

						<Route path="*/goods" component={GoodsPage} />
						<Route path="*/contacts" component={ContactsPage} />
						<Route path="*/about" component={AboutPage} />
						<Route path="/admin" component={AdminPage} />

						<Route component={NotFound} />
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
