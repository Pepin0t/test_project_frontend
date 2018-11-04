import { OPEN_SETTINGS_MODAL, CLOSE_SETTINGS_MODAL, FULLSCREEN_MODE } from "../actions/types";

const initialState = {
	modal: false,
	message: null,
	fullscreen: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case OPEN_SETTINGS_MODAL:
			return { ...state, modal: true };

		case CLOSE_SETTINGS_MODAL:
			return { ...state, modal: false };

		case FULLSCREEN_MODE:
			return { ...state, fullscreen: action.fullscreen };

		default:
			return state;
	}
};
