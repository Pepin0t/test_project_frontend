import { OPEN_PRODUCT_ITEM_MODAL, GET_PRODUCT_ITEM_FULL_DESCRIPTION } from "../actions/types";
import axios from "axios";

export const getProductItemFullDescription = productId => {
	const request = (resolve, reject) => {
		axios({
			method: "post",
			url: "/api/goods/product-item",
			timeout: 5000,
			data: { productId }
		})
			.then(({ data }) => {
				resolve(data);
			})
			.catch(err => {
				reject(err.toString());
			});
	};

	const loading = new Promise((resolve, reject) => {
		request(resolve, reject);
	});

	return { type: GET_PRODUCT_ITEM_FULL_DESCRIPTION, loading };
};

export const openModal = readyToStartModalAnimation => {
	return { type: OPEN_PRODUCT_ITEM_MODAL, readyToStartModalAnimation };
};
