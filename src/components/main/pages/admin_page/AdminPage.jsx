import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, spinner } from "../../../../images/SVG/icons";

// actios
import { ADMIN_getExchangeRates, ADMIN_updateExchangeRates } from "../../../../actions/adminActions";

class AdminPage extends Component {
	constructor(props) {
		super(props);

		// redux actios
		this.props.ADMIN_getExchangeRates();

		this.state = {
			exchangeRates: null
		};
	}

	static propTypes = {
		ADMIN_getExchangeRates: PropTypes.func,
		ADMIN_updateExchangeRates: PropTypes.func,
		getWaiting: PropTypes.bool,
		updateWaiting: PropTypes.bool,
		message: PropTypes.string,
		exchangeRates: PropTypes.array
	};

	static getDerivedStateFromProps(props) {
		if (props.exchangeRates) {
			return {
				exchangeRates: props.exchangeRates
			};
		} else return null;
	}

	onUpdateExchangeRates = () => {
		// redux actios
		this.props.ADMIN_updateExchangeRates();
	};

	render() {
		// redux props
		const { getWaiting, updateWaiting } = this.props;

		// state
		const { exchangeRates } = this.state;

		return (
			<Container>
				<ExchangeRatesContainer>
					<ExchangeRatesTitle>Текущий курс валют в магазине:</ExchangeRatesTitle>
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
					<UpdateExchangeRatesButton onClick={this.onUpdateExchangeRates} waiting={updateWaiting}>
						{updateWaiting ? <ExchangeRatesWaitingIcon fill="#fff" /> : "Обновить курс валют"}
					</UpdateExchangeRatesButton>
				</ExchangeRatesContainer>
				<button>Get Fakes!</button>
			</Container>
		);
	}
}

const mapStateToProps = store => ({
	exchangeRates: store.admin.exchangeRates,
	message: store.admin.message,
	getWaiting: store.admin.getWaiting,
	updateWaiting: store.admin.updateWaiting
});

export default connect(
	mapStateToProps,
	{ ADMIN_getExchangeRates, ADMIN_updateExchangeRates }
)(AdminPage);

// styled-components -------------------

const Container = styled.div`
	${props => (props.theme.desktop ? desktop.container : mobile.container)};
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
