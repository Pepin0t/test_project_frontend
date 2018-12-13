import { CLOSE_CART_MODAL, GET_SHOPPING_LIST, SEND_CART_FORM, SEND_CART_FORM_WAITING, PREPARE_TO_BUY } from "./types";

import shoppingCart_API from "../client_api/shoppingCart_API";

export const showForm = show => {
	return { type: PREPARE_TO_BUY, show };
};

export const getShoppingList = () => {
	const shoppingList = shoppingCart_API.getShoppingList();

	return { type: GET_SHOPPING_LIST, shoppingList };
};

export const sendCartForm = (info, somethingWrong) => dispatch => {
	if (somethingWrong) {
		dispatch({
			type: SEND_CART_FORM,
			message: somethingWrong
		});
	} else {
		dispatch(waitingResponse());

		shoppingCart_API.sendShoppingCartForm({ info }).then(res => {
			dispatch({
				type: SEND_CART_FORM,
				message: res.message,
				orderIsProcessed: res.ok
			});
		});
	}
};

const waitingResponse = () => {
	return { type: SEND_CART_FORM_WAITING };
};
