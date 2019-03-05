import { css, keyframes } from "styled-components";

export const container = css`
	padding: 0 30px;
	width: 100%;
	height: 140px;
`;

export const navigation = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 70px;
	width: 100%;
`;

export const logoIcon = css`
	cursor: pointer;
	position: relative;
	display: flex;
	align-items: center;
	flex-grow: 0;
	margin-right: 30px;
	height: 100%;
	font-size: 24px;
	color: var(--font_color_gray);
	text-decoration: none;

	::before {
		content: "";
		position: absolute;
		bottom: 5px;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: var(--additional_color);
		transform: scaleX(0);
		transition: transform 700ms ease;
	}

	&.active {
		pointer-events: none;
	}

	&.active::before {
		transform: scaleX(1);
	}
`;

export const navLinksContainer = css`
	position: relative;
	display: flex;
	flex-direction: row;
	flex-grow: 0;
	height: 100%;
	/* z-index: 100; */
`;

export const navLink = css`
	pointer-events: auto;
	cursor: pointer;
	position: relative;
	padding: 0 15px;
	display: flex;
	align-items: center;
	text-decoration: none;
	font-size: 14px;
	color: var(--font_color_gray);
	letter-spacing: 0.1em;
	box-sizing: border-box;
	opacity: 0.5;
	transition: opacity 200ms ease;

	&.active {
		pointer-events: none;
		opacity: 1;
	}
`;

export const navLinksBottomLine = css`
	position: absolute;
	bottom: 5px;
	left: 0;
	width: 0;
	height: 2px;
	background-color: var(--additional_color);
	transform: translateX(0);
	transition: width 1000ms ease, transform 1000ms ease;
`;

export const sidebarButton = css`
	cursor: pointer;
	position: relative;
	display: flex;
	align-items: center;
	flex-grow: 0;
	padding: 0 30px;
	width: 30px;
	height: 100%;
	transition: transform 700ms ease;
	z-index: 1000;

	::before {
		content: "";
		position: absolute;
		left: 15px;
		top: calc((100% - 18px) / 2);
		width: 30px;
		height: 18px;
		border-top: 2px solid var(--additional_color);
		border-bottom: 2px solid var(--additional_color);
		transition: all 500ms ease;
		box-sizing: border-box;
	}

	::after {
		content: "";
		position: absolute;
		left: 15px;
		top: calc((100% - 2px) / 2);
		width: 30px;
		height: 2px;
		background-color: var(--additional_color);
		transition: all 500ms ease;
	}

	:hover::before {
		transform: scaleX(0.5);
	}

	&.opened {
		transform: translate(35px, -10px);
	}

	&.opened::before {
		border-bottom: 2px solid transparent;
		top: calc(100% / 2);
		transform: rotate(-45deg);
		transform-origin: 50% 0;
	}

	&.opened::after {
		transform: rotate(45deg);
	}
`;

export const sidebar = css`
	position: fixed;
	right: 0;
	top: 0;
	width: 300px;
	height: 100%;
	padding: 70px 15px 15px 15px;
	display: flex;
	flex-direction: column;
	background-color: var(--main_color);
	transform: translateX(100%);
	transition: transform 700ms ease;
	z-index: 999;

	::before {
		content: "";
		pointer-events: none;
		position: fixed;
		right: 100%;
		top: 0;
		height: 100%;
		width: 100vw;
		background-color: rgba(0, 0, 0, 0.7);
		opacity: 0;
		transition: opacity 700ms ease;
	}

	&.show {
		transform: translateX(0);
	}

	&.show::before {
		pointer-events: auto;
		opacity: 1;
	}
`;

export const menu = css`
	width: 100%;
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 15px 0;
	border-top: 2px solid var(--additional_color);
	border-bottom: 2px solid var(--additional_color);
`;

export const author = css`
	position: absolute;
	bottom: 15px;
	color: var(--font_color_gray);
	font-size: 16px;
	letter-spacing: 1.5px;
`;

export const socialIcons = css`
	position: absolute;
	bottom: 2px;
	right: 0;
	height: 50px;
	width: 150px;
	padding: 0 15px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const fbIcon = css`
	fill: var(--font_color_gray);
	transition: fill ease 200ms;

	:hover {
		fill: #3b5998;
	}
`;

export const vkIcon = css`
	fill: var(--font_color_gray);
	transition: fill ease 200ms;

	:hover {
		fill: #45668e;
	}
`;

export const instIcon = css`
	fill: var(--font_color_gray);
	transition: fill ease 200ms;

	:hover {
		fill: #f77737;
	}

	#back {
		fill: #fff;
		transition: fill-opacity ease 200ms;
	}

	:hover #back {
		fill-opacity: 1;
	}
`;

export const titleContainer = css`
	position: relative;
	display: flex;
	justify-content: center;
	width: 100%;
	height: 70px;
	z-index: 100;
`;

export const nextTitle = css`
	position: absolute;
	top: 0;
	display: flex;
	align-items: center;
	height: 100%;
	color: var(--font_color_gray);
	font-size: 24px;
	letter-spacing: 2px;
	transform: translateY(-40px);
	opacity: 0;

	&.show {
		animation: show-next-title 700ms ease forwards;

		@keyframes show-next-title {
			to {
				transform: translateY(0);
				opacity: 1;
			}
		}
	}
`;

export const currentTitle = css`
	position: absolute;
	top: 0;
	display: flex;
	align-items: center;
	height: 100%;
	color: var(--font_color_gray);
	font-size: 24px;
	letter-spacing: 2px;

	&.hold > * {
		animation: none;
	}
`;

const destroy = ({ transform }) => {
	return keyframes`
		to {
			transform: ${"translateY(" + transform + "px) rotate(" + transform + "deg)"};
			opacity: 0;
		}
	`;
};

export const titleLetter = css`
	animation: ${props => destroy(props)} 1500ms ease forwards;
`;
