import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// styles
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

// icons
import { IconConstructor, navExpandIcon, closelIcon } from "../images/SVG/icons.js";

// components
import SearchBar from "./header_components/SearchBar";
import ShoppingCartButton from "./header_components/ShoppingCartButton";
import SettingsButton from "./header_components/SettingsButton";

// styled components -------------------------

const HeaderWrapper = styled.header`
	position: absolute;
	min-height: 50px;
	flex-grow: 0;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
	z-index: 6;
	top: ${props => (props.fullscreen ? "-60px" : 0)};
	transition: top ease 250ms;

	@media (max-width: 1280px) {
		top: 0;
	}
`;

const HeaderContainer = styled.div`
	padding-left: 15px;
	padding-right: 15px;
	width: 1280px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 1280px) {
		width: 100%;
		padding-right: 0;
	}
`;

const LogoIcon = styled(NavLink)`
	margin-right: 15px;
	font-size: 24px;
	color: #fff;
	text-decoration: none;
	min-width: 130px;
`;

const NavBar = styled.div`
	display: flex;
	flex-direction: row;
	height: 50px;
	width: 100%;
	justify-content: flex-end;
`;

const NavLinksContainer = styled.nav`
	display: flex;
	flex-direction: row;
	z-index: 100;

	@media (max-width: 1280px) {
		position: fixed;
		transform: ${props => (props.show ? "scaleY(1)" : "scaleY(0)")};
		flex-direction: column;
		width: 216px;
		height: 100vh;
		right: 0;
		background-color: #fff;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);

		&.nav-links-enter {
			transform: translate(236px);
		}

		&.nav-links-enter-active {
			transform: translate(0);
			transition: all 250ms ease;
		}

		&.nav-links-exit {
			transform: translate(0);
		}

		&.nav-links-exit-active {
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
	box-sizing: border-box;
	padding: 0 15px;
	text-decoration: none;
	font-size: 14px;
	color: #fff;
	letter-spacing: 0.1em;
	transition: all ease 250ms;

	&.active {
		pointer-events: none;
		background-color: rgba(0, 0, 0, 0.1);
		color: #fff;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
	}

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	@media (max-width: 1280px) {
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

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	@media (max-width: 1280px) {
		display: flex;
	}

	@media (max-width: 400px) {
		padding: 0 10px;
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

	:hover ${CloseNavIcon} {
		fill: #f1592a;
	}

	&.close-enter {
		opacity: 0.01;
	}

	&.close-enter-active {
		opacity: 1;
		transition: all 500ms ease;
	}

	&.close-exit {
		opacity: 1;
	}

	&.close-exit-active {
		opacity: 0.01;
		transition: all 250ms ease;
	}

	@media (max-width: 1280px) {
		display: flex;
	}
`;

// --------------------------------------------

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			navLinks: [["/goods", "Товары"], ["/contacts", "Контакты"], ["/delivery", "Доставка"], ["/about", "О нас"]],
			showNavLinksAsSidebar: false,
			location: this.props.location.pathname
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.location.pathname !== state.location) {
			return {
				showNavLinksAsSidebar: false,
				location: props.location.pathname
			};
		} else {
			return null;
		}
	}

	onExpand = () => {
		this.setState({
			showNavLinksAsSidebar: true
		});
	};

	onClose = () => {
		this.setState({
			showNavLinksAsSidebar: false
		});
	};

	render() {
		// redux props
		const { fullscreen } = this.props;

		// state
		const { navLinks, showNavLinksAsSidebar } = this.state;

		return (
			<HeaderWrapper fullscreen={fullscreen}>
				<HeaderContainer>
					<LogoIcon to="/">PEPINOT</LogoIcon>

					<NavBar>
						<SearchBar />

						<CSSTransition classNames="nav-links" in={showNavLinksAsSidebar} timeout={250}>
							<NavLinksContainer show={showNavLinksAsSidebar}>
								{navLinks.map(link => {
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

					<CSSTransition classNames="close" in={showNavLinksAsSidebar} timeout={250} unmountOnExit>
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
	fullscreen: store.applicationSettings.fullscreen
});

export default withRouter(connect(mapStateToProps)(Header));
