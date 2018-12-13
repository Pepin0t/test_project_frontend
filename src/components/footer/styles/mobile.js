import { css } from "styled-components";

export const footerWrapper = css`
	min-height: 50px;
	width: 100%;
	background-color: ${props => props.theme.themeColor(0.3)};
`;

export const footerContainer = css`
	padding-left: 15px;
	padding-right: 15px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

// не используется
export const socialIcons = css`
	height: 50px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const fbIcon = css`
	margin-left: 15px;
	fill: #fff;
`;

export const vkIcon = css`
	margin-left: 15px;
	fill: #fff;
`;

export const instIcon = css`
	margin-left: 15px;
	fill: #fff;
`;
