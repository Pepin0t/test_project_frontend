import { css } from "styled-components";

export const card = css`
	cursor: default;
	margin: 0 5px 30px 5px;
	border-bottom-left-radius: 15px;
	border-top-right-radius: 15px;
	width: 250px;
	background-color: rgba(255, 255, 255, 0.8);
	overflow: hidden;

	@media (max-width: 1086px) {
		width: 300px;
	}

	@media (max-width: 976px) {
		width: 400px;
	}

	@media (max-width: 866px) {
		width: 350px;
	}

	@media (max-width: 766px) {
		width: 300px;
	}

	@media (max-width: 666px) {
		width: 100%;
	}

	@media (max-width: 666px) and (orientation: landscape) {
		width: 250px;
	}

	@media (max-width: 549px) {
		width: 100%;
	}
`;

export const styledLink = css`
	display: flex;
	flex-direction: column;
	text-decoration: none;
	color: black;
	padding: 0 15px 15px 15px;
	min-width: 100%;
	min-height: 100%;

	@media (max-width: 1086px) {
		padding: 15px;
	}
`;

export const imageContainer = css`
	display: flex;
	justify-content: center;
	align-items: ${props => (props.loading ? "center" : "flex-start")};
	width: 100%;
	min-height: 200px;
`;

export const img = css`
	margin-bottom: 10px;
	min-width: calc(100% + 30px);
	max-width: calc(100% + 30px);

	@media (max-width: 1086px) {
		min-width: 100%;
		max-width: 100%;
		border-top-right-radius: 10px;
	}
`;

export const imageLoadingIcon = css`
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

export const title = css`
	margin-bottom: 5px;
`;

export const description = css`
	font-size: 16px;
	flex-grow: 1;
	-webkit-text-size-adjust: none;

	@media (max-width: 320px), (max-width: 766px) and (orientation: landscape) {
		font-size: 14px;
	}
`;

export const footer = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
`;

export const price = css`
	margin-top: 15px;
	font-weight: 600;
`;

export const alreadyInCart = css`
	font-size: 16px;
	color: #70bc7b;
`;
