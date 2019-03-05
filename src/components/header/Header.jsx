import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, fbIcon, vkIcon, instIcon } from "../../images/SVG/icons";

// actions
import { changeContentPage } from "../../actions/transitionsActions";

// components
import SearchBar from "./header_components/search_bar/SearchBar";
import ShoppingCartButton from "./header_components/shopping_cart_button/ShoppingCartButton";
import SettingsButton from "./header_components/settings_button/SettingsButton";
import UserButton from "./header_components/user_button/UserButton";

const navigation = [
	{ pathname: "/content/goods", name: "Товары" },
	{ pathname: "/content/contacts", name: "Контакты" },
	{ pathname: "/content/delivery", name: "Доставка" },
	{ pathname: "/content/about", name: "О нас" }
];

const titles = {
	"/content/main": "Главная",
	"/content/goods": "Товары",
	"/content/contacts": "Контакты",
	"/content/delivery": "Доставка",
	"/content/about": "О нас",
	"/content/user-account": "Страница пользователя",
	"/content/admin": "Страница администратора",
	"/content/page-not-found": "Нет еще такой страницы..."
};

const Header = props => {
	const [sidebar, sidebarToggle] = useState(false);

	const [nextTitle, setNextTitle] = useState(titles[props.location.pathname]);
	const [currentTitle, setCurrentTitle] = useState(titles[props.location.pathname]);

	const navLinksContainerRef = useRef(null);
	const navLinksBottomLineRef = useRef(null);

	const nextTitleRef = useRef(null);

	useEffect(() => {
		const styles = {
			width: 0,
			transform: "none"
		};

		navigation.forEach(({ pathname }, i) => {
			if (pathname === props.location.pathname) {
				styles.width = navLinksContainerRef.current.childNodes[i].offsetWidth + "px";
				styles.transform = "translateX(" + navLinksContainerRef.current.childNodes[i].offsetLeft + "px)";
			}
		});

		Object.assign(navLinksBottomLineRef.current.style, styles);

		if (nextTitle !== currentTitle) {
			setCurrentTitle(nextTitle);
			nextTitleRef.current.classList.remove("show");
		}

		setNextTitle(titles[props.location.pathname]);
	}, [props.location.pathname]);

	useEffect(() => {
		if (nextTitle !== currentTitle) {
			nextTitleRef.current.classList.add("show");
		} else {
			nextTitleRef.current.classList.remove("show");
		}
	}, [nextTitle, currentTitle]);

	return (
		<Container>
			<Navigation>
				<LogoIcon to="/content/main">PEP</LogoIcon>

				<SearchBar />

				<NavLinksContainer ref={navLinksContainerRef}>
					{navigation.map(link => {
						return (
							<StyledNavLink key={link.pathname} to={link.pathname}>
								{link.name}
							</StyledNavLink>
						);
					})}
					<NavLinksBottomLine ref={navLinksBottomLineRef} />
				</NavLinksContainer>

				{navigator.cookieEnabled && (
					<SidebarButton
						className={sidebar && "opened"}
						onClick={() => {
							sidebarToggle(!sidebar);
						}}
					/>
				)}
			</Navigation>

			{navigator.cookieEnabled && (
				<Sidebar className={sidebar && "show"}>
					<Menu>
						<SettingsButton />
						<UserButton />
						<ShoppingCartButton />
					</Menu>

					<Author>Pepinot 2019</Author>
					<SocialIcons onTransitionEnd={e => e.stopPropagation()}>
						<a href="https://www.facebook.com/profile.php?id=100004222800312" target="_blank" rel="noopener noreferrer">
							<FbIcon />
						</a>
						<a href="https://vk.com/id88387616" target="_blank" rel="noopener noreferrer">
							<VkIcon />
						</a>
						<a href="https://www.instagram.com/skripka2700/" target="_blank" rel="noopener noreferrer">
							<InstIcon />
						</a>
					</SocialIcons>
				</Sidebar>
			)}

			<TitleContainer>
				<NextTitle ref={nextTitleRef}>{nextTitle}</NextTitle>

				<CurrentTitle className={nextTitle === currentTitle && "hold"}>
					{currentTitle.split("").map((letter, i, title) => {
						return (
							<TitleLetter
								key={`title-${title.join("")}-${i}`}
								transform={(letter.charCodeAt(0) % 7) * 24 + 20}
								onAnimationEnd={i === title.length - 1 ? () => setCurrentTitle(nextTitle) : null}
							>
								{letter === " " ? <>&nbsp;</> : letter}
							</TitleLetter>
						);
					})}
				</CurrentTitle>
			</TitleContainer>
		</Container>
	);
};

Header.propTypes = {
	changeContentPage: PropTypes.func,
	transitionProps: PropTypes.object,
	location: PropTypes.object
};

export default withRouter(
	connect(
		null,
		{ changeContentPage }
	)(Header)
);

// styled components -------------------------

const Container = styled.div`
	${props => (props.theme.desktop ? desktop.container : mobile.container)};
`;

const LogoIcon = styled(NavLink)`
	${props => (props.theme.desktop ? desktop.logoIcon : mobile.logoIcon)};
`;

const Navigation = styled.div`
	${desktop.navigation};
`;

const NavLinksContainer = styled.div`
	${props => (props.theme.desktop ? desktop.navLinksContainer : mobile.navLinksContainer)};
`;

const StyledNavLink = styled(NavLink)`
	${props => (props.theme.desktop ? desktop.navLink : mobile.navLink)};
`;

const NavLinksBottomLine = styled.div`
	${props => (props.theme.desktop ? desktop.navLinksBottomLine : mobile.navLinksBottomLine)};
`;

const SidebarButton = styled.div`
	${props => (props.theme.desktop ? desktop.sidebarButton : mobile.sidebarButton)};
`;

const Sidebar = styled.div`
	${props => (props.theme.desktop ? desktop.sidebar : mobile.sidebar)};
`;

const Menu = styled.div`
	${props => (props.theme.desktop ? desktop.menu : mobile.menu)};
`;

const Author = styled.div`
	${props => (props.theme.desktop ? desktop.author : mobile.author)};
`;

const SocialIcons = styled.div`
	${desktop.socialIcons};
`;

const FbIcon = styled(IconConstructor).attrs({
	body: fbIcon,
	viewBox: "-6 0 56 56"
})`
	${props => (props.theme.desktop ? desktop.fbIcon : mobile.fbIcon)};
`;

const VkIcon = styled(IconConstructor).attrs({
	body: vkIcon,
	viewBox: "0 0 24 24"
})`
	${props => (props.theme.desktop ? desktop.vkIcon : mobile.vkIcon)};
`;

const InstIcon = styled(IconConstructor).attrs({
	body: instIcon,
	viewBox: "80 160 320 320"
})`
	${props => (props.theme.desktop ? desktop.instIcon : mobile.instIcon)};
`;

const TitleContainer = styled.header`
	${props => (props.theme.desktop ? desktop.titleContainer : mobile.titleContainer)};
`;

const NextTitle = styled.div`
	${props => (props.theme.desktop ? desktop.nextTitle : mobile.nextTitle)};
`;

const CurrentTitle = styled.div`
	${props => (props.theme.desktop ? desktop.currentTitle : mobile.currentTitle)};
`;

const TitleLetter = styled.p`
	${props => (props.theme.desktop ? desktop.titleLetter : mobile.titleLetter)};
`;

// --------------------------------------------
