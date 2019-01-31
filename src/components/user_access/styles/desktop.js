import { css } from "styled-components";

export const darkScreen = css`
	position: fixed;
	left: 0;
	top: 0;
	padding: 15px;
	font-size: 16px;
	text-align: start;
	width: 100%;
	height: 100%;
	color: #fff;
	background-color: rgba(0, 0, 0, 1);
	opacity: 1;
	z-index: 1000;

	&.black-out {
		animation: black-out 300ms ease;

		@keyframes black-out {
			from {
				opacity: 0;
			}

			to {
				opacity: 1;
			}
		}
	}

	&.complete {
		animation: complete 300ms ease;

		@keyframes complete {
			from {
				opacity: 1;
			}

			to {
				opacity: 0;
			}
		}
	}
`;
