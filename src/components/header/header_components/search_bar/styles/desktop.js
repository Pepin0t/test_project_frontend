import { css } from "styled-components";

export const container = css`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex-grow: 1;
	height: 100%;
`;

export const input = css`
	display: flex;
	padding: 0 20px;
	width: 400px;
	height: 100%;
	font-size: 16px;
	border: none;
	border-left: 1px solid var(--additional_color);
	-webkit-appearance: none;

	&.input-enter {
		transform: scaleY(0);
	}

	&.input-enter-active {
		transform: scaleY(1);
		transition: transform 250ms ease;
	}

	&.input-exit {
		transform: scaleY(1);
	}

	&.input-exit-active {
		transform: scaleY(0);
		transition: transform 250ms ease;
	}
`;

export const searchIcon = css`
	pointer-events: none;
	fill: var(--font_color_gray);
	transition: fill ease 250ms;
`;

export const searchButton = css`
	cursor: pointer;
	display: flex;
	align-items: center;
	padding: 0 15px;
	height: 100%;

	&.search-button-enter {
		transform: scaleX(0);
	}

	&.search-button-enter-active {
		transform: scaleX(1);
		transition: transform 250ms ease;
	}

	&.search-button-exit {
		transform: scaleY(1);
	}

	&.search-button-exit-active {
		transform: scaleY(0);
		transition: transform 250ms ease;
	}
`;
