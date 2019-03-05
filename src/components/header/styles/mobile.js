import { css } from "styled-components";

export const headerWrapper = css`
	min-height: 50px;
	width: 100%;
	background-color: var(--main_color);
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
`;

export const headerContainer = css`
	width: 100%;
	padding-left: 15px;
	padding-right: 0;
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
	min-width: 50px;
`;

// не используется
export const navBar = css`
	display: flex;
	flex-direction: row;
	height: 50px;
	width: 100%;
	justify-content: flex-end;
`;

export const navLinksContainer = css`
	position: fixed;
	box-sizing: content-box;
	display: flex;
	flex-direction: column;
	width: 216px;
	height: 100vh;
	top: -70px;
	right: 0;
	padding-bottom: 70px;
	background-color: #fff;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	transform: ${props => (props.show ? "scaleY(1)" : "scaleY(0)")} translateY(70px);
	z-index: 100;

	&.nav-links-enter {
		transform: translate(236px, 70px);
	}

	&.nav-links-enter-active {
		transform: translate(0, 70px);
		transition: all 250ms ease;
	}

	&.nav-links-exit {
		transform: translate(0, 70px);
	}

	&.nav-links-exit-active {
		transform: translate(236px, 70px);
		transition: all 250ms ease;
	}

	::before {
		content: "";
		height: 50px;
	}
`;

export const navLink = css`
	display: flex;
	align-items: center;
	padding: 0 15px;
	height: 50px;
	color: #959595;
	text-decoration: none;
	font-size: 14px;
	letter-spacing: 0.1em;
	transition: all ease 250ms;

	&.active {
		background-color: #f1592a;
		color: #fff;
		margin-left: -20px;
		padding: 0 0 0 20px;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
		z-index: 100;
	}
`;

export const navExpandIcon = css`
	fill: #fff;
`;

export const navExpandButton = css`
	display: flex;
	align-items: center;
	box-sizing: content-box;
	padding: 0 15px;

	@media (max-width: 400px) {
		padding: 0 10px;
	}
`;

export const closeNavIcon = css`
	fill: #959595;
`;

export const closeNavButton = css`
	display: flex;
	align-items: center;
	position: fixed;
	padding: 0 20px;
	top: 0;
	right: calc(100% - 100vw);
	height: 50px;
	z-index: 101;

	&.close-enter {
		opacity: 0.01;
	}

	&.close-enter-active {
		opacity: 1;
		transition: all 500ms ease;
	}

	&.close-exit {
		opacity: 1;
	}

	&.close-exit-active {
		opacity: 0.01;
		transition: all 250ms ease;
	}
`;
