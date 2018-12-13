import { css } from "styled-components";

export const container = css`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
`;

export const sidebar = css`
	position: relative;
	padding-top: 30px;
	padding-left: 15px;
	min-width: ${props => props.theme.sidebarWidth + "px"};
	max-width: ${props => props.theme.sidebarWidth + "px"};
	height: 100%;
	box-shadow: 15px -5px 15px -15px rgba(0, 0, 0, 0.5);
	background-color: rgba(255, 255, 255, 0.6);
`;

export const category = css`
	cursor: pointer;
	height: 30px;
	margin-bottom: 15px;
	text-decoration: none;
	color: black;
	font-size: 18px;
	font-weight: 600;

	:hover {
		color: #f1592a;
	}
`;

export const hideSidebarButton = css`
	display: none;
`;

export const leftArrowIcon = css`
	display: none;
`;

export const itemListContainer = css`
	padding: 30px 15px 15px 15px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-content: flex-start;
	flex-wrap: wrap;
	min-width: ${props => "calc(100% - " + props.theme.sidebarWidth + "px)"};
	overflow-x: hidden;
	overflow-y: auto;
`;

export const footer = css`
	width: 100%;
	height: 170px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const getMoreButton = css`
	width: 100px;
	height: 100px;
	cursor: pointer;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	font-size: 12px;
	border-radius: 50px;
	color: #959595;
	background-color: rgba(255, 255, 255, 0.8);
	transition: all ease 100ms;
	box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);

	:hover {
		background-color: #70bc7b;
		color: #fff;
	}
`;

export const loadingIcon = css`
	margin: 0 auto;
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

export const attention = css`
	margin: 20px auto;
	font-size: 16px;
	font-weight: 600;
`;

export const emptyCell = css`
	width: ${props => props.theme.sidebarWidth + 90 + "px"};
	max-height: 0;
	margin: 0 5px;
`;

export const arrowToTopButton = css`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	left: ${props => (props.fullscreen ? "30px" : "calc((100vw - 1280px) / 2 + 15px)")};
	bottom: ${props => (props.fullscreen ? "45px" : "100px")};
	width: ${props => "calc(" + props.theme.sidebarWidth + "px - 30px)"};
	height: 40px;
	background-color: #f1592a;
	opacity: 0.5;
	color: #fff;
	border-radius: 20px;
	transition: all 250ms ease;
	z-index: 1000;

	:hover {
		opacity: 1;
	}

	&.arrow-enter {
		opacity: 0;
	}

	&.arrow-enter-active {
		opacity: 0.5;
		transition: all 250ms ease;
	}

	&.arrow-exit {
		opacity: 0.5;
	}

	&.arrow-exit-active {
		opacity: 0;
		transition: all 250ms ease;
	}

	@media (min-width: 1921px) {
		left: ${props => (props.fullscreen ? "calc((100vw - 1920px) / 2 + 15px)" : "calc((100vw - 1280px) / 2 + 15px)")};
	}
`;
