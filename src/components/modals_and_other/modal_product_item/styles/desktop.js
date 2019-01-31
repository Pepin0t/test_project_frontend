import { css } from "styled-components";

export const modalContainer = css`
	position: fixed;
	left: 0;
	top: 0;
	overflow-x: hidden;
	overflow-y: hidden;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.9);
	z-index: 200;

	&.product-item-modal-enter {
		opacity: 0;
	}

	&.product-item-modal-enter-active {
		opacity: 1;
		transition: all 250ms ease;
	}

	&.product-item-modal-exit {
		opacity: 1;
	}

	&.product-item-modal-exit-active {
		opacity: 0;
		transition: all 250ms ease;
	}
`;

export const modalWindow = css`
	position: relative;
	height: calc(100vh - 60px);
	width: 1280px;
	margin: 30px auto;
	z-index: 1000;
	filter: url("#goo");

	::before {
		content: "";
		position: absolute;
		width: 100px;
		height: 100px;
		top: calc((100% - 100px) / 2);
		left: calc((100% - 100px) / 2);
		border-radius: 50%;
		background-color: #fff;
		animation-fill-mode: forwards !important;
		z-index: 100;
	}

	&.hide-loading-ball ::before {
		animation: hide-loading-ball 300ms ease;

		@keyframes hide-loading-ball {
			to {
				transform: scale(0.01);
				visibility: hidden;
			}
		}
	}

	&.show-loading-ball ::before {
		animation: show-loading-ball 300ms ease;

		@keyframes show-loading-ball {
			from {
				transform: scale(0.01);
				visibility: hidden;
			}

			to {
				transform: scale(1);
				visibility: visible;
			}
		}
	}

	@media (max-width: 1360px) {
		width: calc(100% - 60px);
	}
`;

export const imageBall = css`
	position: absolute;
	width: 70px;
	height: 70px;
	top: calc((100% - 70px) / 2);
	left: calc((100% - 70px) / 2);
	border-radius: 50%;
	background-color: #fff;
	animation-fill-mode: forwards !important;

	&.waiting {
		animation: image-ball-waiting 5000ms ease infinite;
		animation-delay: 300ms;

		@keyframes image-ball-waiting {
			0% {
				transform: translate(100px, -50px);
			}

			50% {
				transform: translate(100px, -75px);
			}

			100% {
				transform: translate(100px, -50px);
			}
		}
	}

	&.to-position {
		animation: to-image-ball-position 1200ms ease;

		@keyframes to-image-ball-position {
			0% {
				transform: translate(100px, -50px);
			}

			60% {
				left: 0;
				top: 0;
				transform: none;
				border: none;
			}

			100% {
				left: 0;
				top: 0;
				transform: none;
				border: none;
				border-radius: 3px;
				width: 70%;
				height: calc(100% - 230px);
			}
		}
	}

	&.back-to-center {
		animation: image-back-to-center 700ms ease;

		@keyframes image-back-to-center {
			0% {
				left: 0;
				top: 0;
				width: 70%;
				height: calc(100% - 230px);
			}

			30% {
				width: 70px;
				height: 70px;
			}

			100% {
				width: 70px;
				height: 70px;
				left: calc((100% - 70px) / 2);
				top: calc((100% - 70px) / 2);
				transform: none;
				border: none;
			}
		}
	}
`;

export const imageContainer = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	width: 100%;
	padding: 15px;
`;

export const img = css`
	display: block;
	height: calc(100% - 30px);
	max-width: 100%;
	border-radius: 5px;
`;

export const imageCounter = css`
	width: 100%;
	min-height: 30px;
	text-align: center;
	font-size: 16px;
	color: #959595;
`;

export const smallImagesWrapper = css`
	position: absolute;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 200px;
	padding: 0 100px;
	bottom: 0;
	z-index: -1;
`;

export const smallImageContainer = css`
	cursor: pointer;
	background-color: #fff;
	border: 3px solid #fff;
	overflow: hidden;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	transition: all 300ms ease;

	&.show-small-images {
		animation: show 700ms ease forwards;

		@keyframes show {
			0% {
				transform: translateY(0);
			}

			60% {
				transform: translateY(300px);
			}

			100% {
				transform: translateY(270px);
			}
		}
	}
`;

export const smallImage = css`
	height: 100%;
	user-select: none;

	/* width: 100%; */
