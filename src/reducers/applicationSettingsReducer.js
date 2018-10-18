import {
	CHANGE_CURRENCY,
	OPEN_SETTINGS_MODAL,
	CLOSE_SETTINGS_MODAL,
	GET_EXCHANGE_RATES,
	GET_EXCHANGE_RATES_WAITING,
	FULLSCREEN_MODE
} from "../actions/types";

let exchangeRates = null;
let currency = "UAH";

decodeURIComponent(document.cookie)
	.split("; ")
	.forEach(el => {
		let stop = false;

		if (/exchange-rates/.test(el)) {
			try {
				exchangeRates = JSON.parse(el.replace("exchange-rates=", ""));
			} catch (error) {
				exchangeRates = null;
				currency = "UAH";
				document.cookie = "exchange-rates=null";
				document.cookie = "currency=UAH";
				stop = true;
			}
		}
		if (/currency/.test(el) && !stop) {
			currency = el.replace("currency=", "");
		}
	});

const initialState = {
	modal: false,
	currency,
	exchangeRates,
	waiting: false,
	message: null,
	fullscreen: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_CURRENCY:
			return { ...state, currency: action.currency };

		case OPEN_SETTINGS_MODAL:
			return { ...state, modal: true };

		case GET_EXCHANGE_RATES:
			return { ...state, exchangeRates: action.exchangeRates, waiting: false, message: action.message };

		case GET_EXCHANGE_RATES_WAITING:
			return { ...state, waiting: true };

		case CLOSE_SETTINGS_MODAL:
			return { ...state, modal: false, waiting: false };

		case FULLSCREEN_MODE:
			return { ...state, fullscreen: action.fullscreen };

		default:
			return state;
	}
};
