import React, { Component } from "react";
import { connect } from "react-redux";

// styles
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

// icons
import { IconConstructor, spinner, leftArrowIcon } from "../../../../images/SVG/icons";

// actios
import { getMoreItems, searchItems } from "../../../../actions/productItemListActions";

// components
import Item from "./Item";

// styled components -------------------------

// min 160px
const sidebarWidth = 160;

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
`;

const Sidebar = styled.div`
	position: relative;
	padding-top: 30px;
	padding-left: 15px;
	min-width: ${sidebarWidth + "px"};
	max-width: ${sidebarWidth + "px"};
	height: 100%;
	box-shadow: 15px -5px 15px -15px rgba(0, 0, 0, 0.5);
	background-color: rgba(255, 255, 255, 0.6);
	transition: all 250ms ease;
	transform: ${props => (props.hideSidebar ? `translate(-${sidebarWidth}px)` : "none")};
	z-index: 1;

	@media (min-width: 1281px) {
		transform: none;
	}

	@media (max-width: 460px) {
		position: fixed;
		background-color: rgba(255, 255, 255, 0.9);
		height: calc(100% - 150px);
	}
`;

const Category = styled.div`
	cursor: pointer;
	height: 30px;
	margin-bottom: 15px;
	text-decoration: none;
	color: black;
	font-size: 18px;
	font-weight: 600;

	:hover {
		color: #f1592a;
	}
`;

const HideSidebarButton = styled.div`
	position: ${props => (props.hideSidebar ? "fixed" : "absolute")};
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	bottom: ${props => (props.hideSidebar ? "65px" : "15px")};
	left: 15px;
	width: 40px;
	height: 40px;
	border-radius: 20px;
	background-color: rgba(0, 0, 0, 0.5);
	color: #fff;
	z-index: 10;
	transform: ${props => (props.hideSidebar ? "rotate(180deg)" : "none")};
	transition: transform ease 250ms;

	@media (min-width: 1281px) {
		display: none;
	}

	@media (max-width: 460px) {
		width: 50px;
		height: 50px;
		border-radius: 25px;
	}
`;

const LeftArrowIcon = styled(IconConstructor).attrs({
	body: leftArrowIcon,
	viewBox: "-8 -8 48 48"
})`
	fill: #fff;
	transition: all ease 150ms;
`;

const ItemListContainer = styled.div`
	padding: 30px 15px 15px 15px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-content: flex-start;
	flex-wrap: wrap;
	min-width: ${props => (props.hideSidebar ? "100%" : `calc(100% - ${sidebarWidth}px)`)};
	overflow-x: hidden;
	overflow-y: auto;
	transform: ${props => (props.hideSidebar ? `translate(-${sidebarWidth}px)` : "none")};

	@media (min-width: 1281px) {
		transform: none;
		min-width: ${"calc(100% - " + sidebarWidth + "px)"};
	}

	@media (max-width: 460px) {
		transform: none;
		min-width: 100%;
	}
`;

const Footer = styled.div`
	width: 100%;
	height: 170px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const GetMoreButton = styled.div`
	width: 100px;
	height: 100px;
	cursor: pointer;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	font-size: 12px;
	border-radius: 50px;
	color: #959595;
	background-color: rgba(255, 255, 255, 0.8);
	transition: all ease 100ms;
	box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);

	:hover {
		background-color: #70bc7b;
		color: #fff;
	}
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

const Attention = styled.div`
	margin: 20px auto;
	font-size: 16px;
	font-weight: 600;
`;

const EmptyCell = styled.div`
	width: ${sidebarWidth + 90 + "px"};
	max-height: 0;
	margin: 0 5px;
`;

const ArrowToTopButton = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	left: ${props => (props.fullscreen ? "30px" : "calc((100vw - 1280px) / 2 + 15px)")};
	bottom: ${props => (props.fullscreen ? "45px" : "100px")};
	width: ${"calc(" + sidebarWidth + "px - 30px)"};
	height: 40px;
	background-color: #959595;
	color: #fff;
	border-radius: 20px;
	opacity: 0.5;
	transition: all 250ms ease;
	z-index: 1000;

	:hover {
		opacity: 1;
	}

	&.arrow-enter {
		opacity: 0;
	}

	&.arrow-enter-active {
		opacity: 0.5;
		transition: all 250ms ease;
	}

	&.arrow-exit {
		opacity: 0.5;
	}

	&.arrow-exit-active {
		opacity: 0;
		transition: all 250ms ease;
	}

	@media (max-width: 1280px) {
		display: none;
	}

	@media (min-width: 1921px) {
		left: ${props => (props.fullscreen ? "calc((100vw - 1920px) / 2 + 15px)" : "calc((100vw - 1280px) / 2 + 15px)")};
	}
`;

