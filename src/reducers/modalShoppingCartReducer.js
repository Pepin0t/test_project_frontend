import { CLOSE_CART_MODAL, GET_SHOPPING_LIST, SEND_CART_FORM, SEND_CART_FORM_WAITING, PREPARE_TO_BUY } from "../actions/types";

const initialState = {
	shoppingList: {},
	messageToUser: null,
	orderIsProcessed: false,
	waitingResponse: false,
	cartForm: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CLOSE_CART_MODAL:
			return {
				...state,
				messageToUser: null,
				orderIsProcessed: false,
				waitingResponse: false,
				cartForm: false
			};

		case GET_SHOPPING_LIST:
			return { ...state, shoppingList: action.shoppingList };

		case PREPARE_TO_BUY:
			return { ...state, cartForm: action.show };

		case SEND_CART_FORM_WAITING:
			return { ...state, waitingResponse: true };

		case SEND_CART_FORM:
			return {
				...state,
				messageToUser: action.message,
				orderIsProcessed: action.orderIsProcessed,
				waitingResponse: false
			};
		default:
			return state;
	}
};
