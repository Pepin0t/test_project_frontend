import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// styles
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, searchIcon } from "../../../../images/SVG/icons";

// actios
import { searchItems } from "../../../../actions/productItemListActions";

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.textInput = React.createRef();
		this.searchButton = React.createRef();

		this.state = {
			showInput: false,
			showSearchButton: true,
			teleportSearchButton: false
		};
	}

	static propTypes = {
		location: PropTypes.object,
		searchItems: PropTypes.func
	};

	componentDidMount() {
		document.querySelector("html").addEventListener("click", this.onSearchBarClose);
	}

	componentWillUnmount() {
		document.querySelector("html").removeEventListener("click", this.onSearchBarClose);
	}

	componentDidUpdate() {
		if (this.state.showInput && /^\/content\/goods\/?\w*/.test(this.props.location.pathname)) {
			this.textInput.current.focus();
		}
	}

	onSearchBarOpen = () => {
		this.setState({
			showInput: true
		});
	};

	onSearchSubmit = () => {
		const searchQuery = this.textInput.current.value;

		if (this.state.showInput && searchQuery) {
			this.props.searchItems(searchQuery, "all");
		}
	};

	onSearchBarClose = e => {
		if (e.target !== this.textInput.current && e.target !== this.searchButton.current) {
			this.setState({
				showInput: false
			});
		}
	};

	keyFunction = e => {
		// Enter-Key
		if (e.keyCode === 13) this.onSearchSubmit();
	};

	render() {
		// state
		const { showInput, showSearchButton, teleportSearchButton } = this.state;

		// react-router-dom props
		const { pathname } = this.props.location;

		return (
			<Container>
				<CSSTransition
					classNames="input"
					in={showInput}
					timeout={250}
					unmountOnExit
					onEnter={() => {
						this.setState({
							showSearchButton: false
						});
					}}
					onEntered={() => {
						this.setState({
							showSearchButton: true,
							teleportSearchButton: true
						});
					}}
					onExit={() => {
						this.setState({
							showSearchButton: false
						});
					}}
					onExited={() => {
						this.setState({
							showSearchButton: true,
							teleportSearchButton: false
						});
					}}
				>
					<Input ref={this.textInput} onKeyDown={this.keyFunction} />
				</CSSTransition>

				<CSSTransition
					classNames="search-button"
					in={/^.*\/content\/goods\/?\w*/.test(pathname) && (showSearchButton || window.innerWidth > 700)}
					timeout={250}
					unmountOnExit
				>
					<SearchButton
						ref={this.searchButton}
						onClick={showInput ? this.onSearchSubmit : this.onSearchBarOpen}
						// обратить внимание
						showInput={showInput}
						//
						teleportSearchButton={teleportSearchButton}
					>
						<SearchIcon />
					</SearchButton>
				</CSSTransition>
			</Container>
		);
	}
}

export default withRouter(
	connect(
		null,
		{ searchItems }
	)(SearchBar)
);

// styled components -------------------------

const Container = styled.div`
	${props => (props.theme.desktop ? desktop.container : mobile.container)};
`;

const Input = styled.input.attrs({
	type: "text",
	placeholder: "Поиск товаров"
})`
	${props => (props.theme.desktop ? desktop.input : mobile.input)};
`;

const SearchIcon = styled(IconConstructor).attrs({
	body: searchIcon
})`
	${desktop.searchIcon}
`;

const SearchButton = styled.div`
	${props => (props.theme.desktop ? desktop.searchButton : mobile.searchButton)};
`;

// -------------------------------------------
