import React, { Component } from "react";
import { connect } from "react-redux";

// styles
import styled from "styled-components";

import imageNotFound from "../../../../images/item-258px.jpg";

// actions
import { openModal, checkCart } from "../../../../actions/productItemActions";

// icons
import { spinner, IconConstructor } from "../../../../images/SVG/icons";

// styled-components --------------------------

const Card = styled.section`
	position: relative;
	margin: 0 0 30px 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	border-left: 1px solid rgba(0, 0, 0, 0.2);
	border-bottom-left-radius: 15px;
	border-top-right-radius: 15px;
	width: 290px;
	padding: 15px;
	display: flex;
	flex-direction: column;
	transition: all ease 200ms;
	cursor: pointer;

	:hover {
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	}

	::before {
		position: absolute;
		left: -1px;
		top: -1px;
		content: "";
		background-color: rgba(0, 0, 0, 0.2);
		min-width: 100px;
		height: 1px;
		transition: all ease 200ms;
	}

	::after {
		position: absolute;
		right: -1px;
		bottom: -1px;
		content: "";
		background-color: rgba(0, 0, 0, 0.2);
		min-height: 250px;
		width: 1px;
		transition: all ease 200ms;
	}

	:hover::before {
		opacity: 0;
	}

	:hover::after {
		opacity: 0;
	}

	@media (max-width: 1140px) {
		margin: 0 15px 30px 15px;
	}
`;

const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: ${props => (props.loading ? "center" : "flex-start")};
	width: 100%;
	height: 400px;
`;

const Img = styled.img.attrs({
	alt: "Not found"
})`
	width: 100%;
	margin-bottom: 10px;
	border: 1px solid rgba(0, 0, 0, 0.2);
`;

const ImageLoadingIcon = styled(IconConstructor).attrs({
	body: spinner,
	viewBox: "0 0 16 16"
})`
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

const Title = styled.h2`
	margin-bottom: 5px;
`;

const Description = styled.p`
	flex-grow: 1;
`;

const Footer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
`;

const Price = styled.p`
	margin-top: 15px;
	font-weight: 600;
`;

const AlreadyInCart = styled.p`
	font-size: 16px;
	color: #70bc7b;
`;
// --------------------------------------------

class Item extends Component {
	state = {
		loading: true,
		coverImage: imageNotFound,
		alreadyInCart: false
	};

	componentDidMount() {
		// image loading ----------------------

		// simple props
		const { imgURL } = this.props;

		const downloadingImage = new Image();

		downloadingImage.onload = () => {
			this.setState({
				loading: false,
				coverImage: downloadingImage.src
			});
		};

		downloadingImage.onerror = () => {
			this.setState({
				loading: false
			});
		};

		downloadingImage.src = imgURL[0];
		// -------------------------------------
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.loading || nextState.alreadyInCart !== this.state.alreadyInCart || this.props.currency !== nextProps.currency) {
			return true;
		} else return false;
	}

	static getDerivedStateFromProps(props, state) {
		// simple props
		const { title } = props;

		// redux actions
		const { checkCart } = props;

		const alreadyInCart = checkCart(title).alreadyInCart;

		if (alreadyInCart !== state.alreadyInCart) {
			return {
				alreadyInCart
			};
		} else {
			return null;
		}
	}

	onOpenModal = () => {
		// simple props
		const { imgURL, title, description, category, price, productId } = this.props;

		// redux actions
		const { openModal } = this.props;

		const fullDescription = {
			images: imgURL,
			title,
			description,
			category,
			productId,
			price
		};

		openModal(fullDescription);
	};

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
		const { title, price } = this.props;

		// redux props
		const { currency } = this.props;

		// state
		const { loading, alreadyInCart, coverImage } = this.state;

		// console.log("render");

		return (
			<Card onClick={this.onOpenModal}>
				<ImageContainer loading={loading}>{loading ? <ImageLoadingIcon /> : <Img src={coverImage} />}</ImageContainer>
				<Title>{title}</Title>
				<Description>{description}</Description>
				<Footer>
					<Price>{price ? `Цена: ${price} ${currency}` : "Цену уточняйте"}</Price>
					{alreadyInCart && <AlreadyInCart>в корзине</AlreadyInCart>}
				</Footer>
			</Card>
		);
	}
}

Item.defaultProps = {
	description: "Здесь когда-нибуть будет описание товара... очень скоро!"
};

const mapStateToProps = store => ({
	alreadyInCart: store.productItem.alreadyInCart,
	currency: store.applicationSettings.currency,
	modal: store.modalShoppingCart.modal
});

export default connect(
	mapStateToProps,
	{ openModal, checkCart }
)(Item);
