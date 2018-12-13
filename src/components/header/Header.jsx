import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// styles
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, navExpandIcon, closelIcon } from "../../images/SVG/icons.js";

// components
import SearchBar from "./header_components/search_bar/SearchBar";
import ShoppingCartButton from "./header_components/shopping_cart_button/ShoppingCartButton";
import SettingsButton from "./header_components/settings_button/SettingsButton";

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			navLinks: [["/goods", "Товары"], ["/contacts", "Контакты"], ["/delivery", "Доставка"], ["/about", "О нас"]],
			showNavLinksAsSidebar: false,
			// eslint-disable-next-line react/no-unused-state
			location: this.props.location.pathname
		};
	}
	static propTypes = {
		fullscreen: PropTypes.bool,
		location: PropTypes.object
	};

	// Доделать по-человечески
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.location.pathname !== prevState.location) {
			return {
				showNavLinksAsSidebar: false,
				location: nextProps.location.pathname
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
		const Fragment = React.Fragment;

		// redux props
		const { fullscreen } = this.props;

		// state
		const { navLinks, showNavLinksAsSidebar } = this.state;

		return (
			<HeaderWrapper fullscreen={fullscreen}>
				<HeaderContainer>
					<LogoIcon to="/main">PEP</LogoIcon>

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

						{navigator.cookieEnabled && (
							<Fragment>
								<SettingsButton />
								<ShoppingCartButton />
							</Fragment>
						)}
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

// styled components -------------------------

const HeaderWrapper = styled.header`
	${props => (props.theme.desktop ? desktop.headerWrapper : mobile.headerWrapper)};
`;

const HeaderContainer = styled.div`
	${props => (props.theme.desktop ? desktop.headerContainer : mobile.headerContainer)};
`;

const LogoIcon = styled(NavLink)`
	${props => (props.theme.desktop ? desktop.logoIcon : mobile.logoIcon)};
`;

const NavBar = styled.div`
	${desktop.navBar};
`;

const NavLinksContainer = styled.nav`
	${props => (props.theme.desktop ? desktop.navLinksContainer : mobile.navLinksContainer)};
`;

const StyledNavLink = styled(NavLink).attrs({
	activeClassName: "active"
})`
	${props => (props.theme.desktop ? desktop.styledNavLink : mobile.styledNavLink)};
`;

const NavExpandIcon = styled(IconConstructor).attrs({
	body: navExpandIcon,
	viewBox: "0 0 24 24"
})`
	${mobile.navExpandIcon};
`;

const NavExpandButton = styled.div`
	${props => (props.theme.desktop ? desktop.navExpandButton : mobile.navExpandButton)};
`;

const CloseNavIcon = styled(IconConstructor)`
	${mobile.closeNavIcon};
`;

const CloseNavButton = styled.div`
	${props => (props.theme.desktop ? desktop.closeNavButton : mobile.closeNavButton)};
`;

// --------------------------------------------
