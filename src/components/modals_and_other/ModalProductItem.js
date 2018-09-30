import React, { Component } from "react";
import { connect } from "react-redux";

// styles
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

// icons
import { IconConstructor, closelIcon } from "../../images/SVG/icons.js";

// actions
import { closeModal, sendToCart } from "../../actions/productItemActions";

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
	width: 1140px;
	margin: 30px;
	background-color: #fff;
	border-radius: 3px;
	z-index: 1000;

	@media (max-width: 620px) {
		margin: 0;
		border-radius: 0;
		min-height: 100vh;
	}
`;

const Header = styled.header`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: 30px;
	background-color: #fff;
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
	background-color: #fff;

	:hover ${CloselIcon} {
		fill: #f1592a;
	}
`;

const Main = styled.div`
	margin-bottom: auto;
	width: 100%;
`;

const Description = styled.div`
	font-size: 18px;
`;

const ImageContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	margin: 20px 0;
`;

const Img = styled.img.attrs({
	alt: "..."
})`
	display: block;
	max-width: 100%;
	max-height: 50vh;
	border-radius: 5px;

	@media (max-width: 620px) {
		margin: 20px auto;
	}
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

// -------------------------------------------
class Modal extends Component {
	onCloseModal = e => {
		return e.currentTarget === e.target ? this.props.close() : null;
	};

	onSendToCart = () => {
		const { sendToCart, fullDescription } = this.props;

		sendToCart(fullDescription);
	};

	render() {
		// redux props
		const { modal, alreadyInCart, currency } = this.props;

		// redux actions
		const { close } = this.props;

		const { images, title, description, category, productId, price } = this.props.fullDescription;

		// = price ? `Цена: ${price} ${this.state.currency}` : "Цену уточняйте"

		const page = document.querySelector("html");
		// console.log("render modal");

		return (
			<CSSTransition
				in={modal}
				classNames={cssTransitionName}
				timeout={250}
				onEntering={() => {
					page.style.overflowY = "hidden";
				}}
				onExited={() => {
					page.style.overflowY = "visible";
				}}
				unmountOnExit
			>
				<ModalContainer onClick={this.onCloseModal}>
					<ModalWindow>
						<Header>
							<Title>{title}</Title>
							<Category>Категория: {category}</Category>
							<Category>Код товара: {productId}</Category>
							<CloseButton onClick={close}>
								<CloselIcon />
							</CloseButton>
						</Header>
						<ImageContainer>
							{modal
								? images.map((_, i) => {
										return <Img key={i + " img"} src={images[i]} />;
								  })
								: null}
						</ImageContainer>
						<Main>
							<Description>{description}</Description>
						</Main>
						<Footer>
							<Price>{price ? `Цена: ${price} ${currency}` : "Цену уточняйте"}</Price>
							<BuyButton onClick={this.onSendToCart} alreadyInCart={alreadyInCart}>
								{alreadyInCart ? "Уже в корзине" : "В корзину"}
							</BuyButton>
						</Footer>
					</ModalWindow>
				</ModalContainer>
			</CSSTransition>
		);
	}
}

const mapStateToProps = store => ({
	modal: store.productItem.modal,
	fullDescription: store.productItem.fullDescription,
	alreadyInCart: store.productItem.alreadyInCart,
	currency: store.applicationSettings.currency
});

export default connect(
	mapStateToProps,
	{ close: closeModal, sendToCart }
)(Modal);
