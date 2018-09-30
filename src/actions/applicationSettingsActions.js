import axios from "axios";

import { CHANGE_CURRENCY, OPEN_SETTINGS_MODAL, CLOSE_SETTINGS_MODAL, GET_EXCHANGE_RATES, GET_EXCHANGE_RATES_WAITING } from "./types";

export const openModal = () => dispatch => {
	dispatch({ type: OPEN_SETTINGS_MODAL });
	dispatch(waiting());

	axios
		.post("/api/get-exchange-rates", {})
		.then(({ data }) => {
			// console.log(data);
			dispatch({ type: GET_EXCHANGE_RATES, exchangeRates: data });
		})
		.catch(err => {
			console.log("error");
			dispatch({ type: GET_EXCHANGE_RATES, exchangeRates: null });
		});
};

export const closeModal = () => {
	return { type: CLOSE_SETTINGS_MODAL };
};

export const changeCurrency = currency => {
	localStorage.setItem("currency", currency);

	return { type: CHANGE_CURRENCY, currency };
};

const waiting = () => {
	return { type: GET_EXCHANGE_RATES_WAITING };
};
