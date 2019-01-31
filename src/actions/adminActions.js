import {
	ADMIN_GET_PRODUCT_ITEM_AVAILABLE_CATEGORIES,
	ADMIN_GET_PRODUCT_ITEM_AVAILABLE_CATEGORIES_WAITING,
	ADMIN_PRODUCT_ITEM_CREATE,
	ADMIN_PRODUCT_ITEM_CREATE_WAITING,
	ADMIN_GET_EXCHANGE_RATES,
	ADMIN_GET_EXCHANGE_RATES_WAITING,
	ADMIN_UPDATE_EXCHANGE_RATES,
	ADMIN_UPDATE_EXCHANGE_RATES_WAITING
} from "./types";
import axios from "axios";

export const ADMIN_getProductItemAvailableCategories = () => dispatch => {
	dispatch(getProductItemAvailableCategoriesWaiting());

	setTimeout(() => {
		dispatch({
			type: ADMIN_GET_PRODUCT_ITEM_AVAILABLE_CATEGORIES,
			productItemAvailableCategories: ["kuku", "bubu", "lala", "akuku"],
			productItemGetAvailableCategoriesError: false
		});
	}, 2000);
};

export const ADMIN_productItemCreate = newProductItem => dispatch => {
	dispatch(productItemCreateWaiting());

	axios
		.post("api/admin/goods/add-product-item", newProductItem)
		.then(({ data }) => {
			dispatch({
				type: ADMIN_PRODUCT_ITEM_CREATE,
				productItemCreateResultMessage: data.message,
				productItemCreateError: false,
				productItemCreateURL: data.productURL
			});
		})
		.catch(err => {
			dispatch({
				type: ADMIN_PRODUCT_ITEM_CREATE,
				productItemCreateResultMessage: err.message,
				productItemCreateError: true,
				productItemCreateURL: null
			});
		});
};

export const ADMIN_updateExchangeRates = () => dispatch => {
	dispatch(updateWaiting());

	axios
		.post("/api/admin/update-exchange-rates")
		.then(({ data }) => {
			dispatch({ type: ADMIN_UPDATE_EXCHANGE_RATES, exchangeRates: data.rates, message: data.message });
		})
		.catch(() => {
			dispatch({ type: ADMIN_UPDATE_EXCHANGE_RATES, message: "Не удается подключиться к базе данных! Повторите позже!" });
		});
};

export const ADMIN_getExchangeRates = () => dispatch => {
	dispatch(getWaiting());

	axios
		.post("/api/admin/get-exchange-rates")
		.then(({ data }) => {
			dispatch({ type: ADMIN_GET_EXCHANGE_RATES, exchangeRates: data });
		})
		.catch(() => {
			dispatch({ type: ADMIN_GET_EXCHANGE_RATES, exchangeRates: null, message: "Ошибка! Повторите позже!" });
		});
};

const productItemCreateWaiting = () => {
	return { type: ADMIN_PRODUCT_ITEM_CREATE_WAITING };
};

const getProductItemAvailableCategoriesWaiting = () => {
	return { type: ADMIN_GET_PRODUCT_ITEM_AVAILABLE_CATEGORIES_WAITING };
};

const getWaiting = () => {
	return { type: ADMIN_GET_EXCHANGE_RATES_WAITING };
};

const updateWaiting = () => {
	return { type: ADMIN_UPDATE_EXCHANGE_RATES_WAITING };
};
