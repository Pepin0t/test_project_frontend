import React, { PureComponent } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import { IconConstructor, navExpandIcon, closelIcon } from "../images/SVG/icons.js";

// components
import SearchBar from "./header_navigation/SearchBar";
import ShoppingCartButton from "./header_navigation/ShoppingCartButton";
import SettingsButton from "./header_navigation/SettingsButton";

import store from "../store";

// styled components -------------------------
const cssTransitionNavLinks = "nav-links";
const cssTransitionClose = "close";

const navLinksLength = store.getState().navLinks.length;
const navLinksBreakpoint = navLinksLength > 3 ? (navLinksLength > 4 ? "1920px" : "1140px") : "920px";

const HeaderWrapper = styled.header`
	min-height: 50px;
	flex-grow: 0;
	width: 100%;
	background-color: #959595;
`;

const HeaderContainer = styled.div`
	padding-left: 15px;
	padding-right: 15px;
	width: 1140px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 1140px) {
		width: 100%;
		padding-right: 0;
	}

	@media (max-width: 920px) {
		//
	}

	@media (max-width: 1920px) {
		// ??
	}
`;

const LogoIcon = styled(NavLink)`
	margin-right: 15px;
	font-size: 24px;
	color: #fff;
	text-decoration: none;
`;

const NavBar = styled.div`
	display: flex;
	flex-direction: row;
	height: 50px;
	width: 920px;
	justify-content: flex-end;
`;

const NavLinksContainer = styled.nav`
	display: flex;
	flex-direction: row;
	z-index: 100;

	@media (max-width: ${navLinksBreakpoint}) {
		position: fixed;
		transform: ${props => (props.show ? "scaleY(1)" : "scaleY(0)")};
		flex-direction: column;
		width: 216px;
		height: 100vh;
		right: 0;
		background-color: #fff;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);

		&.${cssTransitionNavLinks}-enter {
			transform: translate(236px);
		}

		&.${cssTransitionNavLinks}-enter-active {
			transform: translate(0);
			transition: all 250ms ease;
		}

		&.${cssTransitionNavLinks}-exit {
			transform: translate(0);
		}

		&.${cssTransitionNavLinks}-exit-active {
			transform: translate(236px);
			transition: all 250ms ease;
		}

		::before {
			content: "";
			height: 50px;
		}
	}
`;

const StyledNavLink = styled(NavLink).attrs({
	activeClassName: "active"
})`
	display: flex;
	align-items: center;
	cursor: pointer;
	pointer-events: auto;
	box-sizing: content-box;
	padding: 0 15px;
	text-decoration: none;
	font-size: 14px;
	color: #fff;
	letter-spacing: 0.1em;
	transition: all ease 250ms;

	&.active {
		pointer-events: none;
		padding: 0 30px;
		background-color: #fff;
		color: #959595;
	}

	:hover {
		background-color: #fff;
		color: #959595;
	}

	@media (max-width: ${navLinksBreakpoint}) {
		height: 50px;
		color: #959595;

		:hover {
			background-color: #959595;
			color: #fff;
		}

		&.active {
			background-color: #f1592a;
			color: #fff;
			margin-left: -20px;
			padding: 0 0 0 20px;
			border-top-left-radius: 5px;
			border-bottom-left-radius: 5px;
			box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
			z-index: 100;
		}
	}
`;

const NavExpandIcon = styled(IconConstructor).attrs({
	body: navExpandIcon,
	viewBox: "0 0 24 24"
})`
	fill: #fff;
`;

const NavExpandButton = styled.div`
	display: none;
	align-items: center;
	cursor: pointer;
	box-sizing: content-box;
	padding: 0 15px;
	transition: all ease 250ms;
	background-color: #959595;

	:hover {
		background-color: #fff;
	}
	:hover ${NavExpandIcon} {
		fill: #959595;
	}

	@media (max-width: ${navLinksBreakpoint}) {
		display: flex;
	}
`;

const CloseNavIcon = styled(IconConstructor)`
	fill: #959595;
	transition: all ease 250ms;
`;

const CloseNavButton = styled.div`
	display: none;
	align-items: center;
	position: fixed;
	padding: 0 20px;
	cursor: pointer;
	top: 0;
	right: calc(100% - 100vw);
	height: 50px;
	z-index: 101;

	}

	:hover ${CloseNavIcon} {
		fill: #f1592a;
	}

	@media (max-width: ${navLinksBreakpoint}) {
		display: flex;
	}

	&.${cssTransitionClose}-enter {
		opacity: 0.01
	}

	&.${cssTransitionClose}-enter-active {
		opacity: 1;
		transition: all 500ms ease;
	}

	&.${cssTransitionClose}-exit {
		opacity: 1;
	}

	&.${cssTransitionClose}-exit-active {
		opacity: 0.01;
		transition: all 250ms ease;
	}

`;

// --------------------------------------------

class Header extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			showNavLinksAsSidebar: false
		};
	}

	onExpand = () => {
		this.setState({
			showNavLinksAsSidebar: !this.state.showNavLinksAsSidebar
		});
	};

	onClose = () => {
		this.setState({
			showNavLinksAsSidebar: false
		});
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.location.pathname !== nextProps.location.pathname) {
			this.setState({
				showNavLinksAsSidebar: false
			});
		}
	}

	render() {
		const { showNavLinksAsSidebar } = this.state;
		return (
			<HeaderWrapper>
				<HeaderContainer>
					<LogoIcon to="/">PEPINOT</LogoIcon>

					<NavBar>
						<SearchBar />

						{/* Выкинуть линки в отдельный компонент!! Вместе с экспанд-кнопкой */}

						<CSSTransition classNames={cssTransitionNavLinks} in={showNavLinksAsSidebar} timeout={250}>
							<NavLinksContainer show={showNavLinksAsSidebar}>
								{this.props.navLinks.map(link => {
									return (
										<StyledNavLink key={link[0]} to={link[0]}>
											{link[1]}
										</StyledNavLink>
									);
								})}
							</NavLinksContainer>
						</CSSTransition>

						<NavExpandButton onClick={this.onExpand}>
							<NavExpandIcon />
						</NavExpandButton>

						<SettingsButton />
						<ShoppingCartButton />
					</NavBar>

					<CSSTransition classNames={cssTransitionClose} in={showNavLinksAsSidebar} timeout={250} unmountOnExit>
						<CloseNavButton onClick={this.onClose}>
							<CloseNavIcon body={closelIcon} />
						</CloseNavButton>
					</CSSTransition>
				</HeaderContainer>
			</HeaderWrapper>
		);
	}
}

const mapStateToProps = store => ({
	navLinks: store.navLinks
});

export default withRouter(connect(mapStateToProps)(Header));
