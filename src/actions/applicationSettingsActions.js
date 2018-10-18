import axios from "axios";

import { CHANGE_CURRENCY, OPEN_SETTINGS_MODAL, CLOSE_SETTINGS_MODAL, GET_EXCHANGE_RATES, GET_EXCHANGE_RATES_WAITING, FULLSCREEN_MODE } from "./types";

export const openModal = () => {
	return { type: OPEN_SETTINGS_MODAL };
};

export const closeModal = () => {
	return { type: CLOSE_SETTINGS_MODAL };
};

export const changeCurrency = currency => {
	document.cookie = `currency=${currency}`;

	return { type: CHANGE_CURRENCY, currency };
};

export const getExchangeRates = () => dispatch => {
	dispatch(waiting());

	axios({
		url: "/api/get-exchange-rates",
		method: "head",
		withCredentials: true,
		headers: {
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Allow-Methods": "POST, HEAD",
			"Access-Control-Allow-Credentials": true,
			"Access-Control-Allow-Origin": " http://localhost:3000"
		}
	})
		.then(() => {
			let exchangeRates;

			decodeURIComponent(document.cookie)
				.split("; ")
				.forEach(el => {
					if (/exchange-rates/.test(el)) {
						try {
							exchangeRates = JSON.parse(el.replace("exchange-rates=", ""));
						} catch (error) {
							exchangeRates = null;
							document.cookie = "currency=UAH";
							document.cookie = "exchange-rates=null";
						}
					}
				});

			dispatch({ type: GET_EXCHANGE_RATES, exchangeRates });
		})
		.catch(err => {
			console.log(err);
			dispatch({ type: GET_EXCHANGE_RATES, exchangeRates: null, message: "Ошибка базы данных!" });
		});
};

export const fullscreenMode = enable => {
	return { type: FULLSCREEN_MODE, fullscreen: enable };
};

const waiting = () => {
	return { type: GET_EXCHANGE_RATES_WAITING };
};