`;

export const leftArrowIcon = css`
	fill: #959595;
	transition: all ease 200ms;
`;

export const rightArrowIcon = css`
	fill: #959595;
	transition: all ease 200ms;
`;

export const previousImageButton = css`
	position: absolute;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	left: 15px;
	height: 50px;
	width: 50px;
	border-radius: 50%;
	background-color: #fff;
	border: 3px solid #fff;
	transition: all ease 200ms;

	transform: translateY(300px);

	:hover {
		border: 3px solid #f1592a;
	}

	:hover > :first-child {
		fill: #f1592a;
	}
`;

export const nextImageButton = css`
	position: absolute;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	right: 15px;
	height: 50px;
	width: 50px;
	border-radius: 50%;
	background-color: #fff;
	border: 3px solid #fff;
	transition: all ease 200ms;

	transform: translateY(300px);

	:hover {
		border: 3px solid #f1592a;
	}

	:hover > :first-child {
		fill: #f1592a;
	}
`;

export const errorCloseButton = css`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f1592a;
	width: calc(100% - 6px);
	height: calc(100% - 6px);
	margin-top: 3px;
	margin-left: 3px;
	border-radius: 50%;
	transform: scale(0);
	transition: background-color 300ms ease;

	:hover {
		background-color: #fff;
	}

	:hover > :first-child {
		fill: #f1592a;
	}

	&.error {
		animation: error-close-button-in 500ms ease;
		animation-fill-mode: forwards;
		animation-delay: 100ms;

		@keyframes error-close-button-in {
			0% {
				transform: scale(0);
			}

			70% {
				transform: scale(1.2);
			}

			100% {
				transform: scale(1);
			}
		}
	}

	&.try-again {
		animation: error-close-button-out 300ms ease;

		@keyframes error-close-button-out {
			0% {
				transform: scale(1);
			}

			100% {
				transform: scale(0);
			}
		}
	}
`;

export const descriptionBall = css`
	position: absolute;
	padding: 15px;
	width: 70px;
	height: 70px;
	top: calc((100% - 70px) / 2);
	left: calc((100% - 70px) / 2);
	border-radius: 50%;
	background-color: #fff;
	animation-fill-mode: forwards !important;
	overflow: auto;

	&.waiting {
		animation: description-ball-waiting 5000ms ease infinite;

		@keyframes description-ball-waiting {
			0% {
				transform: translate(0, -110px) scale(0.5);
			}

			50% {
				transform: translate(0, -130px) scale(0.5);
			}

			100% {
				transform: translate(0, -110px) scale(0.5);
			}
		}
	}

	&.to-position {
		animation: to-description-ball-position 1200ms ease;

		@keyframes to-description-ball-position {
			0% {
				transform: translate(0, -110px) scale(0.5);
			}

			30% {
				top: 230px;
				left: calc(70% + 30px);
				box-shadow: none;
				transform: none;
				border: none;
			}

			100% {
				top: 230px;
				left: calc(70% + 30px);
				box-shadow: none;
				transform: none;
				border: none;
				border-radius: 3px;
				width: calc(30% - 30px);
				height: calc(100% - 230px);
			}
		}
	}

	&.back-to-center {
		animation: description-back-to-center 700ms ease;

		@keyframes description-back-to-center {
			0% {
				top: 230px;
				left: calc(70% + 30px);
				width: calc(30% - 30px);
				height: calc(100% - 230px);
			}

			50% {
				width: 70px;
				height: 70px;
			}

			100% {
				top: calc((100% - 70px) / 2);
				left: calc((100% - 70px) / 2);
				box-shadow: none;
				transform: none;
				border: none;
			}
		}
	}
