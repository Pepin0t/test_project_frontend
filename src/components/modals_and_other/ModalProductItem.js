import React, { Component } from "react";
import { connect } from "react-redux";

// styles
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

// icons
import { IconConstructor, closelIcon, leftArrowIcon, rightArrowIcon, spinner } from "../../images/SVG/icons.js";

// actions
import { getProductItemFullDescription, sendToCart } from "../../actions/productItemActions";

// styled components -------------------------

const cssTransitionName = "product-item-modal";

const ModalContainer = styled.div`
	position: fixed;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: center;
	left: 0;
	top: 0;
	overflow-x: hidden;
	overflow-y: auto;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 1000;

	&.${cssTransitionName}-enter {
		opacity: 0.01;
	}

	&.${cssTransitionName}-enter-active {
		opacity: 1;
		transition: all 250ms ease;
	}

	&.${cssTransitionName}-exit {
		opacity: 1;
	}

	&.${cssTransitionName}-exit-active {
		opacity: 0.01;
		transition: all 250ms ease;
	}
`;

const ModalWindow = styled.section`
	overflow-x: hidden;
	overflow-y: hidden;
	padding: 10px 20px 20px 20px;
	display: flex;
	flex-direction: column;
	min-height: calc(100vh - 60px);
	width: 1280px;
	margin: 30px;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 3px;
	z-index: 1000;

	@media (max-width: 620px) {
		margin: 0;
		border-radius: 0;
		min-height: 100vh;
		background-color: #fff;
	}
`;

const LoadingIcon = styled(IconConstructor).attrs({
	body: spinner,
	viewBox: "0 0 16 16"
})`
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

const Header = styled.header`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: 30px;
`;

const Title = styled.p`
	font-weight: 600;
	font-size: 20px;
	color: #959595;
`;

const Category = styled.p`
	font-size: 16px;
	color: #959595;
`;

const CloselIcon = styled(IconConstructor).attrs({
	body: closelIcon
})`
	fill: #959595;
`;

const CloseButton = styled.div`
	margin-right: -10px;
	display: flex;
	align-items: center;
	cursor: pointer;
	box-sizing: content-box;
	transition: all ease 250ms;
	height: 30px;

	:hover ${CloselIcon} {
		fill: #f1592a;
	}
`;

const Main = styled.div`
	margin-top: 25px;
	margin-bottom: auto;
	width: 100%;
`;

const Description = styled.div`
	font-size: 18px;
`;

const ImageContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	height: 50vh;
	width: 100%;
	margin: 25px 0;

	@media (max-width: 620px) {
		height: 100%;
		flex-direction: column;
	}
`;

const Img = styled.img.attrs({
	alt: "Изображение потерялось..."
})`
	display: block;
	max-height: 100%;
	border-radius: 5px;

	@media (max-width: 620px) {
		max-width: 100%;
	}
`;

const LeftArrowIcon = styled(IconConstructor).attrs({
	body: leftArrowIcon,
	viewBox: "-8 -8 48 48"
})`
	fill: #959595;
	transition: all ease 150ms;

	border-radius: 20px;
	height: 40px;
	width: 40px;

	@media (max-width: 620px) {
		fill: #cccccc;
		margin-left: 15px;
	}
`;

const RightArrowIcon = styled(IconConstructor).attrs({
	body: rightArrowIcon,
	viewBox: "-8 -8 48 48"
})`
	fill: #959595;
	transition: all ease 150ms;
	border-radius: 20px;
	height: 40px;
	width: 40px;

	@media (max-width: 620px) {
		fill: #cccccc;
		margin-right: 15px;
	}
`;

const PreviousImageButton = styled.div`
	position: absolute;
	cursor: pointer;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	left: 0;
	height: 100%;
	width: 50px;
	transition: all ease 150ms;

	:hover ${LeftArrowIcon} {
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
	}

	@media (max-width: 620px) {
		background-color: transparent;
		width: 50%;

		:hover ${LeftArrowIcon} {
			box-shadow: none;
			background-color: #fff;
			opacity: 0.3;
		}
	}
`;

const NextImageButton = styled.div`
	position: absolute;
	cursor: pointer;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	right: 0;
	height: 100%;
	width: 50px;
	transition: all ease 150ms;

	:hover ${RightArrowIcon} {
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
	}

	@media (max-width: 620px) {
		background-color: transparent;
		width: 50%;

		:hover ${RightArrowIcon} {
			box-shadow: none;
			background-color: #fff;
			opacity: 0.3;
		}
	}
`;

const ImageCounter = styled.div`
	width: 100%;
	text-align: center;
	font-size: 16px;
	color: #959595;
`;

const Footer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
	margin-top: 20px;

	@media (max-width: 480px) {
		flex-direction: column;
		align-items: center;
	}
