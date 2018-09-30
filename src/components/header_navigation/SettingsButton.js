import React, { Component } from "react";
import { connect } from "react-redux";

// styles
import styled from "styled-components";

// icons
import { IconConstructor, settingsIcon } from "../../images/SVG/icons.js";

// actions
import { openModal } from "../../actions/applicationSettingsActions";

// styled components -------------------------
const SettingsIcon = styled(IconConstructor).attrs({
	body: settingsIcon,
	viewBox: "0 0 512 512"
})`
	fill: #fff;
	transition: fill ease 250ms;
`;

const Button = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	box-sizing: content-box;
	padding: 0 15px;
	transition: background-color ease 250ms;
	background-color: #959595;
	color: #fff;

	:hover {
		background-color: #fff;
	}
	:hover ${SettingsIcon} {
		fill: #959595;
	}
`;

// -------------------------------------------

class SettingsButton extends Component {
	render() {
		return (
			<Button onClick={this.props.openModal}>
				<SettingsIcon />
			</Button>
		);
	}
}

export default connect(
	null,
	{ openModal }
)(SettingsButton);
