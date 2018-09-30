import { CHANGE_CURRENCY, OPEN_SETTINGS_MODAL, CLOSE_SETTINGS_MODAL, GET_EXCHANGE_RATES, GET_EXCHANGE_RATES_WAITING } from "../actions/types";

const initialState = {
	modal: false,
	currency: localStorage.getItem("currency") || "UAH",
	exchangeRates: { USD: 28, RUB: 0.4 },
	waiting: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_CURRENCY:
			return { ...state, currency: action.currency };

		case OPEN_SETTINGS_MODAL:
			return { ...state, modal: true };

		case GET_EXCHANGE_RATES:
			return { ...state, exchangeRates: action.exchangeRates, waiting: false };

		case GET_EXCHANGE_RATES_WAITING:
			return { ...state, waiting: true };

		case CLOSE_SETTINGS_MODAL:
			return { ...state, modal: false, waiting: false };

		default:
			return state;
	}
};
