import React, { Component } from "react";
import styled from "styled-components";

import { IconConstructor, fbIcon, vkIcon, instIcon } from "../images/SVG/icons";

// styled-components ----------------------------------

const FooterWrapper = styled.footer`
	min-height: 50px;
	margin-top: 15px;
	flex-grow: 0;
	width: 100%;
	background-color: #959595;
`;

const FooterContainer = styled.div`
	padding-left: 15px;
	padding-right: 15px;
	width: 1140px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 1140px) {
		position: absolute;
		width: 100%;
	}
`;

const SocialIcons = styled.div`
	height: 50px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const FbIcon = styled(IconConstructor).attrs({
	body: fbIcon,
	viewBox: "-6 0 56 56"
})`
	margin-left: 15px;
	fill: #fff;
	transition: fill ease 300ms;

	:hover {
		fill: #3b5998;
	}
`;

const VkIcon = styled(IconConstructor).attrs({
	body: vkIcon,
	viewBox: "0 0 24 24"
})`
	margin-left: 15px;
	fill: #fff;
	transition: fill ease 300ms;

	:hover {
		fill: #45668e;
	}
`;

const InstIcon = styled(IconConstructor).attrs({
	body: instIcon,
	viewBox: "80 160 320 320"
})`
	margin-left: 15px;
	fill: #fff;
	transition: fill ease 300ms;

	:hover {
		fill: #f77737;
	}

	#back {
		fill: #fff;
		transition: fill-opacity ease 300ms;
	}

	:hover #back {
		fill-opacity: 1;
	}
`;

// ----------------------------------------------------

class Footer extends Component {
	render() {
		return (
			<FooterWrapper>
				<FooterContainer>
					<div style={{ color: "#fff" }}>Pepinot 2018</div>
					<SocialIcons>
						<a
							href="https://www.facebook.com/profile.php?id=100004222800312"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FbIcon />
						</a>
						<a
							href="https://vk.com/id88387616"
							target="_blank"
							rel="noopener noreferrer"
						>
							<VkIcon />
						</a>
						<a
							href="https://www.instagram.com/skripka2700/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<InstIcon />
						</a>
					</SocialIcons>
				</FooterContainer>
			</FooterWrapper>
		);
	}
}

export default Footer;
