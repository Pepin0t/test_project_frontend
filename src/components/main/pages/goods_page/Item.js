import React, { Component } from "react";
import { connect } from "react-redux";

// styles
import styled from "styled-components";

// icons
import { spinner, IconConstructor } from "../../../../images/SVG/icons";

// images
import imageNotFound from "../../../../images/image-not-found.png";

// actions
import { openModal, checkCart } from "../../../../actions/productItemActions";

// styled-components --------------------------

const Card = styled.section`
	position: relative;
	margin-bottom: 30px;
	margin-right: 5px;
	margin-left: 5px;
	border-bottom-left-radius: 15px;
	border-top-right-radius: 15px;
	min-width: 250px;
	width: 250px;
	padding: 15px;
	display: flex;
	flex-direction: column;
	transition: all ease 200ms;
	cursor: pointer;
	background-color: rgba(255, 255, 255, 0.8);
	overflow: hidden;

	:hover {
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
		background-color: rgba(255, 255, 255, 0.7);
	}

	@media (max-width: ${props => props.sidebarWidth + 914 + "px"}) {
		width: ${props => (props.hideSidebar ? "300px" : "250px")};
	}

	@media (max-width: ${props => props.sidebarWidth + 826 + "px"}) {
		width: 300px;
	}

	@media (max-width: ${props => props.sidebarWidth + 804 + "px"}) {
		width: ${props => (props.hideSidebar ? "400px" : "300px")};
	}

	@media (max-width: ${props => props.sidebarWidth + 694 + "px"}) {
		width: ${props => (props.hideSidebar ? "calc(100% - 100px)" : "300px")};
	}

	@media (max-width: ${props => props.sidebarWidth + 666 + "px"}) {
		width: calc(100% - 100px);
	}

	@media (max-width: 460px) {
		width: calc(100% - 30px);
	}

	@-moz-document url-prefix() {
		/* Firefox */

		@media (max-width: ${props => props.sidebarWidth + 926 + "px"}) {
			width: ${props => (props.hideSidebar ? "300px" : "250px")};
		}

		@media (max-width: ${props => props.sidebarWidth + 826 + "px"}) {
			width: ${props => (props.hideSidebar ? "400px" : "300px")};
		}

		@media (max-width: ${props => props.sidebarWidth + 706 + "px"}) {
			width: ${props => (props.hideSidebar ? "calc(100% - 100px)" : "300px")};
		}

		@media (max-width: ${props => props.sidebarWidth + 666 + "px"}) {
			width: calc(100% - 100px);
		}

		@media (max-width: 460px) {
			width: calc(100% - 30px);
		}
	}
`;

const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: ${props => (props.loading ? "center" : "flex-start")};
	width: 100%;
	min-height: 200px;
	transition: all 150ms ease;
`;

const Img = styled.img.attrs({
	alt: "Not found"
})`
	margin-bottom: 10px;
	min-width: calc(100% + 30px);
	width: calc(100% + 30px);
	margin-top: -15px;
	transition: all 150ms ease;

	@media (max-width: ${props => props.sidebarWidth + 914 + "px"}) {
		width: ${props => (props.hideSidebar ? "100%" : "calc(100% + 30px)")};
		min-width: ${props => (props.hideSidebar ? "100%" : "calc(100% + 30px)")};
		margin-top: ${props => (props.hideSidebar ? 0 : "-15px")};
		border-top-right-radius: ${props => (props.hideSidebar ? "10px" : 0)};
	}

	@media (max-width: ${props => props.sidebarWidth + 826 + "px"}) {
		border-top-right-radius: 10px;
		width: 100%;
		min-width: 100%;
		margin-top: 0;
	}

	@-moz-document url-prefix() {
		/* Firefox */

		@media (max-width: ${props => props.sidebarWidth + 926 + "px"}) {
			width: ${props => (props.hideSidebar ? "100%" : "calc(100% + 30px)")};
			min-width: ${props => (props.hideSidebar ? "100%" : "calc(100% + 30px)")};
			margin-top: ${props => (props.hideSidebar ? 0 : "-15px")};
			border-top-right-radius: ${props => (props.hideSidebar ? "10px" : 0)};
		}

		@media (max-width: ${props => props.sidebarWidth + 826 + "px"}) {
			border-top-right-radius: 10px;
			width: 100%;
			min-width: 100%;
			margin-top: 0;
		}
	}
`;

const ImageLoadingIcon = styled(IconConstructor).attrs({
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
		const { images } = this.props;

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

		downloadingImage.src = images[0];
		// -------------------------------------
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.state.loading ||
			nextState.alreadyInCart !== this.state.alreadyInCart ||
			this.props.currency !== nextProps.currency ||
			this.props.hideSidebar !== nextProps.hideSidebar
		) {
			return true;
		} else return false;
	}

	static getDerivedStateFromProps(props, state) {
		// simple props
		const { productId } = props;

		// redux actions
		const { checkCart } = props;

		const alreadyInCart = checkCart(productId).alreadyInCart;

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
		const { images, title, description, category, price, productId } = this.props;

		// redux actions
		const { openModal } = this.props;

		const fullDescription = {
			images: images[1],
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
		const { title, price, hideSidebar, sidebarWidth } = this.props;

		// redux props
		const { currency } = this.props;

		// state
		const { loading, alreadyInCart, coverImage } = this.state;

		return (
			<Card onClick={this.onOpenModal} hideSidebar={hideSidebar} sidebarWidth={sidebarWidth}>
				<ImageContainer loading={loading}>
					{loading ? <ImageLoadingIcon /> : <Img src={coverImage} hideSidebar={hideSidebar} sidebarWidth={sidebarWidth} />}
				</ImageContainer>
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

const mapStateToProps = store => ({
	alreadyInCart: store.productItem.alreadyInCart,
	currency: store.applicationSettings.currency,
	modal: store.modalShoppingCart.modal
});

export default connect(
	mapStateToProps,
	{ openModal, checkCart }
)(Item);