// -------------------------------------------

class GoodsPage extends Component {
	constructor(props) {
		super(props);

		this.itemListContainer = React.createRef();

		this.state = {
			categories: [["cakes", "Торты"], ["bouquets", "Букеты"], ["candies", "Конфеты"], ["presents", "Подарки"], ["balloons", "Воздушные шары"]],
			hideSidebar: false,
			showArrowToTop: false
		};
	}

	componentDidMount() {
		this.onGetMoreItems();
	}

	onGetMoreItems = () => {
		this.props.getMoreItems(this.itemListContainer.current.children.length - 6 + 12);
	};

	onSearchItemsByCategory(category) {
		this.props.searchItems(category, "category_all");
	}

	onHideSidebar = () => {
		this.setState({
			hideSidebar: !this.state.hideSidebar
		});
	};

	onArrowButtonShowHideToggle = () => {
		// state
		const { showArrowToTop } = this.state;

		let userScroll = this.itemListContainer.current.scrollTop;
		const limit = 1500;

		if (userScroll > limit && showArrowToTop === false) {
			this.setState(() => ({
				showArrowToTop: true
			}));
		}

		if (userScroll < limit && showArrowToTop === true) {
			this.setState(() => ({
				showArrowToTop: false
			}));
		}
	};

	toTop = () => {
		try {
			this.itemListContainer.current.scroll({
				top: 0,
				behavior: "smooth"
			});
		} catch (error) {
			this.itemListContainer.current.scrollTop = 0;
		}
	};

	done = () => {
		return <Attention>{this.props.message}</Attention>;
	};

	error = () => {
		return <Attention>{this.props.error}</Attention>;
	};

	render() {
		// redux props
		const { items, loading, hasMore, error, whoIsGuilty, fullscreen } = this.props;

		// state
		const { hideSidebar, showArrowToTop } = this.state;

		return (
			<Container>
				<HideSidebarButton onClick={this.onHideSidebar} hideSidebar={hideSidebar}>
					<LeftArrowIcon />
				</HideSidebarButton>

				<CSSTransition in={showArrowToTop} classNames="arrow" timeout={250} unmountOnExit>
					<ArrowToTopButton onClick={this.toTop} fullscreen={fullscreen}>
						Вверх
					</ArrowToTopButton>
				</CSSTransition>

				<Sidebar hideSidebar={hideSidebar}>
					{this.state.categories.map((item, i) => {
						return (
							<Category onClick={this.onSearchItemsByCategory.bind(this, item[0])} key={i + " cat"}>
								{item[1]}
							</Category>
						);
					})}
				</Sidebar>
				<ItemListContainer innerRef={this.itemListContainer} hideSidebar={hideSidebar} onScroll={this.onArrowButtonShowHideToggle}>
					{items.map(({ _id, title, img, body, category, price, productId }) => {
						// !! перевести категории на русский язык

						return (
							<Item
								hideSidebar={hideSidebar}
								sidebarWidth={sidebarWidth}
								key={_id}
								img={img}
								category={category}
								title={title}
								description={body || "Здесь когда-нибудь будет описание товара... очень скоро..."}
								productId={productId}
								price={price}
							/>
						);
					})}
					<EmptyCell />
					<EmptyCell />
					<EmptyCell />
					<EmptyCell />
					<EmptyCell />

					<Footer>
						{hasMore ? (
							loading ? (
								<LoadingIcon />
							) : (
								whoIsGuilty === "get_more_items" && (
									<GetMoreButton onClick={this.onGetMoreItems}>{error ? "Повторить" : "Показать больше"}</GetMoreButton>
								)
							)
						) : (
							this.done()
						)}

						{error ? this.error() : null}
					</Footer>
				</ItemListContainer>
			</Container>
		);
	}
}

const mapStateToProps = store => ({
	items: store.productItemList.items,
	loading: store.productItemList.loading,
	hasMore: store.productItemList.hasMore,
	message: store.productItemList.message,

	// if server error ------------------------------
	error: store.productItemList.error,
	whoIsGuilty: store.productItemList.whoIsGuilty,
	// ----------------------------------------------

	fullscreen: store.applicationSettings.fullscreen
});

export default connect(
	mapStateToProps,
	{ getMoreItems, searchItems }
)(GoodsPage);
