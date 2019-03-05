import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Cookies } from "react-cookie";

// styles
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// actions
import { changeContentPage, transitionEnd } from "../../actions/transitionsActions";

import MainPage from "./pages/main_page/MainPage";
import GoodsPage from "./pages/goods_page/GoodsPage";
import ContactsPage from "./pages/contacts_page/ContactsPage";
import AboutPage from "./pages/about_page/AboutPage";

import UserAccess from "../user_access/UserAccess";

const PageNotFound = props => {
	useEffect(() => {
		props.ready(true);
	}, []);

	return null;
};

const publicRoutes = [
	{
		path: "/content/main",
		title: "Главная",
		Component: MainPage
	},
	{
		path: "/content/goods",
		title: "Товары",
		Component: GoodsPage
	},
	{
		path: "/content/contacts",
		title: "Контакты",
		Component: ContactsPage
	},
	{
		path: "/content/about",
		title: "О нас",
		Component: AboutPage
	},
	{
		path: "/content/page-not-found",
		title: "Нет такой страницы...",
		Component: PageNotFound
	}
];

const privateRoutes = [
	{
		path: "/content/user-account",
		title: "Страница пользователя"
	},
	{
		path: "/content/admin",
		title: "Страница администратора"
	}
];

const Content = props => {
	return (
		<Container>
			<CSSTransition
				in={props.transitionType === "change-content-page"}
				classNames="preloader"
				timeout={500}
				onEntered={() => {
					if (props.transitionProps.pathname === props.location.pathname) {
						props.transitionEnd();
					} else {
						props.history.push({
							pathname: props.transitionProps.pathname
						});
					}
				}}
				unmountOnExit
			>
				<ContentPreloader>Loading...</ContentPreloader>
			</CSSTransition>

			<Switch location={props.location}>
				{publicRoutes.map(({ path, Component }, i) => {
					return (
						<Route
							key={"public-route-" + i}
							path={path}
							render={() => {
								// return <div />;
								return <Component ready={props.transitionEnd} />;
							}}
						/>
					);
				})}

				{privateRoutes.map((routes, i) => {
					return (
						<Route
							key={"private-route-" + i}
							path={routes.path}
							render={({ location, history }) => {
								return <UserAccess location={location} history={history} cookies={props.cookies} />;
							}}
						/>
					);
				})}

				<Route render={() => <Redirect to="/content/page-not-found" />} />
			</Switch>
		</Container>
	);
};

Content.propTypes = {
	transitionEnd: PropTypes.func,
	cookies: PropTypes.instanceOf(Cookies),
	location: PropTypes.object,
	history: PropTypes.object,
	transitionType: PropTypes.string,
	transitionProps: PropTypes.object
};

const mapStateToProps = store => ({
	transitionType: store.transitions.transitionType,
	transitionProps: store.transitions.transitionProps
});

export default withRouter(
	connect(
		mapStateToProps,
		{ changeContentPage, transitionEnd }
	)(Content)
);

// styled components -------------------------

const ContentPreloader = styled.div`
	${props => (props.theme.desktop ? desktop.contentPreloader : mobile.contentPreloader)};
`;

const Container = styled.div`
	${props => (props.theme.desktop ? desktop.container : mobile.container)};
`;

// -------------------------------------------
