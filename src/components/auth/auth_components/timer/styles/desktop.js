import { css } from "styled-components";

export const timerContainer = css`
	position: absolute;
	right: -5px;
	top: 0;
	padding: 5px 0 5px 5px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 40px;
	font-size: 18px;
	background-color: transparent;
	border-radius: 5px;
	opacity: 0;
	animation: show-timer 600ms ease forwards;
	animation-delay: 500ms;

	@keyframes show-timer {
		0% {
			transform: translateY(0);
			opacity: 0;
		}

		60% {
			transform: translateY(-100px);
			opacity: 1;
		}

		100% {
			transform: translateY(-90px);
			opacity: 1;
		}
	}
`;

export const timerNumber = css`
	overflow: hidden;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 25px;
	height: 100%;
	color: rgba(0, 0, 0, 0.8);
	margin-right: 5px;
	border-radius: 5px;
	background-color: #fff;

	::before {
		content: attr(data-before);
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		top: -100%;
		left: 0;
		width: 100%;
		height: 100%;
		color: rgba(0, 0, 0, 0.7);
		font-weight: 600;
	}

	::after {
		content: attr(data-after);
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		color: rgba(0, 0, 0, 0.7);
		font-weight: 600;
	}

	&.change::before,
	&.change::after {
		animation: change-number 700ms ease forwards;

		@keyframes change-number {
			0% {
				transform: translateY(0);
			}

			60% {
				transform: translateY(calc(100% + 3px));
			}

			100% {
				transform: translateY(100%);
			}
		}
	}
`;
