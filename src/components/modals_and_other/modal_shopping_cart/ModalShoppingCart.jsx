import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Cookies } from "react-cookie";
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";

// styles
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, closelIcon, spinner } from "../../../images/SVG/icons.js";

// actions
import { getShoppingList, showForm, sendCartForm } from "../../../actions/modalShoppingCartActions";

// utils
import { shoppingCart } from "../../../utils/shopping_cart/";

class Modal extends Component {
	constructor(props) {
		super(props);

		this.FormInputs = [];

		this.checkout = this.checkout.bind(this);

		this.modalWindow = React.createRef();
		this.main = React.createRef();
		this.closeButton = React.createRef();
		this.formHeader = React.createRef();
		this.title = React.createRef();
		this.buyButton = React.createRef();
		this.returnToCartButton = React.createRef();

		this.state = {
			modal: false,
			loading: true,
			loadingErrorMessage: null,
			shoppingList: [],
			cartIsEmpty: !props.cookies.get("shopping-list")
		};
	}

	static propTypes = {
		history: PropTypes.object,
		location: PropTypes.object,
		shoppingList: PropTypes.object,
		getShoppingList: PropTypes.func,
		showForm: PropTypes.func,
		sendCartForm: PropTypes.func,
		cookies: PropTypes.instanceOf(Cookies),
		waitingResponse: PropTypes.bool,
		cartForm: PropTypes.bool,
		orderIsProcessed: PropTypes.bool,
		messageToUser: PropTypes.string
	};

	async componentDidMount() {
		this.setState({
			modal: true
		});

		if (!this.state.cartIsEmpty) {
			try {
				await this.props.getShoppingList();
				let shoppingList = await this.props.shoppingList;

				this.setState({
					shoppingList: shoppingList.data,
					loading: false
				});
			} catch (error) {
				this.setState({
					loadingErrorMessage: "Ошибка!"
				});
			}
		}
	}

	onCloseModal = e => {
		if (e.currentTarget === e.target || e.currentTarget === this.closeButton.current) {
			this.setState({
				modal: false
			});
		}
	};

	onRemoveItemFromShoppingCart = id => {
		// react-cookie props
		const { cookies } = this.props;

		shoppingCart.remove(id, cookies);

		this.setState({
			shoppingList: this.state.shoppingList.slice().filter(({ productId }) => productId !== id),
			cartIsEmpty: !this.props.cookies.get("shopping-list")
		});
	};

	onReturnToCart = () => {
		this.props.showForm(false);
	};

