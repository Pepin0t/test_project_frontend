import { css } from "styled-components";

export const wrapper = css`
	width: 100%;
	height: 100%;
	padding: 15px;
	overflow-x: hidden;
	overflow-y: auto;
`;

export const container = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`;

export const productItemAddingContainer = css`
	overflow: hidden;
	display: flex;
	flex-direction: column;
	width: calc(100% - 415px);
	padding: 15px;
	background-color: #fff;
	border: 1px solid #959595;
	border-radius: 5px;
`;

export const productItemAddingTitle = css`
	width: 100%;
	height: 40px;
	font-size: 16px;
	font-weight: 600;
	text-align: center;
`;

export const label = css`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15px;
	width: 100%;
`;

export const productItemInput = css`
	position: relative;
	width: calc(100% - 150px);
	height: 30px;
	border: 1px solid #959595;
	border-radius: 5px;
	font-size: 16px;
	padding: 5px;
	transition: transform 200ms ease;
	transform-origin: 0 0;

	:disabled {
		transform: scaleX(0);
		background-color: #fff;
	}
`;

export const productItemAvailableCategoriesContainer = css`
	position: relative;
	height: 30px;
	min-width: 200px;
	margin: 0 15px 0 50px;
	z-index: 100;
`;

export const productItemGetAvailableCategoriesButton = css`
	overflow: hidden;
	position: relative;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	background-color: #70bc7b;
	color: #fff;
	font-size: 16px;
	border: none;
	border-radius: 5px;

	::before {
		content: "Поиск...";
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #f1592a;
		color: #fff;
		transform: translateY(-100%);
		transform-origin: 0 0;
		transition: transform 300ms ease;
	}

	::after {
		content: "";
		position: absolute;
		height: 200%;
		width: 20px;
		transform: translateX(-30px) rotate(20deg);
		left: 0;
		background-color: rgba(255, 255, 2550, 0.2);
	}

	&.waiting {
		pointer-events: none;
	}

	&.waiting ::before {
		transform: translateY(0);
	}

	&.waiting ::after {
		animation: get-available-categories-waiting 1000ms ease infinite;

		@keyframes get-available-categories-waiting {
			0% {
				transform: translateX(-30px) rotate(20deg);
			}

			100% {
				transform: translateX(210px) rotate(20deg);
			}
		}
	}
`;

export const productItemAvailableCategoriesList = css`
	position: absolute;
	top: 40px;
	width: 100%;
	padding: 5px;
	background-color: #fff;
	border: 1px solid #959595;
	border-radius: 5px;
	list-style: none;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
`;

export const productItemAddCategoryButton = css`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 30px;
	min-width: 30px;
	margin-right: 15px;
	background-color: #70bc7b;
	color: #fff;
	font-size: 20px;
	border: none;
	border-radius: 5px;
`;

export const productItemAddImageButton = css`
	overflow: hidden;
	position: relative;
	left: 28px;
	width: 60px;
	height: 60px;
	background-color: #fff;
	border: 1px solid #959595;
	border-radius: 5px;
	margin-right: auto;
	transition: all 100ms ease;

	::before {
		position: absolute;
		content: "+";
		font-size: 50px;
		text-align: center;
		color: #959595;
		width: 100%;
		top: 5px;
		transition: color 100ms ease;
	}

	:hover {
		background-color: #70bc7b;
		border: 1px solid #fff;
	}

	:hover::before {
		color: #fff;
	}
`;

export const productItemAddImageInput = css`
	cursor: pointer;
	transform: translateY(-50%);
	height: 200%;
	width: 100%;
`;

export const productItemImagesPreviewWrapper = css`
	width: 100%;
	background-color: #fff;
`;

export const productItemImagePreviewContainer = css`
	cursor: pointer;
	overflow: hidden;
	position: relative;
	display: inline-block;
	height: 60px;
	width: auto;
	margin-right: 15px;
	margin-bottom: 15px;
	border-radius: 5px;

	:hover > :nth-child(2) {
		background-color: rgba(0, 0, 0, 0.6);
		color: rgba(255, 255, 255, 0.8);
	}

	&.product-image-preview-enter {
		animation: animation-enter 400ms ease forwards;
	}

	&.product-image-preview-exit {
		animation: animation-exit 400ms ease forwards;
	}

	@keyframes animation-enter {
		0% {
			transform: scale(0);
			border-radius: 50%;
		}

		70% {
			transform: scale(1.1);
			border-radius: 5px;
		}

		100% {
			transform: scale(1);
			border-radius: 5px;
		}
	}

	@keyframes animation-exit {
		0% {
			transform: scale(1);
			border-radius: 5px;
		}

		30% {
			transform: scale(1.1);
			border-radius: 5px;
			opacity: 1;
		}

		100% {
			transform: scale(0);
			border-radius: 50%;
			opacity: 0;
		}
	}
