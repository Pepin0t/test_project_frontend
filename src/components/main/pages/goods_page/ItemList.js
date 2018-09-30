import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import { IconConstructor, spinner } from "../../../../images/SVG/icons";

// actions
import { getItems, getMore } from "../../../../actions/productItemListActions";

import Item from "./Item";

// styled-components ---------------------------

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;

	@media (max-width: 1140px) {
		margin-top: 15px;
	}
`;

const CardContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
	flex-grow: 0;
	width: 920px;

	@media (max-width: 1140px) {
		width: 100%;
		justify-content: space-around;
	}
`;

const Footer = styled.div`
	min-height: 50px;
	margin: 30px auto;
`;

const LoadingIcon = styled(IconConstructor).attrs({
	body: spinner,
	viewBox: "0 0 16 16"
})`
	margin: 0 auto;
	fill: #959595;
	animation: rotating 1.5s linear infinite;

	@keyframes rotating {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

const GetMoreButton = styled.button`
	margin: 0 auto;
	width: 250px;
	height: 40px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	border: none;
	border-radius: 5px;
	color: #fff;
	background-color: #959595;

	:hover {
		background-color: #70bc7b;
	}
`;

const Attention = styled.div`
	margin: 20px auto;
	font-size: 16px;
	font-weight: 600;
`;

// ---------------------------------------------

class ItemList extends Component {
	constructor(props) {
		super(props);

		this.cardContainer = React.createRef();
	}

	componentDidMount() {
		this.props.getItems();
	}

	onGetMoreItems = () => {
		this.props.getMore(this.cardContainer.current.children.length + 12);
	};

	done = () => {
		return <Attention>Товаров в данной категории больше нет.</Attention>;
	};

	error = () => {
		return <Attention>Произошла ошибка! Попробуйте позже!</Attention>;
	};

	render() {
		// redux props
		const { items, loading, hasMore, error, currency, exchangeRates } = this.props;

		return (
			<Wrapper>
				<CardContainer innerRef={this.cardContainer}>
					{items.map(({ _id, title, img, body, category, price, productId }) => {
						if (currency === "USD") {
							price = Number((price / exchangeRates.USD).toFixed(2));
						}
						if (currency === "RUB") {
							price = Math.floor(price / exchangeRates.RUB);
						}
						return (
							<Item key={_id} imgURL={img} category={category} title={title} description={body} productId={productId} price={price} />
						);
					})}
				</CardContainer>
				<Footer>
					{hasMore ? loading ? <LoadingIcon /> : <GetMoreButton onClick={this.onGetMoreItems}>Показать больше</GetMoreButton> : this.done()}

					{error ? this.error() : null}
				</Footer>
			</Wrapper>
		);
	}
}

const mapStateToProps = store => ({
	items: store.productItemList.items,
	loading: store.productItemList.loading,
	hasMore: store.productItemList.hasMore,
	error: store.productItemList.error,
	currency: store.applicationSettings.currency,
	exchangeRates: store.applicationSettings.exchangeRates
});

export default connect(
	mapStateToProps,
	{ getItems, getMore }
)(ItemList);
