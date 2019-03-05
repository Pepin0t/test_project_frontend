import { css } from "styled-components";

export const container = css`
	position: relative;
	width: 100%;
	height: calc(100% - 140px);
`;

export const contentPreloader = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	font-size: 24px;
	color: var(--font_color_gray);
	z-index: 1;

	&.preloader-enter {
		opacity: 0;
	}
	&.preloader-enter-active {
		opacity: 1;
		transition: opacity 500ms ease;
	}
	&.preloader-exit {
		opacity: 1;
	}
	&.preloader-exit-active {
		opacity: 0;
		transition: opacity 500ms ease;
	}
`;
