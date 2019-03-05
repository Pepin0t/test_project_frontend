import { css } from "styled-components";

export const container = css`
	pointer-events: none;
	overflow: hidden;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;
`;

export const circle = css`
	fill: black;
	r: 20px;
	animation: expand 1000ms ease forwards;

	@keyframes expand {
		0% {
			r: 20px;
		}

		100% {
			r: 100%;
		}
	}
`;
