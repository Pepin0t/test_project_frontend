import { css } from "styled-components";

export const modalContainer = css`
	position: fixed;
	left: 0;
	top: 0;
	overflow-x: hidden;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 1000;

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
	overflow-x: hidden;
	overflow-y: hidden;
	padding: 10px 20px 20px 20px;
	display: flex;
	flex-direction: column;
	min-height: calc(100vh - 60px);
	width: calc(100% - 60px);
	margin: 30px auto;
	background-color: #fff;
	border-radius: 3px;
	z-index: 1000;

	@media (max-width: 620px) {
		margin: 0;
		border-radius: 0;
		min-height: 100vh;
		width: 100%;
	}
`;

export const loadingIcon = css`
	margin: auto;
	fill: #959595;
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

export const header = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: 30px;

	::after {
		content: "";
		min-width: 30px;
	}

	@media (max-width: 620px) {
		flex-direction: column;
		align-items: flex-start;
		height: 50px;
	}
`;

export const title = css`
	font-weight: 600;
	font-size: 20px;
	color: #959595;
`;

export const category = css`
	font-size: 16px;
	color: #959595;

	@media (max-width: 620px) {
		font-size: 14px;
		padding: 5px 0;
	}
`;

export const closelIcon = css`
	fill: #959595;
`;

export const closeButton = css`
	position: absolute;
	right: 10px;
	display: flex;
	align-items: center;
	box-sizing: content-box;
	height: 30px;
`;

export const main = css`
	margin-top: 25px;
	margin-bottom: auto;
	width: 100%;
`;

export const description = css`
	font-size: 18px;

	@media (max-width: 620px) {
		font-size: 14px;
		text-align: justify;
	}
`;

export const imageContainer = css`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	height: 50vh;
	width: 100%;
	margin: 25px 0;

	@media (max-width: 620px) {
		height: 100%;
		flex-direction: column;
	}
`;

export const img = css`
	display: block;
	max-height: 100%;
	border-radius: 5px;

	@media (max-width: 620px) {
		max-width: 100%;
	}
`;

export const leftArrowIcon = css`
	fill: #959595;
	border-radius: 20px;
	height: 40px;
	width: 40px;

	@media (max-width: 620px) {
		fill: #cccccc;
		margin-left: 15px;
	}
`;

export const rightArrowIcon = css`
	fill: #959595;
	border-radius: 20px;
	height: 40px;
	width: 40px;

	@media (max-width: 620px) {
		fill: #cccccc;
		margin-right: 15px;
	}
`;

export const previousImageButton = css`
	position: absolute;
	cursor: pointer;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	left: 0;
	height: 100%;
	width: 50px;

	@media (max-width: 620px) {
		background-color: transparent;
		width: 50%;
	}
`;

export const nextImageButton = css`
	position: absolute;
	cursor: pointer;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	right: 0;
	height: 100%;
	width: 50px;

	@media (max-width: 620px) {
		background-color: transparent;
		width: 50%;
	}
`;

export const imageCounter = css`
	width: 100%;
	text-align: center;
	font-size: 16px;
	color: #959595;
`;

export const otherBallFooter = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
	margin-top: 20px;

	@media (max-width: 480px) {
		flex-direction: column;
		align-items: center;
	}
`;

export const price = css`
	font-weight: 600;
	font-size: 16px;
`;

export const buyButton = css`
	width: 200px;
	height: 40px;
	pointer-events: ${props => (props.alreadyInCart ? "none" : "auto")};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	border-radius: 5px;
	color: #fff;
	background-color: ${props => (props.alreadyInCart ? "#70bc7b" : "#f1592a")};

	@media (max-width: 480px) {
		margin-top: 20px;
	}
`;

export const attention = css`
	margin: auto;
	font-size: 16px;
	font-weight: 600;
`;
