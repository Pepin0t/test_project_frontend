import { OPEN_SETTINGS_MODAL, CLOSE_SETTINGS_MODAL, FULLSCREEN_MODE } from "./types";

export const openModal = () => {
	return { type: OPEN_SETTINGS_MODAL };
};

export const closeModal = () => {
	return { type: CLOSE_SETTINGS_MODAL };
};

export const fullscreenMode = enable => {
	return { type: FULLSCREEN_MODE, fullscreen: enable };
};
