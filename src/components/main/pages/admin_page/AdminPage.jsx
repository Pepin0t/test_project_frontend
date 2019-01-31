import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const uuid = require("uuid/v1");

// styles
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import classNames from "classnames";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, spinner } from "../../../../images/SVG/icons";

// actios
import {
	ADMIN_getProductItemAvailableCategories,
	ADMIN_productItemCreate,
	ADMIN_getExchangeRates,
	ADMIN_updateExchangeRates
} from "../../../../actions/adminActions";

class AdminPage extends Component {
	constructor(props) {
		super(props);

		this.productItemInputs = [];
		this.productItemImagePreviewContainer = [];
		this.files = [];

		this.productItemGetAvailableCategoriesButton = React.createRef();
		this.productItemImagesInput = React.createRef();
		this.productItemCreateButton = React.createRef();

		// redux actios
		this.props.ADMIN_getExchangeRates();

		this.state = {
			files: [],
			productItemAvailableCategoriesListShow: false,
			productItemCategoryInputDisabled: true,
			productItemCreateButtonDisabled: true,
			productItemCreateWaiting: false,
			exchangeRates: null,
			updateWaiting: false
		};
	}

	static propTypes = {
		ADMIN_getProductItemAvailableCategories: PropTypes.func,
		ADMIN_productItemCreate: PropTypes.func,
		productItemGetAvailableCategoriesWaiting: PropTypes.bool,
		productItemGetAvailableCategoriesError: PropTypes.bool,
		productItemCreateError: PropTypes.bool,
		productItemCreateWaiting: PropTypes.bool,
		productItemCreateResultMessage: PropTypes.string,
		productItemCreateURL: PropTypes.string,
		productItemAvailableCategories: PropTypes.array,

		ADMIN_getExchangeRates: PropTypes.func,
		ADMIN_updateExchangeRates: PropTypes.func,
		getWaiting: PropTypes.bool,
		updateWaiting: PropTypes.bool,
		message: PropTypes.string,
		exchangeRates: PropTypes.array
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		let update = {};

		if (nextProps.exchangeRates && !prevState.exchangeRates) {
			update.exchangeRates = nextProps.exchangeRates;
		}

		return Object.keys(update).length ? update : null;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.productItemCreateError === undefined) {
			if (this.props.productItemCreateError === false) {
				this.setState(
					{
						files: [],
						productItemCreateButtonDisabled: true
					},
					() => {
						this.productItemImagePreviewContainer = [];
						this.productItemInputs.forEach(input => (input.value = ""));
						this.productItemCreateButton.current.innerText = "Создать";
					}
				);
			}

			if (this.props.productItemCreateError === true && this.productItemCreateButton.current.innerText !== "Повторить") {
				this.productItemCreateButton.current.innerText = "Повторить";
			}
		}
	}

	onUpdateExchangeRates = () => {
		this.setState(
			{
				updateWaiting: true
			},
			() => {
				// redux actions
				this.props.ADMIN_updateExchangeRates();
			}
		);
	};

	onProductItemCategoryInputShow = () => {
		this.setState(
			{
				productItemCategoryInputDisabled: false
			},
			() => {
				this.productItemInputs[1].focus();
				this.productItemGetAvailableCategoriesButton.current.innerText = "Доступные";
			}
		);
	};

	onProductItemAvailableCategoriesShow = () => {
		this.setState({
			productItemCategoryInputDisabled: true
		});

		this.props.ADMIN_getProductItemAvailableCategories();
	};

	producItemInputsOnChange = () => {
		if (this.productItemInputs.every(({ value }) => !!value) && this.state.productItemCreateButtonDisabled) {
			this.setState({
				productItemCreateButtonDisabled: false
			});
		}

		if (this.productItemInputs.some(({ value }) => !value) && !this.state.productItemCreateButtonDisabled) {
			this.setState({
				productItemCreateButtonDisabled: true
			});
		}
	};

	onProductItemChooseCategory = e => {
		this.productItemInputs[1].value = e.target.innerText;
		this.productItemGetAvailableCategoriesButton.current.innerText = e.target.innerText;
	};

	onProductItemCreate = () => {
		this.setState(
			{
				productItemCreateWaiting: true
			},
			() => {
				const newProductItem = new FormData();
				this.productItemInputs.forEach(({ value, id }) => newProductItem.append(id, value));
				this.state.files.forEach(({ file }) => newProductItem.append("product_images", file));

				this.props.ADMIN_productItemCreate(newProductItem);
			}
		);
	};

	fileManager = (type, id) => {
		switch (type) {
			case "add": {
				const files = Array.from(this.productItemImagesInput.current.files).map(file => ({ id: uuid(), file }));

				this.setState(
					{
						files: [...this.state.files, ...files]
					},
					() => {
						this.state.files.forEach(({ id, file }) => {
							let reader = new FileReader();

							reader.onload = () => {
								this.productItemImagePreviewContainer[id].firstChild.src = reader.result;
							};

							reader.readAsDataURL(file);
						});
					}
				);
				break;
			}
			case "remove": {
				this.setState({
					files: this.state.files.filter(item => item.id !== id)
				});
				break;
			}
		}
	};

	render() {
		// redux props
		const { productItemAvailableCategories, productItemCreateResultMessage, productItemCreateURL, getWaiting } = this.props;

		// state
		const { productItemCategoryInputDisabled, productItemCreateButtonDisabled, files, exchangeRates } = this.state;

		const productItemCreateButtonClassNames = classNames({
			waiting: this.state.productItemCreateWaiting || this.props.productItemCreateWaiting
		});

		const exchangeRatesUpdateButtonClassNames = classNames({
			waiting: this.state.updateWaiting || this.props.updateWaiting
		});

		const productItemGetAvailableCategoriesButtonClassNames = classNames({
			waiting: this.props.productItemGetAvailableCategoriesWaiting
		});

		return (
			<Wrapper>
				<Container>
					<ProductItemAddingContainer>
						<ProductItemAddingTitle>Добавить товар</ProductItemAddingTitle>
						<Label htmlFor="title">
							{"Название: "}
							<ProductItemInput
								id="title"
								ref={input => (this.productItemInputs[0] = input)}
								onChange={this.producItemInputsOnChange}
							/>
						</Label>
						<Label htmlFor="category">
							{"Категория: "}
							<ProductItemAvailableCategoriesContainer>
								<ProductItemGetAvailableCategoriesButton
									ref={this.productItemGetAvailableCategoriesButton}
									className={productItemGetAvailableCategoriesButtonClassNames}
									onClick={this.onProductItemAvailableCategoriesShow}
								>
									Доступные
								</ProductItemGetAvailableCategoriesButton>
								{productItemAvailableCategories && (
									<ProductItemAvailableCategoriesList>
										{productItemAvailableCategories.map(cat => {
											return (
												<li key={cat} onClick={this.onProductItemChooseCategory}>
													{cat}
												</li>
											);
										})}
									</ProductItemAvailableCategoriesList>
								)}
							</ProductItemAvailableCategoriesContainer>
							<ProductItemAddCategoryButton onClick={this.onProductItemCategoryInputShow}>+</ProductItemAddCategoryButton>
							<ProductItemInput
								id="category"
								ref={input => (this.productItemInputs[1] = input)}
								onChange={this.producItemInputsOnChange}
								disabled={productItemCategoryInputDisabled === true}
							/>
						</Label>
						<Label htmlFor="price">
							{"Цена (грн): "}
							<ProductItemInput
								id="price"
								ref={input => (this.productItemInputs[2] = input)}
								onChange={this.producItemInputsOnChange}
							/>
						</Label>
						<Label htmlFor="description">
							{"Описание: "}
							<ProductItemDescription
								id="description"
								ref={input => (this.productItemInputs[3] = input)}
								defaultValue="Просто зашибись какой пылесос!"
								onChange={this.producItemInputsOnChange}
							/>
						</Label>
						<Label htmlFor="none">
							{"Изображения: "}
							<ProductItemAddImageButton>
								<ProductItemAddImageInput id="images" ref={this.productItemImagesInput} onChange={() => this.fileManager("add")} />
							</ProductItemAddImageButton>
						</Label>
						<ProductItemImagesPreviewWrapper>
							<TransitionGroup component={null}>
								{files.map(({ id }) => {
									return (
										<CSSTransition key={id} classNames="product-image-preview" timeout={400} unmountOnExit>
											<ProductItemImagePreviewContainer ref={image => (this.productItemImagePreviewContainer[id] = image)}>
												<ProductItemImagePreview />
												<ProductItemImagePreviewDeleteButton onClick={() => this.fileManager("remove", id)}>
													&times;
												</ProductItemImagePreviewDeleteButton>
											</ProductItemImagePreviewContainer>
										</CSSTransition>
									);
								})}
							</TransitionGroup>
						</ProductItemImagesPreviewWrapper>
						<ProductItemControls>
							<ProductItemCreateButton
								className={productItemCreateButtonClassNames}
								ref={this.productItemCreateButton}
								disabled={productItemCreateButtonDisabled === true}
								onClick={this.onProductItemCreate}
								onTransitionEnd={e => {
									if (e.target.classList.contains("waiting")) {
										this.setState({
											productItemCreateWaiting: false
										});
									}
								}}
							>
								Создать
							</ProductItemCreateButton>
							{productItemCreateURL && (
								<ProductItemCreateStyledLink to={productItemCreateURL} target="_blank">
									{productItemCreateURL.split("/").pop()}
								</ProductItemCreateStyledLink>
							)}
							<ProductItemCreateResultMessage>{productItemCreateResultMessage}</ProductItemCreateResultMessage>
						</ProductItemControls>
					</ProductItemAddingContainer>

					<ExchangeRatesContainer>
						<ExchangeRatesTitle>Текущий курс валют в магазине</ExchangeRatesTitle>
						{exchangeRates ? (
							<ExchangeRatesList>
								{exchangeRates.map(el => {
									return <li key={el.cc}>{el.cc + ": " + el.rate}</li>;
								})}
							</ExchangeRatesList>
						) : (
							getWaiting && <ExchangeRatesWaitingIcon fill="#959595" />
						)}
						<ExchangeRatesMessageToAdmin>{this.props.message}</ExchangeRatesMessageToAdmin>
						<UpdateExchangeRatesButton
							className={exchangeRatesUpdateButtonClassNames}
							onClick={this.onUpdateExchangeRates}
							onTransitionEnd={e => {
								if (e.target.classList.contains("waiting")) {
									this.setState({
										updateWaiting: false
									});
								}
							}}
						>
							Обновить курс валют
						</UpdateExchangeRatesButton>
					</ExchangeRatesContainer>
				</Container>
			</Wrapper>
		);
	}
}

