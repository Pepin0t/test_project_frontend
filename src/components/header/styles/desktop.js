import { css } from "styled-components";

export const headerWrapper = css`
	position: absolute;
	top: ${props => (props.fullscreen ? "-60px" : 0)};
	min-height: 50px;
	width: 100%;
	background-color: ${props => props.theme.themeColor(0.3)};
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
	transition: top ease 250ms;
`;

export const headerContainer = css`
	padding: 0 15px;
	width: 1280px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const logoIcon = css`
	margin-right: 15px;
	font-size: 24px;
	color: #fff;
	text-decoration: none;
	min-width: 130px;
`;

export const navBar = css`
	display: flex;
	flex-direction: row;
	height: 50px;
	width: 100%;
	justify-content: flex-end;
`;

export const navLinksContainer = css`
	display: flex;
	flex-direction: row;
	z-index: 100;
`;

export const styledNavLink = css`
	display: flex;
	align-items: center;
	pointer-events: auto;
	padding: 0 15px;
	text-decoration: none;
	font-size: 14px;
	color: #fff;
	letter-spacing: 0.1em;
	transition: all ease 250ms;

	&.active {
		pointer-events: none;
		background-color: rgba(0, 0, 0, 0.1);
		color: #fff;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
	}

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

// не используется
export const navExpandIcon = css`
	fill: #fff;
`;

export const navExpandButton = css`
	display: none;
`;

// не используется
export const closeNavIcon = css`
	fill: #959595;
`;

export const closeNavButton = css`
	display: none;
`;