`;

export const otherBall = css`
	position: absolute;
	padding: 15px;
	width: 70px;
	height: 70px;
	top: calc((100% - 70px) / 2);
	left: calc((100% - 70px) / 2);
	border-radius: 50%;
	background-color: #fff;
	animation-fill-mode: forwards !important;

	&.waiting {
		animation: other-ball-waiting 5000ms ease infinite;
		animation-delay: 300ms;

		@keyframes other-ball-waiting {
			0% {
				transform: translate(-100px, -50px);
			}

			50% {
				transform: translate(-100px, -80px);
			}

			100% {
				transform: translate(-100px, -50px);
			}
		}
	}

	&.to-position {
		animation: to-other-ball-position 1200ms ease;

		@keyframes to-other-ball-position {
			0% {
				transform: translate(-100px, -50px);
			}

			70% {
				top: 0;
				left: calc(70% + 30px);
				box-shadow: none;
				transform: none;
				border: none;
			}

			100% {
				top: 0;
				left: calc(70% + 30px);
				box-shadow: none;
				transform: none;
				border: none;
				border-radius: 3px;
				width: calc(30% - 30px);
				height: 200px;
			}
		}
	}

	&.back-to-center {
		animation: other-back-to-center 900ms ease;

		@keyframes other-back-to-center {
			0% {
				top: 0;
				left: calc(70% + 30px);
				width: calc(30% - 30px);
				height: 200px;
			}

			40% {
				width: 70px;
				height: 70px;
			}

			100% {
				top: calc((100% - 70px) / 2);
				left: calc((100% - 70px) / 2);
				box-shadow: none;
				transform: none;
				border: none;
			}
		}
	}
`;

export const loadingIcon = css`
	position: absolute;
	top: calc((100% - 32px) / 2);
	left: calc((100% - 32px) / 2);
	fill: #959595;
	animation: rotating 1.5s linear infinite;
	z-index: 100;

	@keyframes rotating {
		0% {
			transform: rotate(0deg);
			opacity: 0;
		}

		50% {
			transform: rotate(180deg);
			opacity: 1;
		}

		100% {
			transform: rotate(360deg);
			opacity: 0;
		}
	}
`;

export const tryAgainButton = css`
	position: absolute;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	top: calc((100% - 90px) / 2);
	left: calc((100% - 90px) / 2);
	width: 90px;
	height: 90px;
	border: none;
	border-radius: 50%;
	background-color: #70bc7b;
	color: #fff;
	z-index: 101;
	transform: scale(0);

	&.error {
		animation: try-again-button-in 500ms ease;
		animation-fill-mode: forwards;

		@keyframes try-again-button-in {
			0% {
				transform: scale(0);
			}

			60% {
				transform: scale(1.1);
			}

			100% {
				transform: scale(1);
			}
		}
	}

	&.try-again {
		animation: try-again-button-out 800ms ease;
		animation-fill-mode: forwards;
		pointer-events: none;

		@keyframes try-again-button-out {
			0% {
				transform: rotate(0);
			}

			50% {
				transform: rotate(180deg);
				opacity: 1;
			}

			100% {
				transform: rotate(180deg);
				opacity: 0;
			}
		}
	}
`;

export const tryAgainIcon = css`
	pointer-events: none;
	fill: #fff;
	width: 64px;
	height: 64px;

	&.error {
		animation: rotate 1000ms ease;

		@keyframes rotate {
			0% {
				transform: rotate(-120deg);
			}

			60% {
				transform: rotate(30deg);
			}

			100% {
				transform: rotate(0);
			}
		}
	}
`;

export const title = css`
	width: 100%;
	height: 30px;
	font-weight: 600;
	font-size: 20px;
	color: #959595;
	text-align: center;
`;

export const category = css`
	font-size: 16px;
	color: #959595;
	margin: 15px 0;
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
	right: 0px;
	top: 5px;
	height: 40px;
	width: 40px;
	background-color: #f1592a;
	border-radius: 50%;
	transition: background-color 300ms ease;
	z-index: -1;

	&.show-controls {
		animation: show-close-button-product-item 700ms ease forwards;

		:hover {
			background-color: #fff;
		}

		:hover > :first-child {
			fill: #f1592a;
		}

		@keyframes show-close-button-product-item {
			0% {
				transform: translateX(0);
				border: 20px solid #fff;
			}

			60% {
				transform: translateX(60px);
				border: 20px solid #fff;
			}

			100% {
				transform: translateX(60px);
				border: 3px solid #fff;
			}
		}
	}
`;

export const main = css`
	/* margin-top: 25px; */
	/* margin-bottom: auto; */
	width: 100%;

	&.description-enter {
		opacity: 0;
	}

	&.description-enter-active {
		opacity: 1;
		transition: all 250ms ease;
	}
	&.description-exit {
		opacity: 1;
	}

	&.description-exit-active {
		opacity: 0;
		transition: all 250ms ease;
	}
`;

export const description = css`
	font-size: 16px;
`;

export const otherBallFooter = css`
	position: absolute;
	bottom: 15px;
	width: calc(100% - 30px);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
