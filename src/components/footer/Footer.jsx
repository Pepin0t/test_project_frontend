import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// actions
import { IconConstructor, fbIcon, vkIcon, instIcon } from "../../images/SVG/icons";

class Footer extends Component {
	static propTypes = {
		fullscreen: PropTypes.bool
	};

	render() {
		return (
			<FooterWrapper fullscreen={this.props.fullscreen}>
				<FooterContainer>
					<div style={{ color: "#fff" }}>Pepinot 2018</div>
					<SocialIcons>
						<a href="https://www.facebook.com/profile.php?id=100004222800312" target="_blank" rel="noopener noreferrer">
							<FbIcon />
						</a>
						<a href="https://vk.com/id88387616" target="_blank" rel="noopener noreferrer">
							<VkIcon />
						</a>
						<a href="https://www.instagram.com/skripka2700/" target="_blank" rel="noopener noreferrer">
							<InstIcon />
						</a>
					</SocialIcons>
				</FooterContainer>
			</FooterWrapper>
		);
	}
}

const mapStateToProps = store => ({
	fullscreen: store.applicationSettings.fullscreen
});

export default connect(mapStateToProps)(Footer);

// styled-components ----------------------------------

const FooterWrapper = styled.footer`
	${props => (props.theme.desktop ? desktop.footerWrapper : mobile.footerWrapper)};
`;

const FooterContainer = styled.div`
	${props => (props.theme.desktop ? desktop.footerContainer : mobile.footerContainer)};
`;

const SocialIcons = styled.div`
	${desktop.socialIcons};
`;

const FbIcon = styled(IconConstructor).attrs({
	body: fbIcon,
	viewBox: "-6 0 56 56"
})`
	${props => (props.theme.desktop ? desktop.fbIcon : mobile.fbIcon)};
`;

const VkIcon = styled(IconConstructor).attrs({
	body: vkIcon,
	viewBox: "0 0 24 24"
})`
	${props => (props.theme.desktop ? desktop.vkIcon : mobile.vkIcon)};
`;

const InstIcon = styled(IconConstructor).attrs({
	body: instIcon,
	viewBox: "80 160 320 320"
})`
	${props => (props.theme.desktop ? desktop.instIcon : mobile.instIcon)};
`;

// ----------------------------------------------------
