import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { spinner, IconConstructor } from "../../../../../../images/SVG/icons";

// images
import imageNotFound from "../../../../../../images/image-not-found.png";

// utils
import { shoppingCart } from "../../../../../../utils/shopping_cart/";

const SERVER_URL = process.env.NODE_ENV === "production" ? process.env.SERVER_URL : "http://localhost:5000";

class ProductItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			coverImage: null,
			alreadyInCart: shoppingCart.check(props.productId, props.cookies)
		};
	}

	static propTypes = {
		img: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])),
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
		const { img } = this.props;

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

		downloadingImage.src = SERVER_URL + img[0];

		// -------------------------------------
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.loading || this.state.alreadyInCart !== nextState.alreadyInCart || this.props.price !== nextProps.price) {
			return true;
		} else return false;
	}

	static getDerivedStateFromProps(props, state) {
		// simple props
		const { productId, cookies } = props;

		const alreadyInCart = shoppingCart.check(productId, cookies);

		if (alreadyInCart !== state.alreadyInCart) {
			return {
				alreadyInCart
			};
		} else {
			return null;
		}
	}

	render() {
		let description = this.props.description.slice();
		if (description.length > 100) {
			description = description
				.slice(0, 100)
				.trim()
				.split(" ");
			description.pop();
			description = description.join(" ").replace(/[^a-zA-Zа-яА-ЯёЁ0-9]+$/, "") + "...";
		}

		// simple props
		const { title, price, category, productId } = this.props;

		// state
		const { loading, alreadyInCart, coverImage } = this.state;

		return (
			<Card>
				<StyledLink to={"/goods/" + category + "/" + productId}>
					<ImageContainer loading={loading}>{loading ? <ImageLoadingIcon /> : <Img src={coverImage} />}</ImageContainer>
					<Title>{title}</Title>
					<Description>{description}</Description>
					<Footer>
						<Price>{price ? `Цена: ${price}` : "Цену уточняйте"}</Price>
						{alreadyInCart && <AlreadyInCart>в корзине</AlreadyInCart>}
					</Footer>
				</StyledLink>
			</Card>
		);
	}
}

export default ProductItem;

// styled-components --------------------------

const Card = styled.section`
	${props => (props.theme.desktop ? desktop.card : mobile.card)};
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
