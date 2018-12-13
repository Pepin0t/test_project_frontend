import { css } from "styled-components";

export const container = css`
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: row;
`;

export const sidebar = css`
	position: ${props => (props.detachSidebar ? "fixed" : "absolute")};
	top: -70px;
	box-sizing: content-box;
	padding-top: 30px;
	padding-left: 15px;
	padding-bottom: 70px;
	min-width: ${props => props.theme.sidebarWidth + "px"};
	max-width: ${props => props.theme.sidebarWidth + "px"};
	height: 100vh;
	box-shadow: 15px -5px 15px -15px rgba(0, 0, 0, 0.5);
	background-color: rgba(255, 255, 255, 0.9);
	transition: transform 250ms ease;
	transform: ${props => (props.hideSidebar ? `translate(-${props.theme.sidebarWidth + 15}px, 70px)` : "translateY(70px)")};
	z-index: 6;

	@media (max-width: 460px), (orientation: landscape) {
		position: fixed;
		background-color: rgba(255, 255, 255, 1);
	}
`;

export const category = css`
	cursor: default;
	height: 30px;
	margin-bottom: 15px;
	text-decoration: none;
	color: black;
	font-size: 18px;
	font-weight: 600;

	@media (max-width: 460px), (orientation: landscape) {
		font-size: 14px;
	}
`;

export const hideSidebarButton = css`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	bottom: ${props => (props.hideSidebarButtonChangePosition ? "65px" : "15px")};
	left: 15px;
	width: 50px;
	height: 50px;
	border-radius: 25px;
	background-color: rgba(241, 89, 42, 0.8);
	color: #fff;
	z-index: 10;
	transform: ${props => (props.hideSidebar ? "rotate(180deg)" : "none")};
	transition: all ease 250ms;
`;

export const leftArrowIcon = css`
	fill: #fff;
	transition: all ease 150ms;
`;

export const itemListContainer = css`
	padding: 30px 15px 15px 15px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-content: flex-start;
	flex-wrap: wrap;
	min-width: 100%;
	overflow-x: hidden;
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
	cursor: default;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	font-size: 12px;
	border-radius: 50px;
	color: #fff;
	background-color: #70bc7b;
	box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
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
	display: none;
`;
