import { css } from "styled-components";

export const container = css`
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 1);
	z-index: 200;
`;

export const title = css`
	position: absolute;
	top: 10px;
	left: 0;
	width: calc(100% - 50px);
	height: 30px;
	font-size: 20px;
	text-align: center;
	transition: transform 400ms ease;
	color: #fff;

	&.changing-form {
		transform: translateY(70px);
	}

	&#verification-form {
		position: relative;
		width: 100%;
		height: 0;
		color: #fff;
		font-size: 20px;
		transform: translateY(-65px);
	}
`;

export const userForm = css`
	overflow: hidden;
	position: absolute;
	top: calc(100% / 2 - 200px);
	left: calc(100% / 2 - 200px);
	display: flex;
	flex-direction: column;
	width: 450px;
	height: 230px;
	padding: 65px 15px 15px 15px;
	border-radius: 5px;
	transition: height 200ms ease;
	transition-delay: 300ms;

	::before {
		content: "";
		position: absolute;
		width: calc(100% - 50px);
		left: 0;
		bottom: 0;
		height: calc(100% - 50px);
		background-color: #fff;
		border-radius: 5px;
		z-index: -1;
	}

	&.user-form-enter {
		animation: user-form-enter 600ms ease forwards;
	}

	&.user-form-exit {
		animation: user-form-exit 400ms ease forwards;
	}

	&.registration {
		height: 275px;
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

export const verificationForm = css`
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
			transform: translateY(-500px);
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
			transform: translateY(500px);
			opacity: 0;
		}
	}
`;

export const verificationInputsContainer = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
	width: 80%;
	height: 40px;
	margin: 0 auto 15px;
`;

export const verificationInput = css`
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

export const label = css`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: calc(100% - 50px);
	height: 30px;
	margin-bottom: 15px;

	&#confirm-password-label {
		transform: translateX(-400px);
		transition: transform 300ms ease;

		&.add-input {
			transform: translateX(0);
		}
	}
`;

export const input = css`
	position: absolute;
	right: 0;
	width: calc(100% - 80px);
	height: 30px;
	padding: 5px;
	background-color: rgba(255, 255, 255, 1);
	border: 1px solid #959595;
	border-radius: 5px;

	&#confirm-password {
		width: calc(100% - 190px);
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
`;

export const controls = css`
	position: absolute;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: calc(100% - 30px);
	height: 40px;
	bottom: 15px;
`;

export const signInButton = css`
	cursor: pointer;
	position: relative;
	width: 120px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 5px;
	background-color: #70bc7b;
	color: #fff;
	font-size: 16px;
	transition: transform 300ms ease;

	&.changing-form {
		transform: translateY(100px);
		pointer-events: none;
	}

	&.registration {
		width: 220px;
	}

	&#verification {
		width: 100%;
	}
`;

export const changeFormButton = css`
	position: relative;
	right: 50px;
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

	&.changing-form {
		transform: translateY(100px);
		pointer-events: none;
	}

	&.registration {
		width: 100px;
	}
`;

export const sighInMessage = css`
	position: absolute;
	top: calc(100% / 2 + 70px);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 16px;
	margin-bottom: 15px;
	font-size: 18px;
	color: #fff;
	z-index: -1;

	&.show-message {
		animation: show-message 1500ms ease forwards;

		@keyframes show-message {
			0% {
				opacity: 0;
				transform: translateY(-50px);
			}

			20% {
				opacity: 1;
				transform: translateY(0);
			}

			80% {
				opacity: 1;
				transform: translateY(0);
			}

			100% {
				opacity: 0;
				transform: translateY(-50px);
			}
		}
	}
`;

export const closeIcon = css`
	fill: #fff;
	transition: all ease 300ms;
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
`;
