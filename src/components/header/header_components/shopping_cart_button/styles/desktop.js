import { css } from "styled-components";

export const cartButton = css`
	display: flex;
	align-items: center;
	cursor: pointer;
	box-sizing: content-box;
	padding: 0 15px;
	background-color: #f1592a;
	transition: background-color ease 250ms;

	:hover {
		background-color: #70bc7b;
	}
`;

export const cartIcon = css`
	fill: #fff;
	transform: translateX(-2px);
`;
