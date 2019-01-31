import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, userIcon } from "../../../../images/SVG/icons.js";

const UserButton = ({ location, history }) => {
	return (
		<Button
			onClick={() => {
				history.push({
					pathname: "/content/user-account",
					from: location.pathname
				});
			}}
		>
			<UserIcon />
		</Button>
	);
};

UserButton.propTypes = {
	location: PropTypes.object,
	history: PropTypes.object
};

export default withRouter(UserButton);

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
