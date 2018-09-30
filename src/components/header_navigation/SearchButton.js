import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import { IconConstructor, searchIcon } from "../../images/SVG/icons.js";

import store from "../../store";

// styled components -------------------------

const navLinksLength = store.getState().navLinks.length;
const navLinksBreakpoint = navLinksLength > 3 ? (navLinksLength > 4 ? "1920px" : "1140px") : "920px";

const SearchIcon = styled(IconConstructor).attrs({
	body: searchIcon
})`
	transition: fill ease 250ms;
`;

const Button = styled.div`
	display: flex;
	align-items: center;
	flex-grow: 0;
	cursor: pointer;
	box-sizing: content-box;
	border-right: ${props => (props.inputIsOpen ? "4px solid #959595" : "none")};
	padding: 0 15px;
	transition: all ease 250ms;
	height: 50px;
	background-color: ${props => (props.inputIsOpen ? "#fff" : null)};
	z-index: 1;

	> ${SearchIcon} {
		fill: ${props => (props.inputIsOpen ? "#959595" : "#fff")};
	}

	:hover {
		background-color: #fff;
	}

	:hover ${SearchIcon} {
		fill: ${props => (props.inputIsOpen ? "#70bc7b" : "#959595")};
	}

	&.search-button-enter {
		transform: scaleX(0.01);
		background-color: #fff;
	}

	&.search-button-enter-active {
		transform: scaleX(1);
		transition: all 250ms ease;
	}

	&.search-button-exit {
		transform: scaleY(1);
	}

	&.search-button-exit-active {
		background-color: #fff;
		transform: scaleY(0.01);
		transition: all 250ms ease;
	}

	@media (max-width: ${navLinksBreakpoint}) {
		border-right: none;
	}

	@media (max-width: 700px) {
		position: ${props => (props.inputWasOpenOnce ? "absolute" : "static")};
		transform: ${props => (props.inputWasOpenOnce ? "translate(0, 50px)" : "none")};
		right: 0;

		&.search-button-exit {
			opacity: 1;
			position: ${props => (props.inputWasOpenOnce ? "absolute" : "static")};
			transform: ${props => (props.inputWasOpenOnce ? "translate(0, 50px)" : "scaleX(1)")};
		}

		&.search-button-exit-active {
			opacity: ${props => (props.inputWasOpenOnce ? "0" : "1")};
			position: ${props => (props.inputWasOpenOnce ? "absolute" : "static")};
			transform: ${props => (props.inputWasOpenOnce ? "translate(0, 0)" : "scaleX(0)")};
			transition: all 250ms ease;
		}
	}
`;

// -------------------------------------------

class SearchButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputWasOpenOnce: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.showInput === true && this.state.inputWasOpenOnce === false) {
			this.setState({
				inputWasOpenOnce: true
			});
		}
	}

	render() {
		const { inputWasOpenOnce } = this.state;
		const { showInput, onSearchSubmit, onSearchBarOpen } = this.props;
		const { pathname } = this.props.location;

		return (
			<CSSTransition
				classNames="search-button"
				in={/^\/goods\/?\w*/.test(pathname) ? true : false}
				timeout={250}
				onExited={() => {
					this.setState({
						inputWasOpenOnce: false
					});
				}}
				unmountOnExit
			>
				<Button onClick={showInput ? onSearchSubmit : onSearchBarOpen} inputIsOpen={showInput} inputWasOpenOnce={inputWasOpenOnce}>
					<SearchIcon />
				</Button>
			</CSSTransition>
		);
	}
}

export default withRouter(SearchButton);
