import { css } from "styled-components";

export const input = css`
	display: flex;
	flex-grow: 1;
	padding: 0 20px;
	height: 50px;
	border: none;
	font-size: 18px;
	z-index: 3;
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

// не используется
export const searchIcon = css`
	fill: #fff;
	transition: fill ease 250ms;
	pointer-events: none;
`;

export const searchButton = css`
	display: flex;
	align-items: center;
	flex-grow: 0;
	box-sizing: content-box;
	padding: 0 15px;
	transition: all ease 250ms;
	height: 50px;
	background-color: ${props => (props.showInput ? "#fff" : "transparent")};
	z-index: 5;

	> :first-child {
		fill: ${props => (props.showInput ? "#959595" : "#fff")};
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

		> :first-child {
			fill: ${props => (props.teleportSearchButton ? "#959595" : "#fff")};
		}
	}

	@media (max-width: 400px) {
		padding: 0 10px;
	}
`;
