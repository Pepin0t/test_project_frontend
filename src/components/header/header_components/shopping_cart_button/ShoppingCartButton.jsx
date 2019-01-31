import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import queryString from "query-string";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, cartIcon } from "../../../../images/SVG/icons.js";

const ShoppingCartButton = ({ location }) => {
	return (
		<CartButton
			to={{ pathname: location.pathname + "/modal", search: queryString.stringify({ type: "shopping-cart" }), from: location.pathname }}
		>
			<CartIcon />
		</CartButton>
	);
};

ShoppingCartButton.propTypes = {
	location: PropTypes.object
};

export default withRouter(ShoppingCartButton);

// styled components -------------------------
const CartButton = styled(Link)`
	${props => (props.theme.desktop ? desktop.cartButton : mobile.cartButton)};
`;

const CartIcon = styled(IconConstructor).attrs({
	body: cartIcon,
	viewBox: "0 0 40 40"
})`
	${props => (props.theme.desktop ? desktop.cartIcon : mobile.cartIcon)};
`;

// -------------------------------------------
