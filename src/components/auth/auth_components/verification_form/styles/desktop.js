import { css } from "styled-components";

export const form = css`
	position: absolute;
	top: calc(100% / 2 - 150px);
	left: calc(100% / 2 - 200px);
	display: flex;
	flex-direction: column;
	width: 400px;
	padding: 15px;
	background-color: #fff;
	border-radius: 5px;

	&.verification-form-enter {
		animation: verification-form-enter 600ms ease forwards;
	}

	&.verification-form-exit {
		animation: verification-form-exit 400ms ease forwards;
	}

	@keyframes verification-form-enter {
		0% {
			transform: translateY(-300px);
			opacity: 0;
		}

		60% {
			transform: translateY(20px);
			opacity: 1;
		}

		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes verification-form-exit {
		0% {
			transform: translateY(0);
			opacity: 1;
		}

		100% {
			transform: translateY(300px);
			opacity: 0;
		}
	}
`;

export const title = css`
	position: absolute;
	top: -40px;
	left: 0;
	width: 100%;
	font-size: 20px;
	text-align: center;
	color: #fff;
`;

export const inputsContainer = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
	width: 80%;
	height: 40px;
	margin: 0 auto 15px;
`;

export const input = css`
	cursor: pointer;
	width: 40px;
	height: 40px;
	text-align: center;
	border-radius: 5px;
	border: 1px solid #959595;
	font-size: 20px;
	color: transparent;
	text-shadow: 0 0 0 #959595;
	background-color: #fff;

	:focus {
		animation: input-focus 1000ms ease infinite;

		@keyframes input-focus {
			0% {
				box-shadow: 0 0 0 0 transparent;
				border: 1px solid #959595;
			}

			50% {
				box-shadow: 0 0 0 3px #70bc7b;
				border: 1px solid #70bc7b;
			}

			100% {
				box-shadow: 0 0 0 0 transparent;
				border: 1px solid #959595;
			}
		}
	}

	:disabled {
		cursor: default;
		background-color: #fff;
	}

	&.wrong-key {
		animation: wrong-key 500ms ease;

		@keyframes wrong-key {
			0% {
				border: 1px solid #959595;
				background-color: #fff;
				text-shadow: 0 0 0 #959595;
			}

			50% {
				border: 1px solid rgba(255, 0, 0, 1);
				background-color: rgba(255, 0, 0, 0.1);
				text-shadow: 0 0 0 rgba(255, 0, 0, 1);
			}

			100% {
				border: 1px solid #959595;
				background-color: #fff;
				text-shadow: 0 0 0 transparent;
			}
		}
	}
`;

export const actionButton = css`
	overflow: hidden;
	position: relative;
	cursor: pointer;
	width: 370px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 5px;
	background-color: #70bc7b;
	color: #fff;
	font-size: 16px;
	transition: transform 300ms ease, color 150ms ease;

	::before {
		content: "";
		position: absolute;
		left: -30px;
		top: -10px;
		width: 20px;
		height: 60px;
		background-color: rgba(255, 255, 255, 0.4);
		transform: translateX(0) rotate(20deg);
	}

	&.action-waiting {
		color: rgba(255, 255, 255, 0.5);
		pointer-events: none;
	}

	&.action-waiting::before {
		animation: verification-action-waiting 1000ms ease infinite;

		@keyframes verification-action-waiting {
			0% {
				transform: translateX(0) rotate(20deg);
			}

			100% {
				transform: translateX(420px) rotate(20deg);
			}
		}
	}
`;