`;

export const productItemImagePreview = css`
	height: 100%;
`;

export const productItemImagePreviewDeleteButton = css`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	right: 0;
	width: 25px;
	height: 25px;
	background-color: rgba(0, 0, 0, 0);
	color: rgba(255, 255, 255, 0);
	border-bottom-left-radius: 5px;
	font-size: 20px;
	transition: all 100ms ease;
`;

export const productItemDescription = css`
	position: relative;
	width: calc(100% - 150px);
	top: 0;
	height: 300px;
	border: 1px solid #959595;
	border-radius: 5px;
	font-size: 16px;
	padding: 5px;
	resize: none;
`;

export const productItemControls = css`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
`;

export const productItemCreateButton = css`
	position: relative;
	overflow: hidden;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #70bc7b;
	color: #fff;
	font-size: 16px;
	width: 200px;
	height: 40px;
	border: none;
	border-radius: 5px;
	transition: background-color 200ms ease;

	::before {
		content: "Подождите...";
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #f1592a;
		color: #fff;
		transform: translateY(-100%);
		transform-origin: 0 0;
		transition: transform 300ms ease;
	}

	::after {
		content: "";
		position: absolute;
		height: 200%;
		width: 20px;
		transform: translateX(-30px) rotate(20deg);
		left: 0;
		background-color: rgba(255, 255, 2550, 0.2);
	}

	:enabled {
		animation: enabled-button 300ms ease;

		@keyframes enabled-button {
			0% {
				transform: scale(1);
			}

			50% {
				transform: scale(1.1);
			}

			100% {
				transform: scale(1);
			}
		}
	}

	:disabled {
		pointer-events: none;
		background-color: #959595;
	}

	&.waiting {
		pointer-events: none;
	}

	&.waiting ::before {
		transform: translateY(0);
	}

	&.waiting ::after {
		animation: create-product-item-waiting 1000ms ease infinite;

		@keyframes create-product-item-waiting {
			0% {
				transform: translateX(-30px) rotate(20deg);
			}

			100% {
				transform: translateX(210px) rotate(20deg);
			}
		}
	}
`;

export const productItemCreateStyledLink = css`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 150px;
	height: 40px;
	background-color: #70bc7b;
	border-radius: 5px;
	color: #fff;
	text-decoration: none;
`;

export const productItemCreateResultMessage = css`
	/* // */
`;

export const exchangeRatesContainer = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 250px;
	width: 400px;
	background-color: #fff;
	border: 1px solid #959595;
	border-radius: 5px;
	padding: 15px;
`;

export const exchangeRatesTitle = css`
	width: 100%;
	height: 40px;
	font-size: 16px;
	font-weight: 600;
	text-align: center;
`;

export const exchangeRatesList = css`
	width: 100%;
	list-style: none;
`;

export const exchangeRatesWaitingIcon = css`
	margin: 0 auto;
	animation: rotating 1.5s linear infinite;

	@keyframes rotating {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

export const updateExchangeRatesButton = css`
	position: relative;
	overflow: hidden;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #70bc7b;
	color: #fff;
	height: 40px;
	width: 300px;
	margin-top: auto;
	font-size: 16px;
	border: none;
	border-radius: 5px;

	::before {
		content: "Подождите...";
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #f1592a;
		color: #fff;
		transform: translateY(-100%);
		transform-origin: 0 0;
		transition: transform 300ms ease;
	}

	::after {
		content: "";
		position: absolute;
		height: 200%;
		width: 20px;
		transform: translateX(-30px) rotate(20deg);
		left: 0;
		background-color: rgba(255, 255, 2550, 0.2);
	}

	&.waiting {
		pointer-events: none;
	}

	&.waiting ::before {
		transform: translateY(0);
	}

	&.waiting ::after {
		animation: update-exchange-rates-waiting 1000ms ease infinite;

		@keyframes update-exchange-rates-waiting {
			0% {
				transform: translateX(-30px) rotate(20deg);
			}

			100% {
				transform: translateX(310px) rotate(20deg);
			}
		}
	}
`;

export const exchangeRatesMessageToAdmin = css`
	width: 100%;
	text-align: center;
	margin: auto;
`;
