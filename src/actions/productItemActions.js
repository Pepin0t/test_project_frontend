import { OPEN_PRODUCT_ITEM_MODAL, CLOSE_PRODUCT_ITEM_MODAL, SEND_PRODUCT_ITEM_TO_CART } from "../actions/types";

export const openModal = fullDescription => {
	const alreadyInCart = checkCart(fullDescription.title).alreadyInCart;

	return { type: OPEN_PRODUCT_ITEM_MODAL, alreadyInCart, fullDescription };
};

export const closeModal = () => {
	return { type: CLOSE_PRODUCT_ITEM_MODAL };
};

export const checkCart = id => {
	// еще нужно привязать БД для зарегистрированных пользователей

	const key = "shopping-list";
	const storage = JSON.parse(localStorage.getItem(key)) || [];
	let alreadyInCart = false;

	storage.forEach(({ title }) => {
		if (title === id) {
			alreadyInCart = true;
		}
	});

	return { type: null, alreadyInCart };
};

export const sendToCart = info => {
	const key = "shopping-list";
	const { title, images, price } = info;
	const prevLocalStorage = JSON.parse(localStorage.getItem(key)) || [];

	localStorage.setItem(key, JSON.stringify(prevLocalStorage.concat([{ title, img: images[0], price }])));
	return { type: SEND_PRODUCT_ITEM_TO_CART };
};
