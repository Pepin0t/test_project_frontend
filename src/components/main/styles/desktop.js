import { css } from "styled-components";
import bg from "../../../images/background_21.jpg";

export const styledContent = css`
	position: absolute;
	left: ${props => (props.fullscreen ? "15px" : "calc((100vw - 1280px) / 2)")};
	top: ${props => (props.fullscreen ? "15px" : "65px")};
	width: ${props => (props.fullscreen ? "calc(100vw - 30px)" : "1280px")};
	height: ${props => (props.fullscreen ? "calc(100vh - 30px)" : "calc(100vh - 130px)")};
	overflow-x: hidden;
	overflow-y: hidden;
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	box-shadow: -5px 15px 20px rgba(0, 0, 0, 0.5);
	transition: all ease 250ms;

	@media (min-width: 1921px) {
		width: ${props => (props.fullscreen ? "1920px" : "1280px")};
		left: ${props => (props.fullscreen ? "calc((100vw - 1920px) / 2)" : "calc((100vw - 1280px) / 2)")};
	}
`;

export const background = css`
	position: absolute;
	left: -20px;
	width: 100vw;
	height: 100vh;
	background-image: url(${bg});
	background-size: cover;
	filter: blur(20px) saturate(30%);
	z-index: -1;
`;

export const header = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	min-height: 50px;
	z-index: 2;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
	background-color: ${props => props.theme.themeColor(0.2)};
`;

export const title = css`
	font-size: 24px;
	padding-left: 15px;
	display: flex;
	align-items: center;
	min-height: 100%;
	color: #fff;
	min-width: 160px;
`;

export const headerButtons = css`
	width: 100%;
	display: flex;
	justify-content: flex-end;
`;

export const fullscreenEnterIcon = css`
	fill: #fff;
`;

export const fullscreenExitIcon = css`
	fill: #fff;
`;

export const fullscreenToggleButton = css`
	padding: 0 15px;
	cursor: pointer;
	display: flex;
	align-items: center;
	transition: all ease 250ms;

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

export const body = css`
	width: 100%;
	height: calc(100% - 50px);
`;