`;

const Price = styled.div`
	font-weight: 600;
	font-size: 16px;
`;

const BuyButton = styled.div`
	width: 200px;
	height: 40px;
	cursor: pointer;
	pointer-events: ${props => (props.alreadyInCart ? "none" : "auto")};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	border-radius: 5px;
	color: #fff;
	background-color: ${props => (props.alreadyInCart ? "#70bc7b" : "#f1592a")};
	transition: background-color ease 100ms;

	:hover {
		background-color: #70bc7b;
	}

	@media (max-width: 480px) {
		margin-top: 20px;
	}
`;

const Attention = styled.div`
	margin: auto;
	font-size: 16px;
	font-weight: 600;
`;

// -------------------------------------------
class Modal extends Component {
	constructor(props) {
		super(props);

		this.closeButton = React.createRef();

		this.state = {
			imageNumber: 0,
			imageAmount: 0,
			modal: false
		};
	}

	componentDidMount() {
		// redux actions
		const { getProductItemFullDescription } = this.props;

		getProductItemFullDescription(this.props.match.params.productId);

		this.setState({
			modal: true
		});
	}

	static getDerivedStateFromProps(props) {
		if (Object.keys(props.fullDescription).length) {
			return {
				imageAmount: props.fullDescription.img[1].length
			};
		} else {
			return null;
		}
	}

	onDefaultState = () => {
		this.setState({
			imageNumber: 0,
			imageAmount: 0
		});
	};

	onPreviousImage = () => {
		// state
		let { imageAmount, imageNumber } = this.state;

		if (imageAmount && imageNumber > 0) {
			this.setState({
				imageNumber: --imageNumber
			});
		}
	};

	onNextImage = () => {
		// state
		let { imageAmount, imageNumber } = this.state;

		if (imageAmount && imageNumber < imageAmount - 1) {
			this.setState({
				imageNumber: ++imageNumber
			});
		}
	};

	onCloseModal = e => {
		if (e.currentTarget === e.target || e.currentTarget === this.closeButton.current) {
			this.setState({
				modal: false
			});
		}
	};

	onSendToCart = () => {
		// redux props
		const { fullDescription, currency } = this.props;

		// redux actions
		const { sendToCart } = this.props;

		sendToCart(fullDescription, currency);
	};

	render() {
		const Fragment = React.Fragment;

		// redux props
		const { alreadyInCart, loading, error } = this.props;
		const { img, title, body, category, productId, price } = this.props.fullDescription;

		// state
		const { imageAmount, imageNumber, modal } = this.state;

		return (
			<CSSTransition
				in={modal}
				classNames={cssTransitionName}
				timeout={250}
				onExited={() => {
					this.onDefaultState();

					// !! доделать
					this.props.history.push("/goods");
				}}
				unmountOnExit
			>
				<ModalContainer onClick={this.onCloseModal}>
					<ModalWindow>
						{loading ? (
							<LoadingIcon />
						) : (
							<Fragment>
								<Header>
									<Title>{title}</Title>

									{!error && (
										<Fragment>
											<Category>Категория: {category}</Category>
											<Category>Код товара: {productId}</Category>
										</Fragment>
									)}

									<CloseButton innerRef={this.closeButton} onClick={this.onCloseModal}>
										<CloselIcon />
									</CloseButton>
								</Header>
								{error ? (
									<Attention>{error}</Attention>
								) : (
									<Fragment>
										<ImageContainer>
											{img && <Img key={"full-image-" + productId} src={img[1][imageNumber]} />}
											<PreviousImageButton onClick={this.onPreviousImage}>
												<LeftArrowIcon />
											</PreviousImageButton>
											<NextImageButton onClick={this.onNextImage}>
												<RightArrowIcon />
											</NextImageButton>
										</ImageContainer>
										<ImageCounter>
											{imageNumber + 1} - {imageAmount}
										</ImageCounter>
										<Main>
											<Description>{body}</Description>
										</Main>
										<Footer>
											<Price>{price ? `Цена: ${price}` : "Цену уточняйте"}</Price>
											<BuyButton onClick={this.onSendToCart} alreadyInCart={alreadyInCart}>
												{alreadyInCart ? "Уже в корзине" : "В корзину"}
											</BuyButton>
										</Footer>
									</Fragment>
								)}
							</Fragment>
						)}
					</ModalWindow>
				</ModalContainer>
			</CSSTransition>
		);
	}
}

const mapStateToProps = store => ({
	alreadyInCart: store.productItem.alreadyInCart,
	fullDescription: store.productItem.fullDescription,
	loading: store.productItem.loading,
	error: store.productItem.error
});

export default connect(
	mapStateToProps,
	{ getProductItemFullDescription, sendToCart }
)(Modal);
