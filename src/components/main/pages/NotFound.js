import React, { Component } from "react";

// styles
import styled from "styled-components";

// images
import Error404Img from "../../../images/NotFound.png";
import broken_glass from "../../../images/broken_glass.png";

// styled components -------------------------

const ErrorWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100%;
	min-width: 100%;
	background-image: url(${broken_glass});
	background-size: cover;
`;

const StyledError404Img = styled.img.attrs({
	src: Error404Img,
	alt: "..."
})`
	margin: auto;
	width: 640px;

	@media (max-width: 670px) {
		width: calc(100% - 30px);
	}
`;

// -------------------------------------------

class NotFound extends Component {
	render() {
		return (
			<ErrorWrapper>
				<StyledError404Img />
			</ErrorWrapper>
		);
	}
}

export default NotFound;
