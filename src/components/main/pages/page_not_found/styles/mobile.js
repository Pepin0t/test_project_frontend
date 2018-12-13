import { css } from "styled-components";

export const errorWrapper = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
`;

export const styledError404Img = css`
	width: 640px;

	@media (max-width: 670px) {
		width: calc(100% - 30px);
	}

	@media (max-width: 670px) and (orientation: landscape) {
		width: 50%;
	}
`;
