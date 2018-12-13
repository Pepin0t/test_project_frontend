import React from "react";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// images
import Error404Img from "../../../../images/NotFound.png";

const NotFound = () => {
	return (
		<ErrorWrapper>
			<StyledError404Img />
		</ErrorWrapper>
	);
};

export default NotFound;

// styled components -------------------------

const ErrorWrapper = styled.div`
	${props => (props.theme.desktop ? desktop.errorWrapper : mobile.errorWrapper)};
`;

const StyledError404Img = styled.img.attrs({
	src: Error404Img,
	alt: "..."
})`
	${props => (props.theme.desktop ? desktop.styledError404Img : mobile.styledError404Img)};
`;

// -------------------------------------------
