import React, { Component } from "react";
import { connect } from "react-redux";

// styles
import styled from "styled-components";

// icons
import { IconConstructor, cartIcon } from "../../images/SVG/icons.js";

// actions
import { openModal } from "../../actions/modalShoppingCartActions";

// styled components -------------------------
const CartButton = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	box-sizing: content-box;
	padding: 0 15px;
	transition: background-color ease 250ms;
	background-color: #f1592a;

	:hover {
		background-color: #70bc7b;
	}

	@media (max-width: 400px) {
		padding: 0 10px;
	}
`;

const CartIcon = styled(IconConstructor).attrs({
	body: cartIcon,
	viewBox: "0 0 40 40"
})`
	fill: #fff;
	transform: translateX(-2px);
`;

// -------------------------------------------

class ShoppingCartButton extends Component {
	render() {
		return (
			<CartButton onClick={this.props.openModal}>
				<CartIcon />
			</CartButton>
		);
	}
}

export default connect(
	null,
	{ openModal }
)(ShoppingCartButton);
