import { GET_MORE_ITEMS, LOADING_ITEMS, SERVER_ERROR } from "../actions/types";
import axios from "axios";

export const getMoreItems = count => dispatch => {
	dispatch(loading());

	let currency;

	document.cookie.split(";").forEach(coo => {
		if (/^currency=/.test(coo)) {
			currency = coo.replace("currency=", "").trim();
		}
	});

	axios({
		method: "post",
		url: "/goods",
		timeout: 5000,
		data: { to: count, currency }
	})
		.then(({ data }) => {
			dispatch({
				type: GET_MORE_ITEMS,
				data,
				hasMore: data.length < count ? false : true,
				message: "Товаров больше нет!"
			});
		})
		.catch(err => {
			if (err) {
				dispatch(serverError("Произошла ошибка! Попробуйте позже!", "get_more_items"));
			}
		});
};

export const searchItems = (info, condition) => dispatch => {
	dispatch({
		type: GET_MORE_ITEMS,
		data: [],
		hasMore: true
	});

	dispatch(loading());

	let currency;

	document.cookie.split(";").forEach(coo => {
		if (/^currency=/.test(coo)) {
			currency = coo.replace("currency=", "").trim();
		}
	});

	axios({
		method: "post",
		url: "/goods/search/" + condition,
		timeout: 5000,
		data: { info, currency }
	})
		.then(({ data }) => {
			if (data.length) {
				dispatch({
					type: GET_MORE_ITEMS,
					data,
					hasMore: false,
					message: null
				});
			} else {
				dispatch({
					type: GET_MORE_ITEMS,
					data,
					hasMore: false,
					message: "По данному запросу ничего не найдено..."
				});
			}
		})
		.catch(err => {
			if (err) {
				dispatch(serverError("Произошла ошибка! Попробуйте позже!", "search_items"));
			}
		});
};

const loading = () => {
	return {
		type: LOADING_ITEMS
	};
};

const serverError = (error, whoIsGuilty) => {
	return {
		type: SERVER_ERROR,
		error,
		whoIsGuilty
	};
};
