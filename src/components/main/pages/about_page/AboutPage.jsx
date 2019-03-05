import React, { Component } from "react";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

class AboutPage extends Component {
	componentDidMount() {
		this.props.ready(true);
	}

	render() {
		return (
			<Container>
				<div>About us...</div>
			</Container>
		);
	}
}

export default AboutPage;

// styled components -------------------------

const Container = styled.div`
	${props => (props.theme.desktop ? desktop.container : mobile.container)};
`;

// -------------------------------------------
