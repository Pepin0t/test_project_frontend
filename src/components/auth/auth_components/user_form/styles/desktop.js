import { css } from "styled-components";

export const formContainer = css`
	overflow: hidden;
	position: absolute;
	top: calc(100% / 2 - 200px);
	left: calc(100% / 2 - 200px);
	display: flex;
	flex-direction: column;
	transition: opacity 300ms ease;
	z-index: 1;

	&.user-form-enter {
		animation: user-form-enter 600ms ease forwards;
	}

	&.user-form-exit {
		animation: user-form-exit 400ms ease forwards;
	}

	&.show-terms-of-use {
		opacity: 0;
	}

	@keyframes user-form-enter {
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

	@keyframes user-form-exit {
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

export const closeIcon = css`
	pointer-events: none;
	fill: #fff;
	transition: fill ease 300ms;
`;

export const closeButton = css`
	position: absolute;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	right: 5px;
	top: 5px;
	height: 40px;
	width: 40px;
	background-color: #f1592a;
	border-radius: 50%;
	transform: scale(0);
	transition: background-color 300ms ease;

	&.show {
		animation: show-close-button-auth 500ms ease forwards;

		:hover {
			background-color: #fff;
		}

		:hover > :first-child {
			fill: #f1592a;
		}

		@keyframes show-close-button-auth {
			0% {
				transform: scale(0);
				border: 20px solid #fff;
			}

			60% {
				transform: scale(1);
				border: 20px solid #fff;
			}

			100% {
				transform: scale(1);
				border: 3px solid #fff;
			}
		}
	}

	&.closing {
		animation: closing 300ms ease forwards;
		background-color: #fff;
		pointer-events: none;

		@keyframes closing {
			0% {
				transform: scale(1);
			}

			50% {
				transform: scale(1.2);
			}

			100% {
				transform: scale(1);
			}
		}
	}

	&.closing > :first-child {
		fill: #fff;
	}
`;

export const form = css`
	--h: 180px;

	&.registration {
		--h: 275px;
	}

	position: relative;
	display: flex;
	flex-direction: column;
	width: 420px;
	height: var(--h);
	padding: 15px;
	margin: 50px 50px 100px 0;
	border-radius: 5px;
	background-color: #fff;
	transition: height 200ms ease;
	transition-delay: 300ms;
`;

export const title = css`
	position: absolute;
	top: -40px;
	left: 0;
	width: 100%;
	height: 30px;
	font-size: 20px;
	text-align: center;
	transition: transform 400ms ease;
	color: #fff;

	&.changing-form {
		transform: translateY(70px);
	}
`;

export const label = css`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 30px;
	margin-bottom: 15px;

	&#confirm-password-label {
		transform: translateX(-420px);
		transition: transform 300ms ease;

		&.add-input {
			transform: translateX(0);
		}
	}

	&#checkbox-label {
		pointer-events: none;
		transform: translateX(-420px);
		transition: transform 300ms ease;
		font-size: 12px;

		&.add-input {
			transform: translateX(0);
			transition-delay: 100ms;
		}
	}
`;

export const input = css`
	--w: calc(100% - 80px);

	&#confirm-password {
		--w: calc(100% - 190px);
	}

	position: absolute;
	right: 0;
	width: var(--w);
	height: 30px;
	padding: 5px;
	background-color: rgba(255, 255, 255, 1);
	border: 1px solid #959595;
	border-radius: 5px;

	&.empty {
		animation: empty 600ms ease;

		@keyframes empty {
			0% {
				border-color: #959595;
				background-color: rgba(255, 255, 255, 1);
			}

			50% {
				border-color: rgba(255, 0, 0, 1);
				background-color: rgba(255, 0, 0, 0.1);
			}

			100% {
				border-color: #959595;
				background-color: rgba(255, 255, 255, 1);
			}
		}
	}
`;

export const registrationInputs = css`
	width: 100%;
	height: 0;
`;

export const checkbox = css`
	position: relative;
	pointer-events: auto;
	cursor: pointer;
	width: 30px;
	height: 30px;
	border: 1px solid #959595;
	border-radius: 5px;
	transition: all 200ms ease;

	::before {
		content: "";
		position: absolute;
		top: 3px;
		left: 9px;
		height: 14px;
		width: 7px;
		border: solid #fff;
		border-width: 0 3px 3px 0;
		transform: rotate(45deg);
	}

	&.empty {
		animation: empty 600ms ease;

		@keyframes empty {
			0% {
				border-color: #959595;
				background-color: rgba(255, 255, 255, 1);
			}

			50% {
				border-color: rgba(255, 0, 0, 1);
				background-color: rgba(255, 0, 0, 0.1);
			}

			100% {
				border-color: #959595;
				background-color: rgba(255, 255, 255, 1);
			}
		}
	}

	&.empty::before {
		border: none;
	}

	:checked {
		background-color: #70bc7b;
		border: 1px solid transparent;
	}
`;

export const controls = css`
	overflow: hidden;
	position: absolute;
	bottom: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: calc(100% - 30px);
	height: 40px;
	padding-bottom: 15px;
	box-sizing: content-box;
`;

export const actionButton = css`
	--w: 120px;

	&.registration {
		--w: 220px;
	}

	overflow: hidden;
	position: relative;
	cursor: pointer;
	width: var(--w);
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
		animation: action-waiting 1000ms ease infinite;

		@keyframes action-waiting {
			0% {
				transform: translateX(0) rotate(20deg);
			}

			100% {
				transform: translateX(calc(var(--w) + 50px)) rotate(20deg);
			}
		}
	}

	&.changing-form {
		transform: translateY(100px);
		pointer-events: none;
	}
`;

export const changeFormButton = css`
	cursor: pointer;
	width: 200px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 5px;
	border: 1px solid #959595;
	background-color: #fff;
	color: #959595;
	font-size: 16px;
	transition: transform 300ms ease;
	transition-delay: 100ms;

	&.action-waiting {
		pointer-events: none;
	}

	&.changing-form {
		transform: translateY(100px);
		pointer-events: none;
	}

	&.registration {
		width: 100px;
	}
`;

export const signInMessage = css`
	position: absolute;
	top: calc(100% - 30px);
	left: 0;
	text-align: center;
	width: 100%;
	font-size: 18px;
	color: #fff;
	line-height: 1.5;
	z-index: -1;

	&.show-message {
		animation: show-message 3000ms ease forwards;

		@keyframes show-message {
			0% {
				opacity: 0;
				transform: translateY(0);
			}

			10% {
				opacity: 1;
				transform: translateY(50px);
			}

			90% {
				opacity: 1;
				transform: translateY(50px);
			}

			100% {
				opacity: 0;
				transform: translateY(0);
			}
		}
	}
`;
