import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, settingsIcon } from "../../../../images/SVG/icons.js";

// actions
import { openModal } from "../../../../actions/applicationSettingsActions";

const SettingsButton = ({ openModal }) => {
	return (
		<Button onClick={openModal}>
			<SettingsIcon />
		</Button>
	);
};

SettingsButton.propTypes = {
	openModal: PropTypes.func
};

export default connect(
	null,
	{ openModal }
)(SettingsButton);

// styled components -------------------------

const SettingsIcon = styled(IconConstructor).attrs({
	body: settingsIcon,
	viewBox: "0 0 512 512"
})`
	${props => (props.theme.desktop ? desktop.settingsIcon : mobile.settingsIcon)};
`;

const Button = styled.div`
	${props => (props.theme.desktop ? desktop.button : mobile.button)};
`;

// -------------------------------------------
