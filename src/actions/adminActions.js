import {
	ADMIN_GET_EXCHANGE_RATES,
	ADMIN_GET_EXCHANGE_RATES_WAITING,
	ADMIN_UPDATE_EXCHANGE_RATES,
	ADMIN_UPDATE_EXCHANGE_RATES_WAITING
} from "./types";
import axios from "axios";

export const ADMIN_updateExchangeRates = () => dispatch => {
	dispatch(updateWaiting());

	axios
		.post("/api/admin/update-exchange-rates", {})
		.then(({ data }) => {
			console.log(data);
			dispatch({ type: ADMIN_UPDATE_EXCHANGE_RATES, exchangeRates: data.rates, message: data.message });
		})
		.catch(err => {
			console.log(err);
			dispatch({ type: ADMIN_UPDATE_EXCHANGE_RATES, message: "Не удается подключиться к базе данных! Повторите позже!" });
		});
};

export const ADMIN_getExchangeRates = () => dispatch => {
	dispatch(getWaiting());

	axios({
		url: "/api/admin/get-exchange-rates",
		method: "post"
	})
		.then(({ data }) => {
			console.log(data);

			dispatch({ type: ADMIN_GET_EXCHANGE_RATES, exchangeRates: data });
		})
		.catch(err => {
			console.log(err);
			dispatch({ type: ADMIN_GET_EXCHANGE_RATES, exchangeRates: null, message: "Ошибка! Повторите позже!" });
		});
};

const getWaiting = () => {
	return { type: ADMIN_GET_EXCHANGE_RATES_WAITING };
};

const updateWaiting = () => {
	return { type: ADMIN_UPDATE_EXCHANGE_RATES_WAITING };
};
