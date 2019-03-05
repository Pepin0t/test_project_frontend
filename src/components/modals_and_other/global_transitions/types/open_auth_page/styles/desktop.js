import { css } from "styled-components";

export const container = css`
	overflow: hidden;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
`;
export const curtain = css`
	position: absolute;
	width: 50%;
	height: 100%;
	background-color: black;
	opacity: 0;

	&#left {
		left: 0;
		animation-delay: 400ms;
		padding: 15px;
		color: #fff;
	}

	&#right {
		right: 0;
		animation-delay: 500ms;
	}

	animation: full-blackout 300ms ease forwards;

	@keyframes full-blackout {
		to {
			opacity: 1;
		}
	}
`;

export const ray = css`
	position: absolute;
	left: 50%;
	bottom: 100%;
	width: 2px;
	height: 100%;
	background-color: #fff;
	transform: translateY(0);
	animation: ray 600ms ease forwards;
	transition: opacity 300ms ease;

	@keyframes ray {
		to {
			transform: translateY(100%);
		}
	}

	&.done {
		opacity: 0;
	}
`;

export const leaf = css`
	position: absolute;
	width: calc(100% + 100vh);
	height: 100%;
	border: 2px solid #fff;
	background-color: black;
	transform: rotate(0);
	transform-origin: 0 0;
	transition: border 300ms ease;

	&#far {
		bottom: -100%;
		right: 0;
		transform-origin: 100% 0;
		animation: far-leaf 600ms ease forwards;
		animation-delay: 100ms;
		transition-delay: 100ms;

		@keyframes far-leaf {
			0% {
				transform: rotate(0);
			}

			50% {
				transform: rotate(16deg);
			}

			100% {
				transform: rotate(15deg);
			}
		}
	}

	&#near {
		top: 100%;
		left: 0;
		transform-origin: 0 0;
		animation: near-leaf 600ms ease forwards;
		transition-delay: 200ms;

		@keyframes near-leaf {
			0% {
				transform: rotate(0);
			}

			50% {
				transform: rotate(-16deg);
			}

			100% {
				transform: rotate(-15deg);
			}
		}
	}

	&.done {
		border: 2px solid black;
	}
`;
