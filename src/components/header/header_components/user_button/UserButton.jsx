import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, userIcon } from "../../../../images/SVG/icons.js";

// actions
import { openAuthPage } from "../../../../actions/transitionsActions";

const UserButton = ({ openAuthPage }) => {
	return (
		<Button onClick={openAuthPage} onTransitionEnd={e => e.stopPropagation()}>
			<UserIcon /> {"Войдите"}
		</Button>
	);
};

UserButton.propTypes = {
	openAuthPage: PropTypes.func,
	location: PropTypes.object,
	history: PropTypes.object
};

export default connect(
	null,
	{ openAuthPage }
)(UserButton);

// styled components -------------------------------------------

const Button = styled.div`
	${props => (props.theme.desktop ? desktop.userButton : mobile.userButton)};
`;

const UserIcon = styled(IconConstructor).attrs({
	body: userIcon,
	viewBox: "1 1 24 24"
})`
	${props => (props.theme.desktop ? desktop.userIcon : mobile.userIcon)};
`;

// --------------------------------------------------------------
