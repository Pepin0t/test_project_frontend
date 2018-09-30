import React, { Component } from "react";
import styled from "styled-components";

import Error404Img from "../../../images/NotFound.png";

// styled components -------------------------

const ErrorWrapper = styled.div`
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledError404Img = styled.img.attrs({
	src: Error404Img,
	alt: "..."
})`
	margin-bottom: 50px;
	width: 100%;
`;

// -------------------------------------------

class NotFound extends Component {
	render() {
		return (
			<ErrorWrapper>
				<StyledError404Img />
				<div>Page not found...</div>
			</ErrorWrapper>
		);
	}
}

export default NotFound;
