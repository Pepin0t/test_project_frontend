import { OPEN_AUTH_PAGE, CLOSE_AUTH_PAGE, CHANGE_CONTENT_PAGE, TRANSITION_END } from "../actions/types";

const initialState = {
	transitionType: null,
	transitionProps: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case OPEN_AUTH_PAGE: {
			return {
				...state,
				transitionType: action.transitionType,
				transitionProps: action.transitionProps
			};
		}

		case CLOSE_AUTH_PAGE: {
			return {
				...state,
				transitionType: action.transitionType,
				transitionProps: action.transitionProps
			};
		}

		case CHANGE_CONTENT_PAGE: {
			return {
				...state,
				transitionType: action.transitionType,
				transitionProps: action.transitionProps
			};
		}

		case TRANSITION_END: {
			return {
				...state,
				transitionType: null
			};
		}

		default:
			return state;
	}
};
