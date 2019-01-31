import React from "react";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

const NotFound = () => {
	return <ErrorWrapper>Нет такой страницы...</ErrorWrapper>;
};

export default NotFound;

// styled components -------------------------

const ErrorWrapper = styled.div`
	${props => (props.theme.desktop ? desktop.errorWrapper : mobile.errorWrapper)};
`;

// -------------------------------------------
