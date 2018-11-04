import React, { Component } from "react";
import { connect } from "react-redux";

// styles
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

// icons
import { IconConstructor, closelIcon } from "../../images/SVG/icons.js";

// actions
import { closeModal } from "../../actions/applicationSettingsActions";

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
	padding: 10px 20px 20px 20px;
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

const CurrencyContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
	margin-top: 15px;
	padding-bottom: 15px;
	padding-top: 15px;
	border-bottom: 1px solid #959595;
	border-top: 1px solid #959595;
`;

const CurrencyTitle = styled.div`
	/* // */
`;

const CurrencyButton = styled.button`
	cursor: pointer;
	width: 100px;
	height: 40px;
	border: none;
	color: #fff;
	background-color: ${props => (props.active ? "#f1592a" : "#959595")};
	pointer-events:  ${props => (props.active ? "none" : "auto")}
	border-radius: 15px;
`;

// const LanguageContainer = styled.div`
// 	/* // */
// `;

// -------------------------------------------

class ModalSettings extends Component {
	constructor(props) {
		super(props);

		this.UAH = React.createRef();
		this.USD = React.createRef();
		this.RUB = React.createRef();

		let currency;

		document.cookie.split(";").forEach(coo => {
			if (/^currency=/.test(coo)) {
				currency = coo.replace("currency=", "").trim();
			}
		});

		this.state = {
			currency
		};
	}

	onCloseModal = e => {
		return e.currentTarget === e.target ? this.props.closeModal() : null;
	};

	onChangeCurrency = e => {
		let currency;

		if (e.target === this.USD.current) {
			currency = "USD";
		}
		if (e.target === this.UAH.current) {
			currency = "UAH";
		}
		if (e.target === this.RUB.current) {
			currency = "RUB";
		}

		this.setState({
			currency
		});
	};

	onApplyChanges = () => {
		document.cookie = "currency=" + this.state.currency;

		// !! найти более адекватное решение
		window.location.reload();
	};

	render() {
		// redux props
		const { modal } = this.props;

		// redux action
		const { closeModal } = this.props;

		// state
		const { currency } = this.state;

		return (
			<CSSTransition in={modal} classNames="settings" timeout={250} unmountOnExit>
				<ModalContainer onClick={this.onCloseModal}>
					<ModalWindow>
						<Header>
							<Title>Настройки</Title>
							<CloseButton onClick={closeModal}>
								<CloselIcon />
							</CloseButton>
						</Header>
						<Main>
							<CurrencyContainer>
								<CurrencyTitle>Валюта:</CurrencyTitle>
								<CurrencyButton onClick={this.onChangeCurrency} innerRef={this.UAH} active={currency === "UAH"}>
									UAH
								</CurrencyButton>
								<CurrencyButton onClick={this.onChangeCurrency} innerRef={this.USD} active={currency === "USD"}>
									USD
								</CurrencyButton>
								<CurrencyButton onClick={this.onChangeCurrency} innerRef={this.RUB} active={currency === "RUB"}>
									RUB
								</CurrencyButton>
							</CurrencyContainer>

							{/* !! прикрутить выбор языка интерфейса */}

							{/* ) : (
								"На данный момент настройки недоступны."
							)} */}
							{/* <LanguageContainer>Выберите язык интерфейса</LanguageContainer> */}
						</Main>
						<button onClick={this.onApplyChanges}>Применить настройки</button>
					</ModalWindow>
				</ModalContainer>
			</CSSTransition>
		);
	}
}

const mapStateToProps = store => ({
	modal: store.applicationSettings.modal,
	message: store.applicationSettings.message,
	waiting: store.applicationSettings.waiting
});

export default connect(
	mapStateToProps,
	{ closeModal }
)(ModalSettings);