const mapStateToProps = store => ({
	productItemGetAvailableCategoriesWaiting: store.admin.productItemGetAvailableCategoriesWaiting,
	productItemAvailableCategories: store.admin.productItemAvailableCategories,
	productItemGetAvailableCategoriesError: store.admin.productItemGetAvailableCategoriesError,

	productItemCreateWaiting: store.admin.productItemCreateWaiting,
	productItemCreateError: store.admin.productItemCreateError,
	productItemCreateResultMessage: store.admin.productItemCreateResultMessage,
	productItemCreateURL: store.admin.productItemCreateURL,

	exchangeRates: store.admin.exchangeRates,
	message: store.admin.message,
	getWaiting: store.admin.getWaiting,
	updateWaiting: store.admin.updateWaiting
});

export default connect(
	mapStateToProps,
	{ ADMIN_getProductItemAvailableCategories, ADMIN_productItemCreate, ADMIN_getExchangeRates, ADMIN_updateExchangeRates }
)(AdminPage);

// styled-components -------------------

const Wrapper = styled.div`
	${props => (props.theme.desktop ? desktop.wrapper : mobile.wrapper)};
`;

const Container = styled.div`
	${props => (props.theme.desktop ? desktop.container : mobile.container)};
`;

const ProductItemAddingContainer = styled.div`
	${props => (props.theme.desktop ? desktop.productItemAddingContainer : mobile.productItemAddingContainer)};
`;

