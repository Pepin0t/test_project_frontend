import React from "react";
import PropTypes from "prop-types";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

const CloseAuthPage = ({ transitionProps, finished }) => {
	return (
		<Container>
			<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<mask id="Mask">
						<rect width="100%" height="100%" fill="#fff" />
						<Circle
							cx={transitionProps.coordinates.left + 20}
							cy={transitionProps.coordinates.top + 20}
							onAnimationEnd={e => {
								if (e.animationName === "expand") {
									finished();
								}
							}}
						/>
					</mask>
				</defs>

				<rect x="0" y="0" width="100%" height="100%" fill="black" mask="url(#Mask)" />
			</svg>
		</Container>
	);
};

CloseAuthPage.propTypes = {
	finished: PropTypes.func,
	transitionProps: PropTypes.object
};

export default CloseAuthPage;

// styled-components ---------------------------------

const Container = styled.div`
	${props => (props.theme.desktop ? desktop.container : mobile.container)};
`;

const Circle = styled.circle`
	${props => (props.theme.desktop ? desktop.circle : mobile.circle)};
`;
