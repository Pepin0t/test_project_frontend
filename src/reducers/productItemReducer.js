import { OPEN_PRODUCT_ITEM_MODAL, GET_PRODUCT_ITEM_FULL_DESCRIPTION } from "../actions/types";

export default (state = {}, action) => {
	switch (action.type) {
		case OPEN_PRODUCT_ITEM_MODAL:
			return { ...state, readyToStartModalAnimation: action.readyToStartModalAnimation };

		case GET_PRODUCT_ITEM_FULL_DESCRIPTION:
			return {
				...state,
				loading: action.loading
			};

		default:
			return state;
	}
};
