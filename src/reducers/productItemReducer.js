import { OPEN_PRODUCT_ITEM_MODAL, PRODUCT_ITEM_SERVER_ERROR, LOADING_ITEM_FULL_DESCRIPTION } from "../actions/types";

const initialState = {
	fullDescription: {},
	loading: false,
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case OPEN_PRODUCT_ITEM_MODAL:
			return {
				...state,
				fullDescription: action.fullDescription,
				loading: false,
				error: null
			};

		case LOADING_ITEM_FULL_DESCRIPTION:
			return { ...state, loading: true, error: null };

		case PRODUCT_ITEM_SERVER_ERROR:
			return { ...state, error: action.error, loading: false };

		default:
			return state;
	}
};
