import { css, keyframes } from "styled-components";

const bringToFront = cardTransform => keyframes`
	to {
		transform: ${cardTransform};
	}
`;

export const card = css`
	overflow: hidden;
	cursor: pointer;
	position: relative;
	margin: 0 5px 30px 5px;
	border: 1px solid var(--additional_color);
	border-radius: 0 15px 0 15px;
	width: 250px;
	transition: all ease 200ms;
	animation-fill-mode: forwards !important;

	::before {
		content: "";
		position: absolute;
		pointer-events: none;
		opacity: 0;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		transform-origin: 50% 50%;
		animation-fill-mode: forwards !important;
	}

	:hover {
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
		background-color: rgba(255, 255, 255, 0.7);
	}

	&.bring-to-front {
		pointer-events: none;
		z-index: 900;
		animation: ${props => bringToFront(props.styles.cardTransform)} 300ms ease;
	}

	&.white ::before {
		animation: white 300ms ease;

		@keyframes white {
			to {
				opacity: 1;
			}
		}
	}

	&.squeeze ::before {
		animation: squeeze 500ms ease;
		opacity: 1;

		@keyframes squeeze {
			to {
				transform: scale(0.1);
				top: calc((100% - 250px) / 2);
				height: 250px;
				border-radius: 50%;
				visibility: hidden;
			}
		}
	}

	&.return-to-place {
		animation: return-to-place 300ms ease;

		@keyframes return-to-place {
			to {
				transform: none;
			}
		}
	}

	&.stretch ::before {
		animation: stretch 300ms ease;

		@keyframes stretch {
			from {
				transform: scale(0.4);
				top: calc((100% - 250px) / 2);
				height: 250px;
				border-radius: 50%;
			}

			to {
				transform: none;
				height: 100%;
				top: 0;
				border-radius: none;
			}
		}
	}

	&.transparent ::before {
		animation: transparent 300ms ease;

		@keyframes transparent {
			to {
				opacity: 0;
			}
		}
	}
`;

export const innerContent = css`
	width: 100%;
	height: 100%;
	overflow: hidden;

	&.hide-content {
		visibility: hidden;
	}
`;

export const styledLink = css`
	display: flex;
	flex-direction: column;
	text-decoration: none;
	background-color: rgba(255, 255, 255, 0.8);
	color: black;
	padding: 15px;
	min-width: 100%;
	min-height: 100%;
`;

export const imageContainer = css`
	display: flex;
	justify-content: center;
	align-items: ${props => (props.loading ? "center" : "flex-start")};
	width: 100%;
	min-height: 200px;
`;

export const img = css`
	margin-bottom: 10px;
	min-width: calc(100% + 30px);
	max-width: calc(100% + 30px);
	margin-top: -15px;
`;

export const imageLoadingIcon = css`
	margin: auto;
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

export const title = css`
	margin-bottom: 5px;
`;

export const description = css`
	font-size: 16px;
	flex-grow: 1;
	-webkit-text-size-adjust: none;
`;

export const footer = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
`;

export const price = css`
	margin-top: 15px;
	font-weight: 600;
`;

export const alreadyInCart = css`
	font-size: 16px;
	color: #70bc7b;
`;
