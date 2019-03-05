import { OPEN_AUTH_PAGE, CLOSE_AUTH_PAGE, CHANGE_CONTENT_PAGE, TRANSITION_END } from "./types";

export const openAuthPage = () => {
	return { type: OPEN_AUTH_PAGE, transitionType: "open-auth-page", transitionProps: {} };
};

export const closeAuthPage = coordinates => {
	return { type: CLOSE_AUTH_PAGE, transitionType: "close-auth-page", transitionProps: { coordinates } };
};

export const changeContentPage = pathname => {
	return { type: CHANGE_CONTENT_PAGE, transitionType: "change-content-page", transitionProps: { pathname } };
};

export const transitionEnd = () => {
	return { type: TRANSITION_END };
};
