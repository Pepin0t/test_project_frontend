import { OPEN_PRODUCT_ITEM_MODAL, LOADING_ITEM_FULL_DESCRIPTION, PRODUCT_ITEM_SERVER_ERROR, SEND_PRODUCT_ITEM_TO_CART } from "../actions/types";
import axios from "axios";

export const getProductItemFullDescription = productId => dispatch => {
	dispatch(loading());

	let currency;

	document.cookie.split(";").forEach(coo => {
		if (/^currency=/.test(coo)) {
			currency = coo.replace("currency=", "").trim();
		}
	});

	axios({
		method: "post",
		url: "/goods/product-item",
		timeout: 5000,
		data: { productId, currency }
	})
		.then(({ data }) => {
			const alreadyInCart = checkCart(productId).alreadyInCart;
			dispatch({ type: OPEN_PRODUCT_ITEM_MODAL, alreadyInCart, fullDescription: data });
		})
		.catch(err => {
			dispatch(serverError("Ошибка! Повторите позже!"));
		});
};

export const checkCart = id => {
	const key = "shopping-list";
	let storage = [];
	try {
		storage = JSON.parse(localStorage.getItem(key)) || [];
	} catch (error) {
		localStorage.clear();
	}

	let alreadyInCart = false;

	storage.forEach(({ productId }) => {
		if (productId === id) {
			alreadyInCart = true;
		}
	});

	return { type: null, alreadyInCart };
};

export const sendToCart = (info, currency) => {
	const { title, images, price, productId } = info;
	const key = "shopping-list";
	let prevLocalStorage = [];

	try {
		prevLocalStorage = JSON.parse(localStorage.getItem(key)) || [];
	} catch (error) {
		localStorage.clear();
	}

	localStorage.setItem(key, JSON.stringify(prevLocalStorage.concat([{ title, img: images, price, currency, productId }])));
	return { type: SEND_PRODUCT_ITEM_TO_CART };
};

const loading = () => {
	return {
		type: LOADING_ITEM_FULL_DESCRIPTION
	};
};

const serverError = error => {
	return {
		type: PRODUCT_ITEM_SERVER_ERROR,
		error
	};
};
