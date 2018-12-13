import { css } from "styled-components";

export const container = css`
	display: flex;
	flex-direction: column;
	padding: 15px;
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
	margin: 15px 0;
	padding: 15px;
`;

export const exchangeRatesTitle = css`
	margin: 0 auto;
	font-weight: 600;
`;

export const exchangeRatesList = css`
	margin-top: 15px;
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
	height: 40px;
	width: 300px;
	border: none;
	border-radius: 5px;
	margin-top: auto;
	cursor: pointer;
	pointer-events: ${props => (props.waiting ? "none" : "auto")};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	color: #fff;
	background-color: #70bc7b;
`;

export const exchangeRatesMessageToAdmin = css`
	width: 100%;
	text-align: center;
	margin: auto;
`;
