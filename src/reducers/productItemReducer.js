import { OPEN_PRODUCT_ITEM_MODAL, SEND_PRODUCT_ITEM_TO_CART, PRODUCT_ITEM_SERVER_ERROR, LOADING_ITEM_FULL_DESCRIPTION } from "../actions/types";

const initialState = {
	fullDescription: {},
	alreadyInCart: false,
	loading: false,
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case OPEN_PRODUCT_ITEM_MODAL:
			return {
				...state,
				alreadyInCart: action.alreadyInCart,
				fullDescription: action.fullDescription,
				loading: false,
				error: null
			};

		case LOADING_ITEM_FULL_DESCRIPTION:
			return { ...state, loading: true, error: null };

		case PRODUCT_ITEM_SERVER_ERROR:
			return { ...state, error: action.error, loading: false };

		case SEND_PRODUCT_ITEM_TO_CART:
			return { ...state, alreadyInCart: true };

		default:
			return state;
	}
};
