import { css } from "styled-components";

export const settingsIcon = css`
	fill: #fff;
`;

export const button = css`
	display: flex;
	align-items: center;
	cursor: pointer;
	box-sizing: content-box;
	padding: 0 15px;
	transition: background-color ease 250ms;

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;
