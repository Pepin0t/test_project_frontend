import React, { Component } from "react";

// styles
import styled from "styled-components";

// components
import Sidebar from "./Sidebar";
import ItemList from "./ItemList";

// styled components -------------------------
const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Header = styled.header`
	font-size: 36px;
	margin-top: 15px;
`;

const Goods = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	margin-top: 15px;
	width: 100%;

	@media (max-width: 1140px) {
		flex-direction: column;
	}
`;

// -------------------------------------------
class GoodsPage extends Component {
	render() {
		return (
			<Container>
				<Header>Товары</Header>

				<Goods>
					<Sidebar />
					<ItemList />
				</Goods>
			</Container>
		);
	}
}

export default GoodsPage;
