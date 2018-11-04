import { OPEN_CART_MODAL, CLOSE_CART_MODAL, SEND_CART_FORM, SEND_CART_FORM_WAITING, PREPARE_TO_BUY } from "../actions/types";

const initialState = {
	modal: false,
	messageToUser: null,
	orderIsProcessed: false,
	waiting: false,
	cartForm: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case OPEN_CART_MODAL:
			return { ...state, modal: true };

		case CLOSE_CART_MODAL:
			return {
				...state,
				modal: false,
				messageToUser: null,
				orderIsProcessed: false,
				waiting: false,
				cartForm: false
			};

		case PREPARE_TO_BUY:
			return { ...state, cartForm: action.show };

		case SEND_CART_FORM_WAITING:
			return { ...state, waiting: true };

		case SEND_CART_FORM:
			return {
				...state,
				messageToUser: action.message,
				orderIsProcessed: action.orderIsProcessed,
				waiting: false
			};
		default:
			return state;
	}
};
