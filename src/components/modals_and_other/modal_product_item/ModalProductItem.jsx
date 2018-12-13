import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Cookies } from "react-cookie";

// styles
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, closelIcon, leftArrowIcon, rightArrowIcon, spinner } from "../../../images/SVG/icons.js";

// actions
import { getProductItemFullDescription } from "../../../actions/productItemActions";

//utils
import { shoppingCart } from "../../../utils/shopping_cart/";

const SERVER_URL = process.env.NODE_ENV === "production" ? process.env.SERVER_URL : "http://localhost:5000";

class Modal extends Component {
	constructor(props) {
		super(props);

		this.closeButton = React.createRef();

		this.state = {
			alreadyInCart: shoppingCart.check(props.match.params.productId, props.cookies),
			imageNumber: 0,
			imageAmount: 0,
			modal: false
		};
	}

	static propTypes = {
		getProductItemFullDescription: PropTypes.func,
		sendToCart: PropTypes.func,
		fullDescription: PropTypes.object,
		match: PropTypes.object,
		history: PropTypes.object,
		cookies: PropTypes.instanceOf(Cookies),
		loading: PropTypes.bool,
		error: PropTypes.string
	};

	componentDidMount() {
		this.setState(
			{
				modal: true
			},
			() => {
				// redux actions
				const { getProductItemFullDescription } = this.props;

				getProductItemFullDescription(this.props.match.params.productId);
			}
		);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const alreadyInCart = shoppingCart.check(nextProps.match.params.productId, nextProps.cookies);

		if (alreadyInCart !== prevState.alreadyInCart) {
			return {
				alreadyInCart
			};
		}

		if (Object.keys(nextProps.fullDescription).length) {
			return {
				imageAmount: nextProps.fullDescription.img[1].length
			};
		} else {
			return null;
		}
	}

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
		const { productId } = this.props.fullDescription;

		// redux actions
		const { cookies } = this.props;

		navigator.cookieEnabled ? shoppingCart.add(productId, cookies) : this.onDisplayCookiesWarning();
	};

	onDisplayCookiesWarning = () => {
		alert("Включи куки!");
	};

	onDefaultState = () => {
		this.setState({
			imageNumber: 0,
			imageAmount: 0
		});
	};

	render() {
		const Fragment = React.Fragment;

		// redux props
		const { loading, error } = this.props;
		const { img, title, body, category, productId, price } = this.props.fullDescription;

		// state
		const { alreadyInCart, imageAmount, imageNumber, modal } = this.state;

		return (
			<CSSTransition
				in={modal}
				classNames={"product-item-modal"}
				timeout={250}
				onExited={() => {
					this.onDefaultState();

					this.props.history.push("/goods");
				}}
				unmountOnExit
			>
				<ModalContainer onClick={this.onCloseModal}>
					<ModalWindow>
						<CloseButton ref={this.closeButton} onClick={this.onCloseModal}>
							<CloselIcon />
						</CloseButton>
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
								</Header>
								{error ? (
									<Attention>{error}</Attention>
								) : (
									<Fragment>
										<ImageContainer>
											{img && <Img key={"full-image-" + productId} src={SERVER_URL + img[1][imageNumber]} />}
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
	fullDescription: store.productItem.fullDescription,
	loading: store.productItem.loading,
	error: store.productItem.error
});

export default connect(
	mapStateToProps,
	{ getProductItemFullDescription }
)(Modal);

// styled components -------------------------

const ModalContainer = styled.div`
	${props => (props.theme.desktop ? desktop.modalContainer : mobile.modalContainer)};
`;

const ModalWindow = styled.section`
	${props => (props.theme.desktop ? desktop.modalWindow : mobile.modalWindow)};
`;

const LoadingIcon = styled(IconConstructor).attrs({
	body: spinner,
	viewBox: "0 0 16 16"
})`
	${props => (props.theme.desktop ? desktop.loadingIcon : mobile.loadingIcon)};
`;

const Header = styled.header`
	${props => (props.theme.desktop ? desktop.header : mobile.header)};
`;

const Title = styled.p`
	${props => (props.theme.desktop ? desktop.title : mobile.title)};
`;

const Category = styled.p`
	${props => (props.theme.desktop ? desktop.category : mobile.category)};
`;

const CloselIcon = styled(IconConstructor).attrs({
	body: closelIcon
})`
	${props => (props.theme.desktop ? desktop.closelIcon : mobile.closelIcon)};
`;

const CloseButton = styled.div`
	${props => (props.theme.desktop ? desktop.closeButton : mobile.closeButton)};
`;

const Main = styled.div`
	${props => (props.theme.desktop ? desktop.main : mobile.main)};
`;

const Description = styled.div`
	${props => (props.theme.desktop ? desktop.description : mobile.description)};
`;

const ImageContainer = styled.div`
	${props => (props.theme.desktop ? desktop.imageContainer : mobile.imageContainer)};
`;

const Img = styled.img.attrs({
	alt: "Изображение потерялось..."
})`
	${props => (props.theme.desktop ? desktop.img : mobile.img)};
`;

const LeftArrowIcon = styled(IconConstructor).attrs({
	body: leftArrowIcon,
	viewBox: "-8 -8 48 48"
})`
	${props => (props.theme.desktop ? desktop.leftArrowIcon : mobile.leftArrowIcon)};
`;

const RightArrowIcon = styled(IconConstructor).attrs({
	body: rightArrowIcon,
	viewBox: "-8 -8 48 48"
})`
	${props => (props.theme.desktop ? desktop.rightArrowIcon : mobile.rightArrowIcon)};
`;

const PreviousImageButton = styled.div`
	${props => (props.theme.desktop ? desktop.previousImageButton : mobile.previousImageButton)};
`;

const NextImageButton = styled.div`
	${props => (props.theme.desktop ? desktop.nextImageButton : mobile.nextImageButton)};
`;

const ImageCounter = styled.div`
	${props => (props.theme.desktop ? desktop.imageCounter : mobile.imageCounter)};
`;

const Footer = styled.div`
	${props => (props.theme.desktop ? desktop.footer : mobile.footer)};
`;

const Price = styled.div`
	${props => (props.theme.desktop ? desktop.price : mobile.price)};
`;

const BuyButton = styled.div`
	${props => (props.theme.desktop ? desktop.buyButton : mobile.buyButton)};
`;

const Attention = styled.div`
	${props => (props.theme.desktop ? desktop.attention : mobile.attention)};
`;

// -------------------------------------------
