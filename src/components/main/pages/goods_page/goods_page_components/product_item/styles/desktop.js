import { css } from "styled-components";

export const card = css`
	cursor: pointer;
	margin: 0 5px 30px 5px;
	border-bottom-left-radius: 15px;
	border-top-right-radius: 15px;
	width: 250px;
	transition: all ease 200ms;
	background-color: rgba(255, 255, 255, 0.8);
	overflow: hidden;

	:hover {
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
		background-color: rgba(255, 255, 255, 0.7);
	}
`;

export const styledLink = css`
	display: flex;
	flex-direction: column;
	text-decoration: none;
	color: black;
	padding: 15px;
	min-width: 100%;
	min-height: 100%;
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
	margin-top: -15px;
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
