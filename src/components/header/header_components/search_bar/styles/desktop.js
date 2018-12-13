import { css } from "styled-components";

export const input = css`
	display: flex;
	flex-grow: 1;
	padding: 0 20px;
	height: 50px;
	border: none;
	font-size: 18px;
	z-index: 1;
	box-shadow: inset 10px 0 10px -10px rgba(0, 0, 0, 0.9);
	-webkit-appearance: none;

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
`;

export const searchIcon = css`
	fill: #fff;
	transition: fill ease 250ms;
	pointer-events: none;
`;

export const searchButton = css`
	display: flex;
	align-items: center;
	flex-grow: 0;
	cursor: pointer;
	box-sizing: content-box;
	padding: 0 15px;
	transition: all ease 250ms;
	height: 50px;
	background-color: ${props => (props.showInput ? "#fff" : "none")};
	z-index: 5;

	> :first-child {
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
`;
