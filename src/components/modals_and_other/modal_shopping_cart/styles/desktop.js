import { css } from "styled-components";

export const modalContainer = css`
	position: fixed;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: center;
	left: 0;
	top: 0;
	overflow-x: hidden;
	overflow-y: auto;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 1000;

	&.shopping-cart-modal-enter {
		opacity: 0;
	}

	&.shopping-cart-modal-enter-active {
		opacity: 1;
		transition: all 250ms ease;
	}

	&.shopping-cart-modal-exit {
		opacity: 1;
	}

	&.shopping-cart-modal-exit-active {
		opacity: 0;
		transition: all 250ms ease;
	}
`;

export const modalWindow = css`
	overflow-x: hidden;
	overflow-y: hidden;
	padding: 10px 20px 20px 20px;
	display: flex;
	flex-direction: column;
	min-height: calc(100vh - 60px);
	width: ${props => (props.cartForm ? "620px" : "1280px")};
	margin: 30px;
	background-color: #fff;
	border-radius: 3px;
	z-index: 1000;
	transition: all ease 250ms;
`;

export const header = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: 30px;
	background-color: #fff;
`;

export const title = css`
	font-weight: 600;
	font-size: 20px;
	color: #959595;
	transition: all ease 500ms;
`;

export const closeIcon = css`
	fill: #959595;
`;

export const closeButton = css`
	margin-right: -10px;
	display: flex;
	align-items: center;
	cursor: pointer;
	box-sizing: content-box;
	transition: all ease 250ms;
	height: 30px;
	background-color: #fff;

	:hover > :first-child {
		fill: #f1592a;
	}
`;

export const main = css`
	margin-bottom: auto;
	width: 100%;
`;

export const list = css`
	margin-top: 15px;
	display: flex;
	flex-direction: column;
	width: 100%;
`;

// const collapse = keyframes`
// 	0% {
// 		background-color: #fff;
// 		transform: scale(1,1);
// 		width: 100%;
// 		/* height: 100px; */
// 	}

// 	50% {
// 		background-color: #f1592a;
// 		transform: scale(1,0.02);
// 		width: 100%;
// 		/* width: 100%; */
// 		/* height: 2px; */
// 	}

// 	100% {
// 		background-color: #f1592a;
// 		transform: scale(0,0.02);
// 		width: 0;
// 		display: none;
// 	}
// `;

// const addCollapseStyle = css`
// 	.collapse-exit {
// 		background-color: #f1592a;
// 		transform: scale(1, 0.02);
// 		width: 100%;
// 	}

// 	.collapse-exit-active {
// 		background-color: #f1592a;
// 		transform: scale(0, 0.02);
// 		width: 0;
// 		transition: all 1000ms ease-in;
// 	}
// `;

export const item = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 100px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	margin-bottom: 15px;

	&.collapse-exit {
		background-color: #f1592a;
		transform: scale(1, 0.02);
		width: 100%;
	}

	&.collapse-exit-active {
		background-color: #f1592a;
		transform: scale(0, 0.02);
		width: 0;
		transition: all 1000ms ease-in;
	}
`;

export const itemNumber = css`
	width: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	font-weight: 600;
	border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

export const itemTitle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
	border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

export const price = css`
	width: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

export const deleteItemButton = css`
	padding: 0 15px;
	cursor: pointer;
	background-color: #fff;
	color: #f1592a;
	border: none;
	font-size: 18px;
	font-weight: 600;
	transition: all 100ms ease;

	:hover {
		background-color: #f1592a;
		color: #fff;
	}
`;

export const form = css`
	width: 100%;
`;

export const formHeader = css`
	margin: 15px 0;
	color: #959595;
	text-align: center;
	transition: all ease 300ms;
`;

export const inputsContainer = css`
	width: 100%;
`;

export const label = css`
	display: block;
	color: #959595;
	transition: all ease 500ms;
`;

export const formInput = css`
	display: block;
	height: 30px;
	width: 100%;
	margin: 5px 0 15px 0;
	font-size: 16px;
`;

export const textArea = css`
	display: block;
	width: 100%;
	height: 200px;
	margin: 5px 0 15px 0;
	font-size: 16px;
	resize: none;
`;

export const empty = css`
	display: flex;
	font-size: 18px;
	justify-content: center;
`;

export const modalFooter = css`
	position: relative;
`;

export const buyButton = css`
	width: 200px;
	height: 40px;
	margin-left: ${props => (props.cartForm ? "calc(100% - 200px)" : 0)};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	border-radius: 5px;
	color: #fff;
	background-color: ${props => (props.cartForm ? "#0099FF" : "#f1592a")};
	transition: all ease 250ms;
	border: none;
	pointer-events: ${props => (props.waiting ? "none" : "auto")};

	:hover {
		background-color: #70bc7b;
	}
`;

export const returnToCartButton = css`
	position: absolute;
	width: 40px;
	height: 40px;
	padding-top: 5px;
	left: 0;
	bottom: 0;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30px;
	border-radius: 5px;
	border: none;
	background-color: #959595;
	color: #fff;
	transition: all ease 100ms;

	:hover {
		background-color: #f1592a;
	}
`;

export const waitingIcon = css`
	margin: 0 auto;
	fill: #fff;
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

export const messageToUser = css`
	width: 100%;
	text-align: center;
	margin: 15px 0;
`;
