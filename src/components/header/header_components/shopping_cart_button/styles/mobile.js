import { css } from "styled-components";

export const cartButton = css`
	display: flex;
	align-items: center;
	box-sizing: content-box;
	padding: 0 15px;
	background-color: #f1592a;

	@media (max-width: 400px) {
		padding: 0 10px;
	}
`;

export const cartIcon = css`
	fill: #fff;
	transform: translateX(-2px);
`;
