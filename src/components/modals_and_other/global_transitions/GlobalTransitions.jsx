import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// components
import CloseAuthPage from "./types/close_auth_page/CloseAuthPage";
import OpenAuthPage from "./types/open_auth_page/OpenAuthPage";

// actions
import { transitionEnd } from "../../../actions/transitionsActions";

const GlobalTransitions = ({ transitionType, transitionProps, transitionEnd }) => {
	switch (transitionType) {
		case "open-auth-page": {
			return <OpenAuthPage transitionProps={transitionProps} finished={transitionEnd} />;
		}

		case "close-auth-page": {
			return <CloseAuthPage transitionProps={transitionProps} finished={transitionEnd} />;
		}

		default:
			return null;
	}
};

GlobalTransitions.propTypes = {
	transitionEnd: PropTypes.func,
	transitionProps: PropTypes.object,
	transitionType: PropTypes.string
};
const mapStateToProps = store => ({
	transitionType: store.transitions.transitionType,
	transitionProps: store.transitions.transitionProps
});

export default connect(
	mapStateToProps,
	{ transitionEnd }
)(GlobalTransitions);
