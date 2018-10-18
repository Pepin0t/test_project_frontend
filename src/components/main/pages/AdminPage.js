import React, { Component } from "react";
import { connect } from "react-redux";

// styles
import styled from "styled-components";

// icons
import { IconConstructor, spinner } from "../../../images/SVG/icons";

// actios
import { ADMIN_getExchangeRates, ADMIN_updateExchangeRates } from "../../../actions/adminActions";

// styled-components -------------------
const Header = styled.header`
	font-size: 36px;
	margin-top: 15px;
	font-family: "Neucha";
`;

const ExchangeRates = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 250px;
	width: 400px;
	border: 1px solid #959595;
	border-radius: 5px;
	margin: 15px 0;
	padding: 15px;
`;

const Title = styled.div`
	margin: 0 auto;
	font-weight: 600;
`;

const ExchangeRatesList = styled.ul`
	margin-top: 15px;
	width: 100%;
	list-style: none;
`;

const WaitingIcon = styled(IconConstructor).attrs({
	body: spinner,
	viewBox: "0 0 16 16"
})`
	margin: 0 auto;
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

const UpdateExchangeRatesButton = styled.button`
	height: 40px;
	width: 300px;
	border: none;
	border-radius: 5px;
	margin-top: auto;
	cursor: pointer;
	pointer-events: ${props => (props.waiting ? "none" : "auto")};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	color: #fff;
	background-color: #70bc7b;
`;

const MessageToAdmin = styled.p`
	width: 100%;
	text-align: center;
	margin: auto;
`;

// -------------------------------------

class AdminPage extends Component {
	constructor(props) {
		super(props);

		// redux actios
		this.props.ADMIN_getExchangeRates();

		this.state = {
			exchangeRates: null
		};
	}

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
		const Fragment = React.Fragment;

		// redux props
		const { getWaiting, updateWaiting } = this.props;

		// state
		const { exchangeRates } = this.state;

		return (
			<Fragment>
				<Header>Admin page</Header>

				<ExchangeRates>
					<Title>Текущий курс валют в магазине:</Title>
					{exchangeRates ? (
						<ExchangeRatesList>
							{exchangeRates.map(el => {
								return <li key={el.cc}>{el.cc + ": " + el.rate}</li>;
							})}
						</ExchangeRatesList>
					) : (
						getWaiting && <WaitingIcon fill="#959595" />
					)}
					<MessageToAdmin>{this.props.message}</MessageToAdmin>
					<UpdateExchangeRatesButton onClick={this.onUpdateExchangeRates} waiting={updateWaiting}>
						{updateWaiting ? <WaitingIcon fill="#fff" /> : "Обновить курс валют"}
					</UpdateExchangeRatesButton>
				</ExchangeRates>
			</Fragment>
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