const ProductItemAddingTitle = styled.div`
	${props => (props.theme.desktop ? desktop.productItemAddingTitle : mobile.productItemAddingTitle)};
`;

const Label = styled.label`
	${props => (props.theme.desktop ? desktop.label : mobile.label)};
`;

const ProductItemInput = styled.input.attrs({
	type: "text"
})`
	${props => (props.theme.desktop ? desktop.productItemInput : mobile.productItemInput)};
`;

const ProductItemAvailableCategoriesContainer = styled.div`
	${props => (props.theme.desktop ? desktop.productItemAvailableCategoriesContainer : mobile.productItemAvailableCategoriesContainer)};
`;

const ProductItemGetAvailableCategoriesButton = styled.button`
	${props => (props.theme.desktop ? desktop.productItemGetAvailableCategoriesButton : mobile.productItemGetAvailableCategoriesButton)};
`;

const ProductItemAvailableCategoriesList = styled.ul`
	${props => (props.theme.desktop ? desktop.productItemAvailableCategoriesList : mobile.productItemAvailableCategoriesList)};
`;

const ProductItemAddCategoryButton = styled.button`
	${props => (props.theme.desktop ? desktop.productItemAddCategoryButton : mobile.productItemAddCategoryButton)};
`;

const ProductItemAddImageInput = styled.input.attrs({
	type: "file",
	multiple: true,
	accept: ".png, .jpg, .jpeg",
	title: ""
})`
	${props => (props.theme.desktop ? desktop.productItemAddImageInput : mobile.productItemAddImageInput)};
`;

