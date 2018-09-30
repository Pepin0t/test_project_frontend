import { OPEN_PRODUCT_ITEM_MODAL, SEND_PRODUCT_ITEM_TO_CART, CLOSE_PRODUCT_ITEM_MODAL } from "../actions/types";

const initialState = {
	modal: false,
	fullDescription: {},
	alreadyInCart: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case OPEN_PRODUCT_ITEM_MODAL:
			return {
				...state,
				modal: true,
				alreadyInCart: action.alreadyInCart,
				fullDescription: action.fullDescription
			};

		case SEND_PRODUCT_ITEM_TO_CART:
			return { ...state, alreadyInCart: true };

		case CLOSE_PRODUCT_ITEM_MODAL:
			return { ...state, modal: false, loading: false };

		default:
			return state;
	}
};
