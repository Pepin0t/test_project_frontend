import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Cookies } from "react-cookie";

// styles
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, closelIcon } from "../../../images/SVG/icons.js";

// actions
import { closeModal } from "../../../actions/applicationSettingsActions";

class ModalSettings extends Component {
	constructor(props) {
		super(props);

		this.UAH = React.createRef();
		this.USD = React.createRef();
		this.RUB = React.createRef();

		this.state = {
			currency: props.cookies.get("currency")
		};
	}

	static propTypes = {
		closeModal: PropTypes.func,
		cookies: PropTypes.instanceOf(Cookies),
		modal: PropTypes.bool
	};

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
		this.props.cookies.set("currency", this.state.currency, { path: "/" });

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
								<CurrencyButton onClick={this.onChangeCurrency} ref={this.UAH} active={currency === "UAH"}>
									UAH
								</CurrencyButton>
								<CurrencyButton onClick={this.onChangeCurrency} ref={this.USD} active={currency === "USD"}>
									USD
								</CurrencyButton>
								<CurrencyButton onClick={this.onChangeCurrency} ref={this.RUB} active={currency === "RUB"}>
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

const CurrencyContainer = styled.div`
	${props => (props.theme.desktop ? desktop.currencyContainer : mobile.currencyContainer)};
`;

const CurrencyTitle = styled.div`
	${props => (props.theme.desktop ? desktop.currencyTitle : mobile.currencyTitle)};
`;

const CurrencyButton = styled.button`
	${props => (props.theme.desktop ? desktop.currencyButton : mobile.currencyButton)};
`;

// const LanguageContainer = styled.div`
// 	/* // */
// `;

// -------------------------------------------
