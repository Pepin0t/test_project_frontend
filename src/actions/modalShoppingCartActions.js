import axios from "axios";

import { OPEN_CART_MODAL, CLOSE_CART_MODAL, SEND_CART_FORM, SEND_CART_FORM_WAITING, PREPARE_TO_BUY } from "./types";

export const openModal = () => {
	return { type: OPEN_CART_MODAL };
};

export const closeModal = () => {
	return { type: CLOSE_CART_MODAL };
};

export const showForm = show => {
	return { type: PREPARE_TO_BUY, show };
};

export const sendCartForm = (info, somethingWrong) => dispatch => {
	if (somethingWrong) {
		dispatch({
			type: SEND_CART_FORM,
			message: somethingWrong
		});
	} else {
		dispatch(waiting());

		const { REACT_APP_TELEGRAM_GROUP_CHAT_ID, REACT_APP_TELEGRAM_TOKEN } = process.env;

		axios
			.get(
				`https://api.telegram.org/bot${REACT_APP_TELEGRAM_TOKEN}/sendMessage?chat_id=${REACT_APP_TELEGRAM_GROUP_CHAT_ID}&parse_mode=html&text=${info}`
			)
			.then(({ data }) => {
				dispatch({
					type: SEND_CART_FORM,
					message: "Ваш заказ оформлен! Спасибо за покупку!",
					orderIsProcessed: data.ok
				});
			})
			.then(() => {
				const key = "shopping-list";
				localStorage.removeItem(key);
			})
			.catch(err => {
				dispatch({
					type: SEND_CART_FORM,
					message: "Ошибка! Попробуйте еще раз!"
				});
			});
	}
};

export const deleteItemFromCart = item => {
	const key = "shopping-list";
	let prevLocalStorage = [];
	try {
		prevLocalStorage = JSON.parse(localStorage.getItem(key));
	} catch (error) {
		localStorage.clear();
	}

	const newLocalStorage = JSON.stringify(prevLocalStorage.filter(({ productId }) => productId !== item));
	localStorage.setItem(key, newLocalStorage);

	return { type: null, newLocalStorage };
};

const waiting = () => {
	return { type: SEND_CART_FORM_WAITING };
};
