import { GET_MORE_ITEMS, LOADING_ITEMS, SERVER_ERROR } from "../actions/types";

const initialState = {
	items: [],
	loading: false,
	hasMore: true,
	error: null,
	message: null,
	whoIsGuilty: "get_more_items"
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_MORE_ITEMS:
			return {
				...state,
				items: action.data,
				loading: false,
				hasMore: action.hasMore,
				message: action.message,
				error: null
			};

		case LOADING_ITEMS:
			return { ...state, loading: true, error: null };

		case SERVER_ERROR:
			return {
				...state,
				error: action.error,
				loading: false,
				whoIsGuilty: action.whoIsGuilty
			};

		default:
			return state;
	}
}
