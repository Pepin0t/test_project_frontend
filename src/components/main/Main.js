import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

// styles
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// icons
import { IconConstructor, fullscreenEnterIcon, fullscreenExitIcon } from "../../images/SVG/icons";

// images
import bg_1 from "../../images/background_21.jpg";

// actions
import { fullscreenMode } from "../../actions/applicationSettingsActions";

// components
import MainPage from "./pages/MainPage";
import GoodsPage from "./pages/goods_page/GoodsPage";
import ContactsPage from "./pages/ContactsPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

import SearchBar from "../header_components/SearchBar";

// styled components -------------------------
const StyledMain = styled.main.attrs({
	role: "main"
})`
	position: relative;
	margin: auto;
	width: ${props => (props.fullscreen ? "calc(100vw - 30px)" : "1280px")};
	height: ${props => (props.fullscreen ? "calc(100vh - 30px)" : "calc(100vh - 130px)")};
	overflow: hidden;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	box-shadow: -5px 15px 20px rgba(0, 0, 0, 0.5);
	transition: all ease 250ms;

	@media (min-width: 1921px) {
		width: ${props => (props.fullscreen ? "1920px" : "1280px")};
	}

	@media (max-width: 1280px) {
		width: 100vw;
		height: calc(100vh - 100px);
		box-shadow: none;
		border-radius: 0;
	}
`;

const Background = styled.div`
	position: absolute;
	left: -20px;
	width: 100vw;
	height: 100vh;
	background-image: url(${bg_1});
	background-size: cover;
	filter: blur(20px) saturate(30%);
	z-index: -1;
`;

const Header = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 50px;
	z-index: 2;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
	background-color: rgba(0, 0, 0, 0.2);
`;

const Title = styled.header`
	font-size: 24px;
	padding-left: 15px;
	display: flex;
	align-items: center;
	height: 100%;
	color: #fff;
	min-width: 160px;
`;

const HeaderButtons = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;

	@media (max-width: 1280px) {
		display: none;
	}
`;

const FullscreenEnterIcon = styled(IconConstructor).attrs({
	body: fullscreenEnterIcon
})`
	fill: #fff;
`;

const FullscreenExitIcon = styled(IconConstructor).attrs({
	body: fullscreenExitIcon
})`
	fill: #fff;
`;

const FullscreenToggleButton = styled.div`
	padding: 0 15px;
	cursor: pointer;
	display: flex;
	align-items: center;
	transition: all ease 250ms;

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

const Body = styled.div`
	width: 100%;
	height: calc(100% - 50px);
`;

// -------------------------------------------

class Main extends Component {
	state = {
		title: null
	};

	static getDerivedStateFromProps(props) {
		// проблемы ?
		switch (props.location.pathname) {
			case "/": {
				return {
					title: "Главная"
				};
			}
			case "/admin": {
				return {
					title: "Admin Page"
				};
			}
			case "/goods": {
				return {
					title: "Товары"
				};
			}
			case "/about": {
				return {
					title: "О нас"
				};
			}
			case "/contacts": {
				return {
					title: "Наши контакты"
				};
			}
			case "/delivery": {
				return {
					title: "Доставка"
				};
			}
			default:
				return { title: "Страница не найдена" };
		}
	}

	onFullscreen = () => {
		this.props.fullscreen ? this.props.fullscreenMode(false) : this.props.fullscreenMode(true);
	};

	render() {
		const Fragment = React.Fragment;

		// redux props
		const { fullscreen, location } = this.props;

		return (
			<Fragment>
				<StyledMain fullscreen={fullscreen}>
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
						{/* <TransitionGroup component={null}>
							<CSSTransition key={location.key} classNames="slide" timeout={500} unmountOnExit> */}
						<Switch location={location}>
							<Route exact path="/" component={MainPage} />

							<Route path="/goods" component={GoodsPage} />
							<Route exact path="/contacts" component={ContactsPage} />
							<Route exact path="/about" component={AboutPage} />
							<Route exact path="/admin" component={AdminPage} />

							<Route component={NotFound} />
						</Switch>
						{/* </CSSTransition>
						</TransitionGroup> */}
					</Body>
				</StyledMain>
			</Fragment>
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
	)(Main)
);
