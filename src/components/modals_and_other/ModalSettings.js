import React, { Component } from "react";
import { connect } from "react-redux";

// styles
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

// icons
import { IconConstructor, closelIcon, spinner } from "../../images/SVG/icons.js";

// actions
import { changeCurrency, closeModal } from "../../actions/applicationSettingsActions";

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

	&.settings-enter {
		opacity: 0.01;
	}

	&.settings-enter-active {
		opacity: 1;
		transition: all 250ms ease;
	}

	&.settings-exit {
		opacity: 1;
	}

	&.settings-exit-active {
		opacity: 0.01;
		transition: all 250ms ease;
	}
`;

const ModalWindow = styled.section`
	overflow-x: hidden;
	overflow-y: hidden;
	padding: 20px;
	display: flex;
	flex-direction: column;
	height: 300px;
	width: 620px;
	margin: auto 0;
	background-color: #fff;
	border-radius: 3px;
	z-index: 1000;

	@media (max-width: 620px) {
		margin: 0;
		border-radius: 0;
		min-height: 100vh;
	}
`;

const CurrencyContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
`;

const CurrencyTitle = styled.div`
	//
`;

const CurrencyButton = styled.button`
	
	cursor: pointer;
	width: 100px;
	height: 40px;
	border: none;
	color: #fff;
	background-color: ${props => (props.active ? "#f1592a" : "#959595")};
	pointer-events:  ${props => (props.active ? "none" : "auto")}
	border-radius: 5px;
`;

const LanguageContainer = styled.div`
	//
`;

const WaitingIcon = styled(IconConstructor).attrs({
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

// -------------------------------------------

class ModalSettings extends Component {
	constructor(props) {
		super(props);

		this.UAH = React.createRef();
		this.USD = React.createRef();
		this.RUB = React.createRef();

		this.state = {
			USD: "USD",
			UAH: "UAH",
			RUB: "RUB"
		};
	}

	onCloseModal = e => {
		return e.currentTarget === e.target ? this.props.closeModal() : null;
	};

	onChangeCurrency = e => {
		// redux props
		const { exchangeRates } = this.props;

		console.log(exchangeRates);

		let currency;

		// state
		const { USD, UAH, RUB } = this.state;

		if (e.target === this.USD.current) {
			currency = USD;
		}
		if (e.target === this.UAH.current) {
			currency = UAH;
		}
		if (e.target === this.RUB.current) {
			currency = RUB;
		}

		this.props.changeCurrency(currency);
	};

	render() {
		// redux props
		const { modal, currency, exchangeRates, waiting } = this.props;

		// state
		const { USD, UAH, RUB } = this.state;

		const page = document.querySelector("html");

		return (
			<CSSTransition
				in={modal}
				classNames="settings"
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
						{waiting ? (
							<WaitingIcon />
						) : exchangeRates ? (
							<CurrencyContainer>
								<CurrencyTitle>Выберите валюту</CurrencyTitle>
								<CurrencyButton onClick={this.onChangeCurrency} innerRef={this.UAH} active={currency === UAH}>
									UAH
								</CurrencyButton>
								<CurrencyButton onClick={this.onChangeCurrency} innerRef={this.USD} active={currency === USD}>
									USD
								</CurrencyButton>
								<CurrencyButton onClick={this.onChangeCurrency} innerRef={this.RUB} active={currency === RUB}>
									RUB
								</CurrencyButton>
							</CurrencyContainer>
						) : (
							"На данный момент настройки недоступны."
						)}
					</ModalWindow>
				</ModalContainer>
			</CSSTransition>
		);
	}
}

const mapStateToProps = store => ({
	modal: store.applicationSettings.modal,
	currency: store.applicationSettings.currency,
	exchangeRates: store.applicationSettings.exchangeRates,
	waiting: store.applicationSettings.waiting
});

export default connect(
	mapStateToProps,
	{ changeCurrency, closeModal }
)(ModalSettings);
