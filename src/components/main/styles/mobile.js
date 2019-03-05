import { css } from "styled-components";

export const styledContent = css`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	width: 100%;
`;

export const background = css`
	position: fixed;
	left: -20px;
	width: 100vw;
	height: 100vh;
	background-size: cover;
	z-index: -1;
`;

export const header = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	min-height: 50px;
	z-index: 2;
	background-color: var(--main_color);
`;

export const title = css`
	font-size: 24px;
	padding-left: 15px;
	display: flex;
	align-items: center;
	min-height: 100%;
	color: #fff;
	min-width: 160px;
`;

export const headerButtons = css`
	display: none;
`;

// не используется
export const fullscreenEnterIcon = css`
	fill: #fff;
`;

// не используется
export const fullscreenExitIcon = css`
	fill: #fff;
`;

// не используется
export const fullscreenToggleButton = css`
	padding: 0 15px;
	cursor: pointer;
	display: flex;
	align-items: center;
	transition: all ease 250ms;

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

export const body = css`
	width: 100%;
`;
