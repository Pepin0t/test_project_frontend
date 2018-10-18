import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// styles
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

// icons
import { IconConstructor, searchIcon } from "../../images/SVG/icons.js";

// actios
import { searchItems } from "../../actions/productItemListActions";

// styled components -------------------------

const Input = styled.input.attrs({
	type: "text",
	placeholder: "Поиск товаров"
})`
	display: flex;
	flex-grow: 1;
	padding: 0 20px;
	height: 50px;
	border: none;
	font-size: 18px;
	z-index: 1;
	box-shadow: inset 10px 0 10px -10px rgba(0, 0, 0, 0.9);

	&.input-enter {
		transform: scaleY(0);
	}

	&.input-enter-active {
		transform: scaleY(1);
		transition: all 250ms ease;
	}

	&.input-exit {
		transform: scaleY(1);
	}

	&.input-exit-active {
		transform: scaleY(0);
		transition: all 250ms ease;
	}

	@media (max-width: 700px) {
		position: absolute;
		box-shadow: none;
		transform: translate(0, 50px);
		min-width: 100%;
		left: 0;

		&.input-enter {
			transform: translate(0, 0);
			opacity: 0;
		}

		&.input-enter-active {
			transform: translate(0, 50px);
			opacity: 1;
			transition: all 250ms ease;
		}

		&.input-exit {
			opacity: 1;
			transform: translate(0, 50px);
		}

		&.input-exit-active {
			opacity: 0;
			transform: translate(0, 0);
			transition: all 250ms ease;
		}
	}
`;

const SearchIcon = styled(IconConstructor).attrs({
	body: searchIcon
})`
	fill: #fff;
	transition: fill ease 250ms;
	pointer-events: none;
`;

const SearchButton = styled.div`
	display: flex;
	align-items: center;
	flex-grow: 0;
	cursor: pointer;
	box-sizing: content-box;
	padding: 0 15px;
	transition: all ease 250ms;
	height: 50px;
	background-color: ${props => (props.showInput ? "#fff" : null)};
	z-index: 1;

	> ${SearchIcon} {
		fill: ${props => (props.showInput ? "#959595" : "#fff")};
	}

	:hover {
		background-color: ${props => (props.showInput ? "#fff" : "rgba(0, 0, 0, 0.1)")};
	}

	&.search-button-enter {
		transform: scaleX(0);
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
		transform: scaleY(0);
		transition: all 250ms ease;
	}

	@media (max-width: 700px) {
		position: ${props => (props.teleportSearchButton ? "absolute" : "static")};
		top: 50px;
		right: 0;

		&.search-button-exit {
			transform: scaleX(1);
		}

		&.search-button-exit-active {
			position: ${props => (props.teleportSearchButton ? "absolute" : "static")};
			transform: scaleX(0);
			transition: all 250ms ease;
		}

		> ${SearchIcon} {
			fill: ${props => (props.teleportSearchButton ? "#959595" : "#fff")};
		}
	}

	@media (max-width: 400px) {
		padding: 0 10px;
	}
`;

// -------------------------------------------

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

	componentDidMount() {
		document.querySelector("html").addEventListener("click", this.onSearchBarClose);
	}

	componentWillUnmount() {
		document.querySelector("html").removeEventListener("click", this.onSearchBarClose);
	}

	componentDidUpdate() {
		if (this.state.showInput && /^\/goods\/?\w*/.test(this.props.location.pathname)) {
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
		const Fragment = React.Fragment;

		// state
		const { showInput, showSearchButton, teleportSearchButton } = this.state;

		// react-router-dom props
		const { pathname } = this.props.location;

		return (
			<Fragment>
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
					<Input innerRef={this.textInput} onKeyDown={this.keyFunction} />
				</CSSTransition>

				<CSSTransition
					classNames="search-button"
					in={/^\/goods\/?\w*/.test(pathname) && (showSearchButton || window.innerWidth > 700)}
					timeout={250}
					unmountOnExit
				>
					<SearchButton
						innerRef={this.searchButton}
						onClick={showInput ? this.onSearchSubmit : this.onSearchBarOpen}
						showInput={showInput}
						teleportSearchButton={teleportSearchButton}
					>
						<SearchIcon />
					</SearchButton>
				</CSSTransition>
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
		{ searchItems }
	)(SearchBar)
);
