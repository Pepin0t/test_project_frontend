import { OPEN_PRODUCT_ITEM_MODAL, CLOSE_PRODUCT_ITEM_MODAL, SEND_PRODUCT_ITEM_TO_CART } from "../actions/types";

export const openModal = fullDescription => {
	const alreadyInCart = checkCart(fullDescription.productId).alreadyInCart;

	return { type: OPEN_PRODUCT_ITEM_MODAL, alreadyInCart, fullDescription };
};

export const closeModal = () => {
	return { type: CLOSE_PRODUCT_ITEM_MODAL };
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

	localStorage.setItem(key, JSON.stringify(prevLocalStorage.concat([{ title, img: images[0], price, currency, productId }])));
	return { type: SEND_PRODUCT_ITEM_TO_CART };
};
