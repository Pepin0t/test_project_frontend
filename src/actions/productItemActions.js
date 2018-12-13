import { OPEN_PRODUCT_ITEM_MODAL, LOADING_ITEM_FULL_DESCRIPTION, PRODUCT_ITEM_SERVER_ERROR } from "../actions/types";
import axios from "axios";

export const getProductItemFullDescription = productId => dispatch => {
	dispatch(loading());

	axios({
		method: "post",
		url: "/api/goods/product-item",
		timeout: 5000,
		data: { productId }
	})
		.then(({ data }) => {
			dispatch({ type: OPEN_PRODUCT_ITEM_MODAL, fullDescription: data });
		})
		.catch(() => {
			dispatch(serverError("Ошибка! Повторите позже!"));
		});
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
