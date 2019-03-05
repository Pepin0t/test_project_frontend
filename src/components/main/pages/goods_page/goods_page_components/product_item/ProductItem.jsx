import React, { Component, Suspense, useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import queryString from "query-string";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { spinner, IconConstructor } from "../../../../../../images/SVG/icons";

// images
import imageNotFound from "../../../../../../images/image-not-found.png";

// actions
import { openModal } from "../../../../../../actions/productItemActions";

// utils
import { shoppingCart } from "../../../../../../utils/shopping_cart/";

const SERVER_URL = process.env.NODE_ENV === "production" ? process.env.SERVER_URL : "http://localhost:5000";

class ProductItem extends Component {
	constructor(props) {
		super(props);

		this.card = React.createRef();
		this.innerContent = React.createRef();

		this.state = {
			loading: true,
			coverImage: null,
			alreadyInCart: shoppingCart.check(props.productId, props.cookies),
			styles: {}
		};
	}

	static propTypes = {
		openModal: PropTypes.func,
		productImages: PropTypes.object,
		cookies: PropTypes.instanceOf(Cookies),
		title: PropTypes.string,
		description: PropTypes.string,
		category: PropTypes.string,
		price: PropTypes.string,
		productId: PropTypes.string
	};

	componentDidMount() {
		// image loading ----------------------

		// simple props
		const { productImages } = this.props;

		const downloadingImage = new Image();

		downloadingImage.onload = () => {
			this.setState({
				loading: false,
				coverImage: downloadingImage.src
			});
		};

		downloadingImage.onerror = () => {
			this.setState({
				loading: false,
				coverImage: imageNotFound
			});
		};

		downloadingImage.src = SERVER_URL + productImages.cover;

		// -------------------------------------
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		// simple props
		const { productId, cookies } = nextProps;

		const alreadyInCart = shoppingCart.check(productId, cookies);

		if (alreadyInCart !== prevState.alreadyInCart) {
			return {
				alreadyInCart
			};
		}

		return null;
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.state.loading ||
			this.state.alreadyInCart !== nextState.alreadyInCart ||
			this.props.price !== nextProps.price ||
			this.state.styles.cardTransform !== nextState.styles.cardTransform
		) {
			return true;
		} else return false;
	}

	modalWillOpen = () => {
		this.card.current.addEventListener("animationend", this.nextAnimation);
		this.innerContent.current.addEventListener("animationend", this.nextAnimation);

		this.animationStepCounter = (() => {
			let step = 1;
			return () => step++;
		})();

		const modalDidClose = () => {
			this.modalDidClose();
		};

		function* open(resolve) {
			yield resolve(modalDidClose);
		}

		this.props.openModal(
			new Promise(resolve => {
				this.open = open(resolve);
			})
		);
		this.nextAnimation();
	};

	modalDidClose = () => {
		this.animationStepCounter = (() => {
			let step = -1;
			return () => step--;
		})();

		this.nextAnimation();
	};

	nextAnimation = () => {
		const step = this.animationStepCounter();

		if (step > 0) {
			// animation enter
			switch (step) {
				case 1: {
					const elementTop = this.card.current.getBoundingClientRect().top;
					const elementLeft = this.card.current.getBoundingClientRect().left;
					const elementHeight = this.card.current.clientHeight;
					const elementWidth = this.card.current.clientWidth;

					const centerX = window.innerWidth / 2 - elementWidth / 2 - elementLeft;
					const centerY = window.innerHeight / 2 - elementHeight / 2 - elementTop;

					this.setState(
						{
							styles: { cardTransform: `translate(${centerX}px, ${centerY}px)` }
						},
						() => {
							this.card.current.classList.add("bring-to-front", "white");
						}
					);
					break;
				}
				case 2:
					this.innerContent.current.classList.add("hide-content");
					break;
				default: {
					this.card.current.classList.add("squeeze");
					this.open.next();
				}
			}
		} else {
			switch (step) {
				// animation exit
				case -1: {
					this.card.current.classList.remove("bring-to-front");
					this.card.current.classList.add("return-to-place");
					break;
				}
				case -2: {
					this.card.current.classList.add("stretch");
					break;
				}
				case -3: {
					this.innerContent.current.classList.remove("hide-content");
					this.card.current.classList.add("transparent");
					break;
				}
				default: {
					delete this.open;
					delete this.animationStepCounter;

					this.card.current.removeEventListener("animationend", this.nextAnimation);
					this.innerContent.current.removeEventListener("animationend", this.nextAnimation);

					this.card.current.classList.remove("white", "squeeze", "return-to-place", "stretch", "transparent");
				}
			}
		}
	};

	cutDescription = description => {
		if (description.length > 100) {
			description = description
				.slice(0, 100)
				.trim()
				.split(" ");
			description.pop();
			description = description.join(" ").replace(/[^a-zA-Zа-яА-ЯёЁ0-9]+$/, "") + "...";
		}
		return description;
	};

	render() {
		let description = this.cutDescription(this.props.description);

		// simple props
		const { title, price, category, productId } = this.props;

		// state
		const { loading, alreadyInCart, coverImage, styles } = this.state;

		return (
			<Card ref={this.card} onClick={this.modalWillOpen} styles={styles}>
				<InnerContent ref={this.innerContent}>
					<StyledLink
						to={{
							pathname: "/content/goods/modal",
							search: queryString.stringify({ type: "product-item", category, productId })
						}}
					>
						<ImageContainer loading={loading}>{loading ? <ImageLoadingIcon /> : <Img src={coverImage} />}</ImageContainer>
						<Title>{title}</Title>
						<Description>{description}</Description>
						<Footer>
							<Price>{price ? `Цена: ${price}` : "Цену уточняйте"}</Price>
							{alreadyInCart && <AlreadyInCart>в корзине</AlreadyInCart>}
						</Footer>
					</StyledLink>
				</InnerContent>
			</Card>
		);
	}
}

export default connect(
	null,
	{ openModal }
)(ProductItem);

// styled-components --------------------------

const Card = styled.section`
	${props => (props.theme.desktop ? desktop.card : mobile.card)};
`;

const InnerContent = styled.div`
	${props => (props.theme.desktop ? desktop.innerContent : mobile.innerContent)};
`;

const StyledLink = styled(Link)`
	${props => (props.theme.desktop ? desktop.styledLink : mobile.styledLink)};
`;

const ImageContainer = styled.div`
	${props => (props.theme.desktop ? desktop.imageContainer : mobile.imageContainer)};
`;

const Img = styled.img.attrs({
	alt: "Not found"
})`
	${props => (props.theme.desktop ? desktop.img : mobile.img)};
`;

const ImageLoadingIcon = styled(IconConstructor).attrs({
	body: spinner,
	viewBox: "0 0 16 16"
})`
	${props => (props.theme.desktop ? desktop.imageLoadingIcon : mobile.imageLoadingIcon)};
`;

const Title = styled.h2`
	${props => (props.theme.desktop ? desktop.title : mobile.title)};
`;

const Description = styled.p`
	${props => (props.theme.desktop ? desktop.description : mobile.description)};
`;

const Footer = styled.div`
	${props => (props.theme.desktop ? desktop.footer : mobile.footer)};
`;

const Price = styled.p`
	${props => (props.theme.desktop ? desktop.price : mobile.price)};
`;

const AlreadyInCart = styled.p`
	${props => (props.theme.desktop ? desktop.alreadyInCart : mobile.alreadyInCart)};
`;

// --------------------------------------------
