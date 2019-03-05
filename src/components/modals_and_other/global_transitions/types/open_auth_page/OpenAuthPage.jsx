import React, { useRef } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

const OpenAuthPage = ({ transitionProps, finished, history, location }) => {
	const rayRef = useRef(null);
	const farLeafRef = useRef(null);
	const nearLeafRef = useRef(null);

	return (
		<Container>
			<Curtain id="left">Подождите...</Curtain>
			<Curtain
				id="right"
				onAnimationEnd={e => {
					if (e.animationName === "full-blackout") {
						rayRef.current.classList.add("done");
						farLeafRef.current.classList.add("done");
						nearLeafRef.current.classList.add("done");
					}
				}}
			/>
			<Ray ref={rayRef} />
			<Leaf ref={farLeafRef} id="far" />
			<Leaf
				ref={nearLeafRef}
				id="near"
				onTransitionEnd={() => {
					history.push({
						pathname: "/auth",
						from: location.pathname
					});

					finished();
				}}
			/>
		</Container>
	);
};

OpenAuthPage.propTypes = {
	finished: PropTypes.func,
	transitionProps: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object
};

export default withRouter(OpenAuthPage);

// styled-components -------------------------------------

const Container = styled.div`
	${props => (props.theme.desktop ? desktop.container : mobile.container)};
`;

const Curtain = styled.div`
	${props => (props.theme.desktop ? desktop.curtain : mobile.curtain)};
`;

const Ray = styled.div`
	${props => (props.theme.desktop ? desktop.ray : mobile.ray)};
`;

const Leaf = styled.div`
	${props => (props.theme.desktop ? desktop.leaf : mobile.leaf)};
`;
