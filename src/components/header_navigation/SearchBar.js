import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import SearchButton from "../../components/header_navigation/SearchButton";

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

	&.input-enter {
		transform: scaleY(0.01);
	}

	&.input-enter-active {
		transform: scaleY(1);

		transition: all 250ms ease;
	}

	&.input-exit {
		transform: scaleY(1);
	}

	&.input-exit-active {
		transform: scaleY(0.01);
		transition: all 250ms ease;
	}

	@media (max-width: 700px) {
		position: absolute;
		transform: translate(0, 50px);
		width: 100%;
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

// -------------------------------------------

class SearchBar extends PureComponent {
	constructor(props) {
		super(props);

		this.textInput = React.createRef();

		this.state = {
			showInput: false
		};
	}

	componentDidUpdate() {
		if (this.state.showInput && /^\/goods\/?\w*/.test(this.props.location.pathname)) {
			this.textInput.current.focus();
		} else {
			this.setState({
				showInput: false
			});
		}
	}

	onSearchBarOpen = () => {
		this.setState({
			showInput: true
		});
	};

	onSearchSubmit = () => {
		if (this.state.showInput) {
			alert(this.textInput.current.value);
		}
	};

	keyFunction = e => {
		// Enter
		if (e.keyCode === 13) this.onSearchSubmit();
	};

	render() {
		const Fragment = React.Fragment;
		const { showInput } = this.state;
		const { pathname } = this.props.location;

		return (
			<Fragment>
				<CSSTransition classNames="input" in={/^\/goods\/?\w*/.test(pathname) ? showInput : false} timeout={250} unmountOnExit>
					<Input innerRef={this.textInput} onKeyDown={this.keyFunction} />
				</CSSTransition>

				<SearchButton onSearchBarOpen={this.onSearchBarOpen} onSearchSubmit={this.onSearchSubmit} showInput={showInput} />
			</Fragment>
		);
	}
}

export default withRouter(SearchBar);