`;

export const price = css`
	font-weight: 600;
	font-size: 16px;
`;

export const buyButton = css`
	width: 200px;
	height: 40px;
	cursor: pointer;
	pointer-events: ${props => (props.alreadyInCart ? "none" : "auto")};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	color: #fff;
	z-index: 1;

	::before {
		content: "";
		position: absolute;
		width: 200px;
		height: 40px;
		background-color: ${props => (props.alreadyInCart ? "#70bc7b" : "#f1592a")};
		border-radius: 5px;
		transition: all ease 100ms;
		z-index: -1;
	}

	:hover ::before {
		transform: scale(1.05, 1.1);
	}
`;

export const attention = css`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 300px;
	top: calc((100% - 150px) / 2);
	color: #fff;
	font-size: 20px;
	opacity: 0;

	&.error {
		animation: attention-in 800ms ease;
		animation-fill-mode: forwards;
		@keyframes attention-in {
			0% {
				opacity: 0;
				transform: translateY(0);
			}

			50% {
				opacity: 1;
				transform: translateY(60px);
			}

			100% {
				opacity: 1;
				transform: translateY(50px);
			}
		}
	}

	&.try-again {
		animation: attention-out 400ms ease;

		@keyframes attention-out {
			0% {
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

export const ghostsWrapper = css`
	position: relative;
	width: 100%;
	height: 100%;
	z-index: -1;
	pointer-events: none;
	perspective: 1000px;
`;

export const imageBallGhost = css`
	position: absolute;
	left: 0;
	top: 0;
	width: 70%;
	height: calc(100% - 230px);
	background-color: rgba(255, 255, 255, 0.05);
	border-radius: 5px;
	border: 2px solid rgba(255, 255, 255, 0.4);
	animation: image-ghost-fade-in-out ease 3000ms infinite;
	opacity: 1;

	@keyframes image-ghost-fade-in-out {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	&.error {
		animation: image-ghost-flash 600ms ease forwards;

		@keyframes image-ghost-flash {
			0% {
				background-color: rgba(255, 255, 255, 0.05);
				border: 2px solid rgba(255, 255, 255, 0.4);
			}

			50% {
				background-color: rgba(241, 89, 42, 0.2);
			}

			100% {
				background-color: rgba(255, 255, 255, 0);
				border: 2px solid rgba(255, 255, 255, 0);
			}
		}
	}
`;

export const descriptionBallGhost = css`
	position: absolute;
	top: 230px;
	left: calc(70% + 30px);
	width: calc(30% - 30px);
	height: calc(100% - 230px);
	background-color: rgba(255, 255, 255, 0.05);
	border-radius: 5px;
	border: 2px solid rgba(255, 255, 255, 0.4);
	animation: description-ghost-fade-in-out ease 3000ms infinite;
	opacity: 1;

	@keyframes description-ghost-fade-in-out {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	&.error {
		animation: description-ghost-flash 600ms ease forwards;
		animation-delay: 100ms;

		@keyframes description-ghost-flash {
			0% {
				background-color: rgba(255, 255, 255, 0.05);
				border: 2px solid rgba(255, 255, 255, 0.4);
			}

			50% {
				background-color: rgba(241, 89, 42, 0.2);
			}

			100% {
				background-color: rgba(255, 255, 255, 0);
				border: 2px solid rgba(255, 255, 255, 0);
			}
		}
	}
`;

export const otherBallGhost = css`
	position: absolute;
	top: 0;
	left: calc(70% + 30px);
	width: calc(30% - 30px);
	height: 200px;
	background-color: rgba(255, 255, 255, 0.05);
	border-radius: 5px;
	border: 2px solid rgba(255, 255, 255, 0.4);
	animation: other-ghost-fade-in-out ease 3000ms infinite;
	opacity: 1;

	@keyframes other-ghost-fade-in-out {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	&.error {
		animation: other-ghost-flash 600ms ease forwards;
		animation-delay: 200ms;

		@keyframes other-ghost-flash {
			0% {
				background-color: rgba(255, 255, 255, 0.05);
				border: 2px solid rgba(255, 255, 255, 0.4);
			}

			50% {
				background-color: rgba(241, 89, 42, 0.2);
			}

			100% {
				background-color: rgba(255, 255, 255, 0);
				border: 2px solid rgba(255, 255, 255, 0);
			}
		}
	}
`;
