import { GET_ITEMS, GET_MORE_ITEMS, LOADING_ITEMS, SERVER_ERROR } from "../actions/types";

const initialState = {
	items: [],
	loading: false,
	hasMore: true,
	error: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ITEMS:
			return {
				...state,
				items: action.data,
				loading: false,
				error: false,
				hasMore: true
			};

		case GET_MORE_ITEMS:
			return {
				...state,
				items: action.data,
				loading: false,
				hasMore: action.hasMore,
				error: false
			};

		case LOADING_ITEMS:
			return { ...state, loading: true, error: false };

		case SERVER_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false
			};

		default:
			return state;
	}
}
