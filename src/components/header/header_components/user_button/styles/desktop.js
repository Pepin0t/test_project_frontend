import { css } from "styled-components";

export const userButton = css`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 15px;
	transition: background-color 250ms ease;

	::before {
		content: "";
		pointer-events: none;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0);
		z-index: 1000;
	}

	&.dark-screen::before {
		animation: dark-screen 300ms ease;

		@keyframes dark-screen {
			from {
				background-color: rgba(0, 0, 0, 0);
			}

			to {
				background-color: rgba(0, 0, 0, 1);
			}
		}
	}

	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

export const userIcon = css`
	fill: #fff;
`;
