import {
	ADMIN_GET_PRODUCT_ITEM_AVAILABLE_CATEGORIES,
	ADMIN_GET_PRODUCT_ITEM_AVAILABLE_CATEGORIES_WAITING,
	ADMIN_PRODUCT_ITEM_CREATE,
	ADMIN_PRODUCT_ITEM_CREATE_WAITING,
	ADMIN_GET_EXCHANGE_RATES,
	ADMIN_UPDATE_EXCHANGE_RATES,
	ADMIN_GET_EXCHANGE_RATES_WAITING,
	ADMIN_UPDATE_EXCHANGE_RATES_WAITING
} from "../actions/types";

const initialState = {
	productItemGetAvailableCategoriesWaiting: false,
	productItemAvailableCategories: null,
	productItemGetAvailableCategoriesError: undefined,

	productItemCreateWaiting: false,
	productItemCreateResultMessage: null,
	productItemCreateError: undefined,
	productItemCreateURL: null,

	exchangeRates: null,
	message: null,
	getWaiting: false,
	updateWaiting: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADMIN_GET_PRODUCT_ITEM_AVAILABLE_CATEGORIES:
			return {
				...state,
				productItemGetAvailableCategoriesWaiting: false,
				productItemAvailableCategories: action.productItemAvailableCategories,
				productItemGetAvailableCategoriesError: action.productItemGetAvailableCategoriesError
			};

		case ADMIN_GET_PRODUCT_ITEM_AVAILABLE_CATEGORIES_WAITING:
			return {
				...state,
				productItemGetAvailableCategoriesWaiting: true,
				productItemAvailableCategories: null,
				productItemGetAvailableCategoriesError: undefined
			};

		case ADMIN_PRODUCT_ITEM_CREATE:
			return {
				...state,
				productItemCreateWaiting: false,
				productItemCreateResultMessage: action.productItemCreateResultMessage,
				productItemCreateError: action.productItemCreateError,
				productItemCreateURL: action.productItemCreateURL
			};

		case ADMIN_PRODUCT_ITEM_CREATE_WAITING:
			return {
				...state,
				productItemCreateWaiting: true,
				productItemCreateResultMessage: null,
				productItemCreateError: undefined,
				productItemCreateURL: null
			};

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
