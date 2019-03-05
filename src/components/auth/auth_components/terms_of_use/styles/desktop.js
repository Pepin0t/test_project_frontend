import { css } from "styled-components";

export const container = css`
	overflow: auto;
	position: absolute;
	display: flex;
	justify-content: center;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: black;
	perspective: 1000px;
`;

export const text = css`
	cursor: pointer;
	position: relative;
	padding: 15px;
	width: 1280px;
	display: flex;
	flex-direction: column;
	font-size: 14px;
	line-height: 1.5;
	color: rgba(255, 255, 255, 0.7);
	z-index: 201;

	&.text-enter {
		opacity: 0;
	}

	&.text-enter-active {
		opacity: 1;
		transition: opacity 300ms ease;
		transition-delay: 300ms;
	}

	&.text-exit {
		opacity: 1;
	}

	&.text-exit-active {
		opacity: 0;
		transition: opacity 300ms ease;
	}
`;

export const title = css`
	margin: 0 auto 15px;
`;

export const paragraph = css`
	margin: 0 auto 15px;
`;

export const subparagraph = css`
	margin-bottom: 15px;
	text-align: justify;
`;
