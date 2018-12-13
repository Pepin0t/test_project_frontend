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

	&.settings-enter {
		opacity: 0;
	}

	&.settings-enter-active {
		opacity: 1;
		transition: all 250ms ease;
	}

	&.settings-exit {
		opacity: 1;
	}

	&.settings-exit-active {
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
	height: 300px;
	width: 620px;
	margin: auto 0;
	background-color: #fff;
	border-radius: 3px;
	z-index: 1000;

	@media (max-width: 620px) {
		margin: 0;
		border-radius: 0;
		min-height: 100vh;
	}
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
`;

export const closelIcon = css`
	fill: #959595;
`;

export const closeButton = css`
	margin-right: -10px;
	display: flex;
	align-items: center;
	box-sizing: content-box;
	height: 30px;
	background-color: #fff;
`;

export const main = css`
	margin-bottom: auto;
	width: 100%;
`;

export const currencyContainer = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
	margin-top: 15px;
	padding-bottom: 15px;
	padding-top: 15px;
	border-bottom: 1px solid #959595;
	border-top: 1px solid #959595;
`;

export const currencyTitle = css`
	/* // */
`;

export const currencyButton = css`
	width: 100px;
	height: 40px;
	border: none;
	color: #fff;
	background-color: ${props => (props.active ? "#f1592a" : "#959595")};
	pointer-events: ${props => (props.active ? "none" : "auto")};
	border-radius: 5px;
`;

// export const languageContainer = css`
// 	/* // */
// `;