	async checkout() {
		// redux props
		const { cartForm } = this.props;

		// redux actions
		const { showForm, sendCartForm } = this.props;

		if (cartForm) {
			const userName = this.FormInputs[0].value;
			const userSurname = this.FormInputs[1].value;
			const userCity = this.FormInputs[2].value;
			const userPhone = this.FormInputs[3].value;
			const userEmail = this.FormInputs[4].value;
			const userComment = this.FormInputs[5].value;

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

				info += `${userShoppingList.join(", ")}. ${userComment ? "Комментарий к заказу: " + userComment : ""}`;

				// sendCartForm(info);

				this.congratulations();
			}
		} else {
			showForm(true);
		}
	}

	congratulations() {
		let promises = [];

		for (let i = 0; i < 6; i++) {
			setTimeout(() => {
				if (this.state.modal) {
					Object.assign(this.FormInputs[i].parentNode.style, { transform: "translate(120%)", opacity: 0 });
				}
			}, 100 * i);
		}

		setTimeout(() => {
			Object.assign(this.returnToCartButton.current.style, { transform: "translate(0, 50px)", opacity: 0 });
		}, 300);

		setTimeout(() => {
			Object.assign(this.title.current.style, { transform: "translate(0, -50px)", opacity: 0 });
		}, 500);

		setTimeout(() => {
			Object.assign(this.buyButton.current.style, { transform: "translate(0, 50px)", opacity: 0 });
		}, 700);

		(() => {
			let promise = new Promise(resolve => {
				setTimeout(() => {
					Object.assign(this.formHeader.current.style, { opacity: 0 });
					resolve();
				}, 800);
			});

			promises.push(promise);
		})();

		Promise.all([...promises]).then(() => {
			this.title.current.innerText = "Покупка удалась!";
			Object.assign(this.title.current.style, { transform: "translate(0, 0)", opacity: 1 });

			setTimeout(() => {
				this.formHeader.current.innerText = "Ваш заказ оформлен! Как замечательно!";
				Object.assign(this.formHeader.current.style, { transform: "translate(0, calc(100vh / 2 - 200px))", opacity: 1 });
			}, 300);
		});
	}

	render() {
		// redux props
		const { messageToUser, waitingResponse, cartForm, orderIsProcessed } = this.props;

		// state
		const { modal, cartIsEmpty, loading, loadingErrorMessage, shoppingList } = this.state;

		return (
			<CSSTransition
				in={modal}
				classNames="shopping-cart-modal"
				timeout={250}
				onExited={() => {
					const { history, location } = this.props;
					history.push(location.state.from);
				}}
				unmountOnExit
			>
				<ModalContainer onClick={this.onCloseModal}>
					<ModalWindow cartForm={cartForm} ref={this.modalWindow}>
						<Header>
							<Title ref={this.title}>{!cartForm ? "Корзина" : "Данные покупателя"}</Title>
							<CloseButton ref={this.closeButton} onClick={this.onCloseModal}>
								<CloselIcon />
							</CloseButton>
						</Header>
						<Main ref={this.main}>
							{!cartForm ? (
								<List>
									{cartIsEmpty ? (
										<Empty>Корзина пуста...</Empty>
									) : loading ? (
										<Empty>{loadingErrorMessage ? loadingErrorMessage : "Подождите..."}</Empty>
									) : (
										<TransitionGroup component={null}>
											{shoppingList.map(({ productId, price }, number) => {
												return (
													<CSSTransition classNames="collapse" key={productId + " item"} timeout={1000} unmountOnExit>
														<Item>
															<ItemNumber>{number + 1}</ItemNumber>
															<ItemTitle>{productId}</ItemTitle>
															<Price>{price ? `${price}` : "???"}</Price>
															<DeleteItemButton onClick={() => this.onRemoveItemFromShoppingCart(productId)}>
																X
															</DeleteItemButton>
														</Item>
													</CSSTransition>
												);
											})}
										</TransitionGroup>
									)}

									{/* !! реализовать сведение к единой валюте */}
									{/* <p>Итого: </p> */}
								</List>
							) : (
								<Form>
									<FormHeader ref={this.formHeader}>Для оформления заказа укажите следующее:</FormHeader>
									<InputsContainer>
										<Label htmlFor="user-name">
											Имя*
											<FormInput id="user-name" ref={item => (this.FormInputs[0] = item)} defaultValue="Трисс" />
										</Label>
										<Label htmlFor="user-surname">
											Фамилия*
											<FormInput id="user-surname" ref={item => (this.FormInputs[1] = item)} defaultValue="Меригольд" />
										</Label>
										<Label htmlFor="user-city">
											Город*
											<FormInput id="user-city" ref={item => (this.FormInputs[2] = item)} defaultValue="Марибор" />
										</Label>
										<Label htmlFor="user-phone">
											Телефон*
											<FormInput id="user-phone" ref={item => (this.FormInputs[3] = item)} defaultValue="0923123122" />
										</Label>
										<Label htmlFor="user-email">
											Email*
											<FormInput id="user-email" ref={item => (this.FormInputs[4] = item)} defaultValue="merigold@gmail.com" />
										</Label>
										<Label htmlFor="user-comment">
											Комментарий к заказу
											<TextArea id="user-comment" ref={item => (this.FormInputs[5] = item)} />
										</Label>
									</InputsContainer>
									<MessageToUser>{messageToUser}</MessageToUser>
								</Form>
							)}
						</Main>
						{!orderIsProcessed && !cartIsEmpty ? (
							<ModalFooter>
								{cartForm && (
									<ReturnToCartButton onClick={this.onReturnToCart} ref={this.returnToCartButton}>
										&#8617;
									</ReturnToCartButton>
								)}
								<BuyButton onClick={this.checkout} waitingResponse={waitingResponse} cartForm={cartForm} ref={this.buyButton}>
									{!cartForm ? "Оформить заказ" : waitingResponse ? <WaitingIcon /> : "Купить"}
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
	messageToUser: store.modalShoppingCart.messageToUser,
	waitingResponse: store.modalShoppingCart.waitingResponse,
	shoppingList: store.modalShoppingCart.shoppingList,
	cartForm: store.modalShoppingCart.cartForm,
	orderIsProcessed: store.modalShoppingCart.orderIsProcessed
});

export default connect(
	mapStateToProps,
	{ getShoppingList, showForm, sendCartForm }
)(Modal);

// styled components -------------------------

const ModalContainer = styled.div`
	${props => (props.theme.desktop ? desktop.modalContainer : mobile.modalContainer)};
`;

const ModalWindow = styled.section`
	${props => (props.theme.desktop ? desktop.modalWindow : mobile.modalWindow)};
`;

const Header = styled.header`
	${props => (props.theme.desktop ? desktop.header : mobile.header)};
`;

const Title = styled.div`
	${props => (props.theme.desktop ? desktop.title : mobile.title)};
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

const List = styled.div`
	${props => (props.theme.desktop ? desktop.list : mobile.list)};
`;

const Item = styled.div`
	${props => (props.theme.desktop ? desktop.item : mobile.item)};
`;

const ItemNumber = styled.div`
	${props => (props.theme.desktop ? desktop.itemNumber : mobile.itemNumber)};
`;

const ItemTitle = styled.div`
	${props => (props.theme.desktop ? desktop.itemTitle : mobile.itemTitle)};
`;

const Price = styled.div`
	${props => (props.theme.desktop ? desktop.price : mobile.price)};
`;

const DeleteItemButton = styled.button`
	${props => (props.theme.desktop ? desktop.deleteItemButton : mobile.deleteItemButton)};
`;

const Form = styled.div`
	${props => (props.theme.desktop ? desktop.form : mobile.form)};
`;

const FormHeader = styled.header`
	${props => (props.theme.desktop ? desktop.formHeader : mobile.formHeader)};
`;

const InputsContainer = styled.div`
	${props => (props.theme.desktop ? desktop.inputsContainer : mobile.inputsContainer)};
`;

const Label = styled.label`
	${props => (props.theme.desktop ? desktop.label : mobile.label)};
`;

const FormInput = styled.input.attrs({
	type: "text"
})`
	${props => (props.theme.desktop ? desktop.formInput : mobile.formInput)};
`;

const TextArea = styled.textarea`
	${props => (props.theme.desktop ? desktop.textArea : mobile.textArea)};
`;

const Empty = styled.div`
	${props => (props.theme.desktop ? desktop.empty : mobile.empty)};
`;

const ModalFooter = styled.footer`
	${props => (props.theme.desktop ? desktop.modalFooter : mobile.modalFooter)};
`;

const BuyButton = styled.button`
	${props => (props.theme.desktop ? desktop.buyButton : mobile.buyButton)};
`;

const ReturnToCartButton = styled.button`
	${props => (props.theme.desktop ? desktop.returnToCartButton : mobile.returnToCartButton)};
`;

const WaitingIcon = styled(IconConstructor).attrs({
	body: spinner,
	viewBox: "0 0 16 16"
})`
	${props => (props.theme.desktop ? desktop.waitingIcon : mobile.waitingIcon)};
`;

const MessageToUser = styled.p`
	${props => (props.theme.desktop ? desktop.messageToUser : mobile.messageToUser)};
`;

// -------------------------------------------
