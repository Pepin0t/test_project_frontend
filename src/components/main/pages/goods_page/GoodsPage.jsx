import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Cookies, withCookies } from "react-cookie";

// styles
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, spinner, leftArrowIcon } from "../../../../images/SVG/icons";

// actios
import { getMoreItems, searchItems } from "../../../../actions/productItemListActions";

// components
import ProductItem from "./goods_page_components/product_item/ProductItem";

class GoodsPage extends Component {
	constructor(props) {
		super(props);

		this.container = React.createRef();
		this.sidebar = React.createRef();
		this.itemListContainer = React.createRef();

		this.state = {
			categories: [["cakes", "Торты"], ["bouquets", "Букеты"], ["candies", "Конфеты"], ["presents", "Подарки"], ["balloons", "Воздушные шары"]],
			hideSidebar: true,
			hideSidebarButtonChangePosition: false,
			detachSidebar: false,
			showArrowToTop: false
		};
	}

	static propTypes = {
		cookies: PropTypes.instanceOf(Cookies),
		getMoreItems: PropTypes.func,
		searchItems: PropTypes.func,
		productItems: PropTypes.arrayOf(PropTypes.object),
		hasMore: PropTypes.bool,
		loading: PropTypes.bool,
		fullscreen: PropTypes.bool,
		message: PropTypes.string,
		error: PropTypes.string,
		whoIsGuilty: PropTypes.string,

		ready: PropTypes.func
	};

	componentDidMount() {
		window.addEventListener("scroll", this.elementsPosition);
		this.onGetMoreItems();
		this.props.ready(true);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.elementsPosition);
	}

	onGetMoreItems = () => {
		this.props.getMoreItems(this.itemListContainer.current.children.length - 6 + 12);
	};

	onSearchItemsByCategory = category => {
		this.props.searchItems(category, "category_all");
	};

	onHideSidebar = () => {
		this.setState({
			hideSidebar: !this.state.hideSidebar
		});
	};

	elementsPosition = () => {
		let top = this.sidebar.current.getBoundingClientRect().top;
		let bottom = this.container.current.getBoundingClientRect().bottom - window.innerHeight;

		if (!this.state.detachSidebar && top < 0) {
			this.setState({
				detachSidebar: true
			});
		}

		if (this.state.detachSidebar && window.pageYOffset < 100) {
			this.setState({
				detachSidebar: false
			});
		}

		if (bottom < 0) {
			this.setState({
				hideSidebarButtonChangePosition: true
			});
		} else {
			this.setState({
				hideSidebarButtonChangePosition: false
			});
		}
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
		const { productItems, loading, hasMore, error, whoIsGuilty, fullscreen } = this.props;

		// react-cookie props
		const { cookies } = this.props;

		// state
		const { hideSidebar, hideSidebarButtonChangePosition, detachSidebar, showArrowToTop } = this.state;

		return (
			<Container ref={this.container}>
				<HideSidebarButton
					onClick={this.onHideSidebar}
					hideSidebar={hideSidebar}
					hideSidebarButtonChangePosition={hideSidebarButtonChangePosition}
				>
					<LeftArrowIcon />
				</HideSidebarButton>

				<CSSTransition in={showArrowToTop} classNames="arrow" timeout={250} unmountOnExit>
					<ArrowToTopButton onClick={this.toTop} fullscreen={fullscreen}>
						Вверх
					</ArrowToTopButton>
				</CSSTransition>

				<Sidebar hideSidebar={hideSidebar} detachSidebar={detachSidebar} ref={this.sidebar}>
					{this.state.categories.map((cat, i) => {
						return (
							<Category onClick={() => this.onSearchItemsByCategory(cat[0])} key={i + " cat"}>
								{cat[1]}
							</Category>
						);
					})}
				</Sidebar>
				<ItemListContainer ref={this.itemListContainer} onScroll={this.onArrowButtonShowHideToggle}>
					{productItems.map(({ title, description, category, price, productImages, productId, _id }) => {
						return (
							<ProductItem
								title={title}
								description={description || "Здесь когда-нибудь будет описание товара... очень скоро..."}
								category={category}
								price={price}
								productImages={productImages}
								productId={productId}
								cookies={cookies}
								key={_id}
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
	productItems: store.productItemList.items,
	loading: store.productItemList.loading,
	hasMore: store.productItemList.hasMore,
	message: store.productItemList.message,

	// if server error ------------------------------
	error: store.productItemList.error,
	whoIsGuilty: store.productItemList.whoIsGuilty
	// ----------------------------------------------
});

export default connect(
	mapStateToProps,
	{ getMoreItems, searchItems }
)(withCookies(GoodsPage));

// styled components -------------------------

const Container = styled.div`
	${props => (props.theme.desktop ? desktop.container : mobile.container)};
`;

const Sidebar = styled.div`
	${props => (props.theme.desktop ? desktop.sidebar : mobile.sidebar)};
`;

const Category = styled.div`
	${props => (props.theme.desktop ? desktop.category : mobile.category)};
`;

const HideSidebarButton = styled.div`
	${props => (props.theme.desktop ? desktop.hideSidebarButton : mobile.hideSidebarButton)};
`;

const LeftArrowIcon = styled(IconConstructor).attrs({
	body: leftArrowIcon,
	viewBox: "-8 -8 48 48"
})`
	${props => (props.theme.desktop ? desktop.leftArrowIcon : mobile.leftArrowIcon)};
`;

const ItemListContainer = styled.div`
	${props => (props.theme.desktop ? desktop.itemListContainer : mobile.itemListContainer)};
`;

const Footer = styled.div`
	${props => (props.theme.desktop ? desktop.footer : mobile.footer)};
`;

const GetMoreButton = styled.div`
	${props => (props.theme.desktop ? desktop.getMoreButton : mobile.getMoreButton)};
`;

const LoadingIcon = styled(IconConstructor).attrs({
	body: spinner,
	viewBox: "0 0 16 16"
})`
	${props => (props.theme.desktop ? desktop.loadingIcon : mobile.loadingIcon)};
`;

const Attention = styled.div`
	${props => (props.theme.desktop ? desktop.attention : mobile.attention)};
`;

const EmptyCell = styled.div`
	${props => (props.theme.desktop ? desktop.emptyCell : mobile.emptyCell)};
`;

const ArrowToTopButton = styled.div`
	${props => (props.theme.desktop ? desktop.arrowToTopButton : mobile.arrowToTopButton)};
`;

// -------------------------------------------
