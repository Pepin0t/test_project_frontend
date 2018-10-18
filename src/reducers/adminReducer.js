import {
	ADMIN_GET_EXCHANGE_RATES,
	ADMIN_UPDATE_EXCHANGE_RATES,
	ADMIN_GET_EXCHANGE_RATES_WAITING,
	ADMIN_UPDATE_EXCHANGE_RATES_WAITING
} from "../actions/types";

const initialState = {
	exchangeRates: null,
	message: null,
	getWaiting: false,
	updateWaiting: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADMIN_GET_EXCHANGE_RATES:
			return { ...state, exchangeRates: action.exchangeRates, message: action.message, getWaiting: false };

		case ADMIN_GET_EXCHANGE_RATES_WAITING:
			return { ...state, getWaiting: true };

		case ADMIN_UPDATE_EXCHANGE_RATES:
			return { ...state, exchangeRates: action.exchangeRates, message: action.message, updateWaiting: false };

		case ADMIN_UPDATE_EXCHANGE_RATES_WAITING:
			return { ...state, updateWaiting: true };
		default:
			return state;
	}
};
