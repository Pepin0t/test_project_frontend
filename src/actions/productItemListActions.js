import {
	GET_ITEMS,
	GET_MORE_ITEMS,
	LOADING_ITEMS,
	SERVER_ERROR
} from "../actions/types";
import axios from "axios";

export const getItems = () => dispatch => {
	dispatch(loading());

	// тут будут новые товары

	axios({ method: "get", url: "/goods", timeout: 5000 })
		.then(({ data }) => {
			let newestItems = data.slice(0, 12);

			dispatch({
				type: GET_ITEMS,
				data: newestItems
			});
		})
		.catch(err => {
			if (err) {
				dispatch(serverError(err));
			}
		});
};

export const getMore = count => dispatch => {
	dispatch(loading());

	axios({
		method: "post",
		url: "/goods",
		timeout: 5000,
		data: { from: 0, to: count }
	})
		.then(({ data }) => {
			dispatch({
				type: GET_MORE_ITEMS,
				data,
				hasMore: data.length < count ? false : true
			});
		})
		.catch(err => {
			if (err) {
				dispatch(serverError(err));
			}
		});
};

const loading = () => {
	return {
		type: LOADING_ITEMS
	};
};

const serverError = error => {
	return {
		type: SERVER_ERROR,
		payload: error
	};
};