const ProductItemAddImageButton = styled.div`
	${props => (props.theme.desktop ? desktop.productItemAddImageButton : mobile.productItemAddImageButton)};
`;

const ProductItemImagesPreviewWrapper = styled.div`
	${props => (props.theme.desktop ? desktop.productItemImagesPreviewWrapper : mobile.productItemImagesPreviewWrapper)};
`;

const ProductItemImagePreviewContainer = styled.div`
	${props => (props.theme.desktop ? desktop.productItemImagePreviewContainer : mobile.productItemImagePreviewContainer)};
`;
const ProductItemImagePreview = styled.img.attrs({
	src: "",
	alt: ""
})`
	${props => (props.theme.desktop ? desktop.productItemImagePreview : mobile.productItemImagePreview)};
`;

const ProductItemImagePreviewDeleteButton = styled.div`
	${props => (props.theme.desktop ? desktop.productItemImagePreviewDeleteButton : mobile.productItemImagePreviewDeleteButton)};
`;

const ProductItemDescription = styled.textarea`
	${props => (props.theme.desktop ? desktop.productItemDescription : mobile.productItemDescription)};
`;

const ProductItemControls = styled.div`
	${props => (props.theme.desktop ? desktop.productItemControls : mobile.productItemControls)};
`;

const ProductItemCreateButton = styled.button`
	${props => (props.theme.desktop ? desktop.productItemCreateButton : mobile.productItemCreateButton)};
`;

const ProductItemCreateStyledLink = styled(Link)`
	${props => (props.theme.desktop ? desktop.productItemCreateStyledLink : mobile.productItemCreateStyledLink)};
`;

const ProductItemCreateResultMessage = styled.div`
	${props => (props.theme.desktop ? desktop.productItemCreateResultMessage : mobile.productItemCreateResultMessage)};
`;

const ExchangeRatesContainer = styled.div`
	${props => (props.theme.desktop ? desktop.exchangeRatesContainer : mobile.exchangeRatesContainer)};
`;

const ExchangeRatesTitle = styled.div`
	${props => (props.theme.desktop ? desktop.exchangeRatesTitle : mobile.exchangeRatesTitle)};
`;

const ExchangeRatesList = styled.ul`
	${props => (props.theme.desktop ? desktop.exchangeRatesList : mobile.exchangeRatesList)};
`;

const ExchangeRatesWaitingIcon = styled(IconConstructor).attrs({
	body: spinner,
	viewBox: "0 0 16 16"
})`
	${props => (props.theme.desktop ? desktop.exchangeRatesWaitingIcon : mobile.exchangeRatesWaitingIcon)};
`;

const UpdateExchangeRatesButton = styled.button`
	${props => (props.theme.desktop ? desktop.updateExchangeRatesButton : mobile.updateExchangeRatesButton)};
`;

const ExchangeRatesMessageToAdmin = styled.p`
	${props => (props.theme.desktop ? desktop.exchangeRatesMessageToAdmin : mobile.exchangeRatesMessageToAdmin)};
`;

// -------------------------------------
