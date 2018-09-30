import React, { Component } from "react";
import banner from "../../images/banner.jpg";
import styled from "styled-components";

// styled components -------------------------

const Container = styled.div`
	position: relative;
	margin: 0 auto;
	width: 1140px;
	z-index: 0;

	@media (max-width: 1140px) {
		width: 100%;
	}
`;

const StyledBanner = styled.img.attrs({
	alt: "..."
})`
	width: 100%;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;

	@media (max-width: 1140px) {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
`;

const Contacts = styled.div`
	position: absolute;
	top: 15px;
	left: 15px;
`;
// -------------------------------------------

class Banner extends Component {
	render() {
		return (
			<Container>
				<Contacts>Телефон: 099-221-XX-XX</Contacts>
				<StyledBanner src={banner} />
			</Container>
		);
	}
}

export default Banner;
