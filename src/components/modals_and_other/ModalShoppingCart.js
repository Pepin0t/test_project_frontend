import React, { Component } from "react";
import { connect } from "react-redux";

// styles
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

// icons
import { IconConstructor, closelIcon, spinner } from "../../images/SVG/icons.js";

// actions
import { closeModal, deleteItemFromCart, showForm, sendCartForm } from "../../actions/modalShoppingCartActions";

// styled components -------------------------

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

	&.shopping-cart-modal-enter {
		opacity: 0.01;
	}

	&.shopping-cart-modal-enter-active {
		opacity: 1;
		transition: all 250ms ease;
	}

	&.shopping-cart-modal-exit {
		opacity: 1;
	}

	&.shopping-cart-modal-exit-active {
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
	width: ${props => (props.cartForm ? "620px" : "1280px")};
	margin: 30px;
	background-color: #fff;
	border-radius: 3px;
	z-index: 1000;
	transition: all ease 250ms;

	@media (max-width: 620px) {
		margin: 0;
		border-radius: 0;
		min-height: 100vh;
		background-color: #fff;
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

const Title = styled.div`
	font-weight: 600;
	font-size: 20px;
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

const List = styled.div`
	margin-top: 15px;
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Item = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 100px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	margin-bottom: 15px;
`;

const ItemNumber = styled.div`
	width: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	font-weight: 600;
	border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

const ItemTitle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
	border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

const Price = styled.div`
	width: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

const DeleteItemButton = styled.button`
	padding: 0 15px;
	cursor: pointer;
	background-color: #fff;
	color: #f1592a;
	border: none;
	font-size: 18px;
	font-weight: 600;
	transition: all 100ms ease;

	:hover {
		background-color: #f1592a;
		color: #fff;
	}
`;

const Form = styled.div`
	width: 100%;
`;

const FormHeader = styled.header`
	margin: 15px 0;
	color: #959595;
	text-align: center;
`;

const InputsContainer = styled.div`
	width: 100%;
`;
const Label = styled.label`
	color: #959595;
`;

const FormInput = styled.input.attrs({
	type: "text"
})`
	display: block;
	height: 30px;
	width: 100%;
	margin: 5px 0 15px 0;
	font-size: 16px;
`;

const TextArea = styled.textarea`
	display: block;
	width: 100%;
	height: 200px;
	margin: 5px 0 15px 0;
	font-size: 16px;
	resize: none;
`;

const Empty = styled.div`
	display: flex;
	font-size: 18px;
	justify-content: center;
`;

const ModalFooter = styled.footer`
	position: relative;
`;

const BuyButton = styled.button`
	width: 200px;
	height: 40px;
	margin-left: ${props => (props.cartForm ? "calc(100% - 200px)" : 0)};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	border-radius: 5px;
	color: #fff;
	background-color: ${props => (props.cartForm ? "#0099FF" : "#f1592a")};
	transition: all ease 250ms;
	border: none;
	pointer-events: ${props => (props.waiting ? "none" : "auto")};

	:hover {
		background-color: #70bc7b;
	}
`;

const ReturnToCartButton = styled.button`
	position: absolute;
	width: 40px;
	height: 40px;
	padding-top: 5px;
	left: 0;
	bottom: 0;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30px;
	border-radius: 5px;
	border: none;
	background-color: #959595;
	color: #fff;
	transition: all ease 100ms;

	:hover {
		background-color: #f1592a;
	}
`;

const WaitingIcon = styled(IconConstructor).attrs({
	body: spinner,
	viewBox: "0 0 16 16"
})`
	margin: 0 auto;
	fill: #fff;
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

const MessageToUser = styled.p`
	width: 100%;
	text-align: center;
	margin: 15px 0;
`;

// -------------------------------------------
class Modal extends Component {
	constructor(props) {
		super(props);

		this.nameInput = React.createRef();
		this.surnameInput = React.createRef();
		this.phoneInput = React.createRef();
		this.cityInput = React.createRef();
		this.emailInput = React.createRef();
		this.commentInput = React.createRef();

		this.state = {
			shoppingList: []
		};
	}

	static getDerivedStateFromProps(props) {
		if (props.modal) {
			const key = "shopping-list";
			let shoppingList = [];

			try {
				shoppingList = JSON.parse(localStorage.getItem(key)) || [];
			} catch (error) {
				localStorage.clear();
			}

			return {
				shoppingList
			};
		} else return null;
	}

	onCloseModal = e => {
		return e.currentTarget === e.target ? this.props.closeModal() : null;
	};

	deleteItem(item) {
		let newShoppingList = [];
		try {
			newShoppingList = JSON.parse(deleteItemFromCart(item).newLocalStorage);
		} catch (error) {
			localStorage.clear();
		}

		this.setState({
			shoppingList: newShoppingList
		});
	}

	onReturnToCart = () => {
		this.props.showForm(false);
	};

	checkout = () => {
		// redux props
		const { cartForm } = this.props;

		// redux actions
		const { showForm, sendCartForm } = this.props;

		if (cartForm) {
			const userName = this.nameInput.current.value;
			const userSurname = this.surnameInput.current.value;
			const userCity = this.cityInput.current.value;
			const userPhone = this.phoneInput.current.value;
			const userEmail = this.emailInput.current.value;
			const userComment = this.commentInput.current.value;

			let requiredUserData = [userName, userSurname, userCity, userPhone, userEmail];
			let somethingWrong;

			if (requiredUserData.some(el => !el.length)) {
				somethingWrong = "Не все обязательные поля были заполнены!";
				sendCartForm(null, somethingWrong);
			} else if (/\D/g.test(userPhone)) {
				somethingWrong = "Hомер телефона должен содержать только цифры!";
				sendCartForm(null, somethingWrong);
			} else if (!/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(userEmail)) {
				somethingWrong = "Укажите корректный email!";
				sendCartForm(null, somethingWrong);
			} else {
				let date = new Date();
				let orderNumber = `${userPhone.slice(-3)}-${date.getMilliseconds()}-${date.getSeconds()}`;
				let info = `Поступил новый заказ! №: ${orderNumber}. ${userName} ${userSurname} из города ${userCity}, телефон: ${userPhone}, email: ${userEmail}. Он хочет приобрести `;

				let userShoppingList = [];
				this.state.shoppingList.forEach(({ productId }) => {
					userShoppingList.push(productId);
				});

				info += `${userShoppingList.join(`, `)}. ${userComment ? `Комментарий к заказу: ` + userComment : ``}`;

				sendCartForm(info);
			}
		} else {
			showForm(true);
		}
	};

	render() {
		// redux props
		const { modal, messageToUser, waiting, cartForm, orderIsProcessed } = this.props;

		// redux actions
		const { closeModal } = this.props;

		// state
		const { shoppingList } = this.state;

		return (
			<CSSTransition in={modal} classNames="shopping-cart-modal" timeout={250} unmountOnExit>
				<ModalContainer onClick={this.onCloseModal}>
					<ModalWindow cartForm={cartForm}>
						<Header>
							<Title>{!cartForm ? "Корзина" : "Данные покупателя"}</Title>
							<CloseButton onClick={closeModal}>
								<CloselIcon />
							</CloseButton>
						</Header>
						<Main>
							{!cartForm ? (
								<List>
									{!shoppingList.length ? (
										<Empty>Корзина пуста...</Empty>
									) : (
										shoppingList.map(({ title, price, productId }, number) => {
											return (
												<Item key={title + " item"}>
													<ItemNumber>{number + 1}</ItemNumber>
													<ItemTitle>{title}</ItemTitle>
													<Price>{price ? `${price}` : "???"}</Price>
													<DeleteItemButton onClick={this.deleteItem.bind(this, productId)}>X</DeleteItemButton>
												</Item>
											);
										})
									)}

									{/* !! реализовать сведение к единой валюте */}
									{/* <p>Итого: </p> */}
								</List>
							) : (
								!orderIsProcessed && (
									<Form>
										<FormHeader>Для оформления заказа укажите следующее:</FormHeader>
										<InputsContainer>
											<Label htmlFor="user-name">Имя*</Label>
											<FormInput id="user-name" innerRef={this.nameInput} />
											<Label htmlFor="user-surname">Фамилия*</Label>
											<FormInput id="user-surname" innerRef={this.surnameInput} />
											<Label htmlFor="user-city">Город*</Label>
											<FormInput id="user-city" innerRef={this.cityInput} />
											<Label htmlFor="user-phone">Телефон*</Label>
											<FormInput id="user-phone" innerRef={this.phoneInput} />
											<Label htmlFor="user-email">Email*</Label>
											<FormInput id="user-email" innerRef={this.emailInput} />
											<Label htmlFor="user-comment">Комментарий к заказу</Label>
											<TextArea id="user-comment" innerRef={this.commentInput} />
										</InputsContainer>
										<MessageToUser>{messageToUser}</MessageToUser>
									</Form>
								)
							)}
						</Main>
						{!orderIsProcessed && shoppingList.length ? (
							<ModalFooter>
								{cartForm && <ReturnToCartButton onClick={this.onReturnToCart}>&#8617;</ReturnToCartButton>}
								<BuyButton onClick={this.checkout} waiting={waiting} cartForm={cartForm}>
									{!cartForm ? "Оформить заказ" : waiting ? <WaitingIcon /> : "Купить"}
								</BuyButton>
							</ModalFooter>
						) : null}
					</ModalWindow>
				</ModalContainer>
			</CSSTransition>
		);
	}
}

const mapStateToProps = store => ({
	modal: store.modalShoppingCart.modal,
	messageToUser: store.modalShoppingCart.messageToUser,
	waiting: store.modalShoppingCart.waiting,
	cartForm: store.modalShoppingCart.cartForm,
	orderIsProcessed: store.modalShoppingCart.orderIsProcessed
});

export default connect(
	mapStateToProps,
	{ closeModal, deleteItemFromCart, showForm, sendCartForm }
)(Modal);
