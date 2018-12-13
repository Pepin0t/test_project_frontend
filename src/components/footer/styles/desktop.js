import { css } from "styled-components";

export const footerWrapper = css`
	position: absolute;
	min-height: 50px;
	flex-grow: 0;
	width: 100%;
	background-color: ${props => props.theme.themeColor(0.7)};
	box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.5);
	z-index: 5;
	bottom: ${props => (props.fullscreen ? "-50px" : 0)};
	transition: bottom ease 250ms;
`;

export const footerContainer = css`
	position: static;
	padding-left: 15px;
	padding-right: 15px;
	width: 1280px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

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
	transition: fill ease 300ms;

	:hover {
		fill: #3b5998;
	}
`;

export const vkIcon = css`
	margin-left: 15px;
	fill: #fff;
	transition: fill ease 300ms;

	:hover {
		fill: #45668e;
	}
`;

export const instIcon = css`
	margin-left: 15px;
	fill: #fff;
	transition: fill ease 300ms;

	:hover {
		fill: #f77737;
	}

	#back {
		fill: #fff;
		transition: fill-opacity ease 300ms;
	}

	:hover #back {
		fill-opacity: 1;
	}
`;
