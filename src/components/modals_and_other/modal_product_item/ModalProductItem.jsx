import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Cookies } from "react-cookie";

// styles
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// SVG effects
import { Gooey } from "../../../images/SVG/effects";

// animations
import { ballPathAnimation, errorCloseAnimation } from "./styles/animations";
import { SVGBallsPaths } from "./styles/svg";

// icons
import { IconConstructor, closeIcon, leftArrowIcon, rightArrowIcon, spinner, tryAgainIcon } from "../../../images/SVG/icons.js";

// actions
import { getProductItemFullDescription } from "../../../actions/productItemActions";

//utils
import { shoppingCart } from "../../../utils/shopping_cart/";

const SERVER_URL = process.env.NODE_ENV === "production" ? process.env.SERVER_URL : "http://localhost:5000";

export class Modal extends Component {
	constructor(props) {
		super(props);

		this.smallImages = [];

		this.imageBall = React.createRef();
		this.descriptionBall = React.createRef();
		this.otherBall = React.createRef();

		this.tryAgainButton = React.createRef();

		this.imageBallGhost = React.createRef();
		this.descriptionBallGhost = React.createRef();
		this.otherBallGhost = React.createRef();

		this.animationStateMachine = this.animationStateMachine.bind(this);
		this.classNamesSelector = this.classNamesSelector.bind(this);

		this.classNames = {
			"modal-window": {
				"hide-loading-ball": false,
				"show-loading-ball": false
			},
			"image-ball": {
				waiting: false,
				"to-position": false,
				"show-content": false,
				"back-to-center": false
			},
			"description-ball": {
				waiting: false,
				"to-position": false,
				"show-content": false,
				"back-to-center": false
			},
			"other-ball": {
				waiting: false,
				"to-position": false,
				"show-content": false,
				"back-to-center": false
			},
			"loading-events": {
				error: false,
				"try-again": false
			},
			"controls-events": {
				"show-controls": false
			}
		};

		this.state = {
			darkScreen: false,
			modal: false,
			loading: true,
			error: null,
			showContent: false,
			fullDescription: {},
			alreadyInCart: shoppingCart.check(props.location.search.productId, props.cookies),
			imageNumber: 0,
			imageAmount: 0,
			classNames: {}
		};
	}

	static propTypes = {
		getProductItemFullDescription: PropTypes.func,
		sendToCart: PropTypes.func,
		loading: PropTypes.object,
		history: PropTypes.object,
		location: PropTypes.object,
		readyToStartModalAnimation: PropTypes.object,
		cookies: PropTypes.instanceOf(Cookies)
	};

	async componentDidMount() {
		// redux props
		const { readyToStartModalAnimation } = this.props;

		// redux actions
		const { getProductItemFullDescription } = this.props;

		this.setState({
			darkScreen: true,
			classNames: this.classNamesSelector()
		});

		getProductItemFullDescription(this.props.location.search.productId);

		await Promise.resolve(readyToStartModalAnimation).then(res => (this.end = res));

		this.setState({
			modal: true
		});

		this.animationStateMachine("start");
	}

	componentWillUnmount() {
		this.end && this.end();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const alreadyInCart = shoppingCart.check(nextProps.location.search.productId, nextProps.cookies);

		if (alreadyInCart !== prevState.alreadyInCart) {
			return {
				alreadyInCart
			};
		}

		return null;
	}

	async waitLoadingResult() {
		await this.props.loading
			.then(data => {
				this.setState(
					{
						fullDescription: data,
						imageAmount: data.productImages.fullsize ? data.productImages.fullsize.length : 0,
						error: null,
						loading: false
					},
					() => {
						this.animationStateMachine("to-position");
					}
				);
			})
			.catch(error => {
				this.setState(
					{
						error,
						loading: false
					},
					() => {
						this.animationStateMachine("error");
					}
				);
			});
	}

	animationStateMachine(animationStateName, element, waitingBallsCount = 3) {
		switch (animationStateName) {
			// animation-in
			case "start": {
				let waitingBalls = 0;

				ballPathAnimation(
					this.imageBall.current,
					{
						pathId: "image-ball-path",
						duration: 1400,
						delay: 200
					},
					{
						afterEnd: () => this.animationStateMachine("waiting", "image-ball", ++waitingBalls)
					}
				);

				ballPathAnimation(
					this.descriptionBall.current,
					{
						pathId: "description-ball-path",
						duration: 1200,
						delay: 300
					},
					{
						afterEnd: () => this.animationStateMachine("waiting", "description-ball", ++waitingBalls)
					}
				);

				ballPathAnimation(
					this.otherBall.current,
					{
						pathId: "other-ball-path",
						duration: 1000,
						delay: 400
					},
					{
						afterEnd: () => this.animationStateMachine("waiting", "other-ball", ++waitingBalls)
					}
				);
				break;
			}
			case "waiting": {
				this.classNamesSelector({ [element]: { waiting: true } });

				if (waitingBallsCount === 3) {
					this.waitLoadingResult();
				}
				break;
			}
			case "error": {
				this.classNamesSelector({ "loading-events": { error: true, "try-again": false } });
				break;
			}
			case "try-again": {
				(self => {
					this.tryAgainButton.current.addEventListener("animationend", function tryAgain() {
						self.waitLoadingResult();

						self.setState({
							loading: true,
							error: null
						});
						this.removeEventListener("animationend", tryAgain);
					});
				})(this);

				this.classNamesSelector({ "loading-events": { error: false, "try-again": true } });
				break;
			}
			case "to-position": {
				(self => {
					this.otherBall.current.addEventListener("animationend", function toPosition() {
						self.animationStateMachine("show-content");
						this.removeEventListener("animationend", toPosition);
					});
				})(this);

				this.classNamesSelector({
					"modal-window": { "hide-loading-ball": true },
					"image-ball": { "to-position": true },
					"description-ball": { "to-position": true },
					"other-ball": { "to-position": true }
				});
				break;
			}
			case "show-content": {
				this.setState({
					showContent: true
				});

				this.classNamesSelector({
					"image-ball": { "show-content": true },
					"description-ball": { "show-content": true },
					"other-ball": { "show-content": true },
					"controls-events": { "show-controls": true }
				});

				if (this.state.fullDescription.productImages.fullsize) {
					this.smallImages[0].style.border = "3px solid #f1592a";

					for (let i = 0; i < this.smallImages.length; i++) {
						setTimeout(() => {
							this.smallImages[i].classList.add("show-small-images");
						}, i * 150);
					}
				}
				break;
			}

			// animation-out
			case "back-to-center": {
				(self => {
					this.otherBall.current.addEventListener("animationend", function end() {
						self.animationStateMachine("end");
						this.removeEventListener("animationend", end);
					});
				})(this);

				this.classNamesSelector({
					"modal-window": { "show-loading-ball": true },
					"image-ball": { "back-to-center": true },
					"description-ball": { "back-to-center": true },
					"other-ball": { "back-to-center": true }
				});
				break;
			}

			case "error-back-to-center": {
				errorCloseAnimation(
					this.imageBall.current,
					{
						duration: 300,
						delay: 200
					},
					() => this.animationStateMachine("end")
				);

				errorCloseAnimation(this.descriptionBall.current, {
					duration: 300,
					delay: 100
				});

				errorCloseAnimation(this.otherBall.current, {
					duration: 300
				});

				this.setState({
					error: null
				});
				break;
			}
			case "end": {
				this.setState({
					darkScreen: false
				});
				break;
			}

			default:
				return {};
		}
	}

	classNamesSelector(props) {
		let classNames = { ...this.classNames };
		let stringClassNames = {};

		for (let key in classNames) {
			let elementClassNames;

			if (props && props.hasOwnProperty(key)) {
				elementClassNames = { ...classNames[key], ...props[key] };
			} else {
				elementClassNames = classNames[key];
			}

			classNames[key] = elementClassNames;

			stringClassNames[key] = Object.keys(elementClassNames)
				.reduce((acc, k) => (typeof elementClassNames[k] === "boolean" && elementClassNames[k] === true ? acc + k + " " : acc), "")
				.trim();
		}

		this.setState(
			{
				classNames: stringClassNames
			},
			() => {
				this.classNames = classNames;
			}
		);

		return stringClassNames;
	}

	ghostsMove = e => {
		if (this.state.modal && !this.state.showContent) {
			let x = (window.innerHeight / 2 - e.pageY) / 200;
			let y = (-1 * (window.innerWidth / 2 - e.pageX)) / 200;

			this.imageBallGhost.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
			this.descriptionBallGhost.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
			this.otherBallGhost.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
		}
	};

	onPreviousImage = () => {
		// state
		let { imageAmount, imageNumber } = this.state;

		if (imageAmount && imageNumber > 0) {
			this.onChooseImage(--imageNumber);
		}
	};

	onNextImage = () => {
		// state
		let { imageAmount, imageNumber } = this.state;

		if (imageAmount && imageNumber < imageAmount - 1) {
			this.onChooseImage(++imageNumber);
		}
	};

	onChooseImage = i => {
		if (this.state.imageNumber !== i) {
			this.smallImages.map(img => (img.style.border = "3px solid #fff"));

			this.smallImages[i].style.border = "3px solid #f1592a";

			this.setState({
				imageNumber: i
			});
		}
	};

	onCloseModal = () => {
		if (this.state.error) {
			this.animationStateMachine("error-back-to-center");
		} else {
			this.setState({
				showContent: false
			});
		}
	};

	onSendToCart = () => {
		// redux actions
		const { cookies } = this.props;

		// state
		const { productId } = this.state.fullDescription;

		navigator.cookieEnabled ? shoppingCart.add(productId, cookies) : this.onDisplayCookiesWarning();
	};

	onDisplayCookiesWarning = () => {
		alert("Включи куки!");
	};

	onDefaultState = () => {
		this.setState({
			imageNumber: 0,
			imageAmount: 0
		});
	};

	onTryAgain = () => {
		this.props.getProductItemFullDescription(this.props.location.search.productId);

		this.animationStateMachine("try-again");
	};

	render() {
		const Fragment = React.Fragment;

		// state
		const { darkScreen, modal, loading, error, showContent, alreadyInCart, imageAmount, imageNumber, classNames } = this.state;
		const { title, description, category, productImages, productId, price } = this.state.fullDescription;

		// console.log(loading);

		return (
			<CSSTransition
				in={darkScreen}
				classNames={"product-item-modal"}
				timeout={250}
				onExited={() => {
					this.onDefaultState();

					this.props.history.push("/content/goods");
				}}
				unmountOnExit
			>
				<ModalContainer onMouseMove={this.ghostsMove}>
					{modal && (
						<ModalWindow className={classNames["modal-window"]}>
							<ImageBall id="image-ball" className={classNames["image-ball"]} ref={this.imageBall}>
								{showContent &&
									(productImages.fullsize ? (
										<Fragment>
											<ImageContainer>
												<Img key={"full-image-" + productId} src={SERVER_URL + productImages.fullsize[imageNumber]} />
												<ImageCounter>
													{imageNumber + 1} - {imageAmount}
												</ImageCounter>
											</ImageContainer>
											<SmallImagesWrapper>
												<PreviousImageButton onClick={this.onPreviousImage}>
													<LeftArrowIcon />
												</PreviousImageButton>

												{productImages.fullsize.map((url, i) => {
													return (
														<SmallImageContainer
															ref={image => (this.smallImages[i] = image)}
															key={"small-image-container-" + i}
															onClick={() => this.onChooseImage(i)}
														>
															<SmallImage src={SERVER_URL + url} />
														</SmallImageContainer>
													);
												})}

												<NextImageButton onClick={this.onNextImage}>
													<RightArrowIcon />
												</NextImageButton>
											</SmallImagesWrapper>
										</Fragment>
									) : (
										"Нету изображений!"
									))}

								{error && (
									<ErrorCloseButton className={classNames["loading-events"]} onClick={this.onCloseModal}>
										<CloseIcon />
									</ErrorCloseButton>
								)}
							</ImageBall>

							<DescriptionBall id="description-ball" className={classNames["description-ball"]} ref={this.descriptionBall}>
								<CSSTransition
									in={showContent}
									classNames={"description"}
									timeout={250}
									onExited={() => {
										this.animationStateMachine("back-to-center");
									}}
									unmountOnExit
								>
									<Main>
										<Description>{description}</Description>
									</Main>
								</CSSTransition>
							</DescriptionBall>

							<OtherBall id="other-ball" className={classNames["other-ball"]} ref={this.otherBall}>
								{showContent && (
									<Fragment>
										<CloseButton className={classNames["controls-events"]} onClick={this.onCloseModal}>
											<CloseIcon viewBox="-4 -4 40 40" />
										</CloseButton>
										<Title>{title}</Title>

										<Category>Категория: {category}</Category>
										<Category>Код товара: {productId}</Category>

										<OtherBallFooter>
											<Price>{price ? `Цена: ${price}` : "Цену уточняйте"}</Price>
											<BuyButton onClick={this.onSendToCart} alreadyInCart={alreadyInCart}>
												{alreadyInCart ? "Уже в корзине" : "В корзину"}
											</BuyButton>
										</OtherBallFooter>
									</Fragment>
								)}
							</OtherBall>
							{loading ? (
								<LoadingIcon />
							) : (
								error && (
									<Fragment>
										<TryAgainButton className={classNames["loading-events"]} ref={this.tryAgainButton} onClick={this.onTryAgain}>
											<TryAgainIcon className={classNames["loading-events"]} />
										</TryAgainButton>
										<Attention className={classNames["loading-events"]}>{error}</Attention>
									</Fragment>
								)
							)}

							<SVGBallsPaths />
							{!showContent && (
								<GhostsWrapper>
									<ImageBallGhost ref={this.imageBallGhost} className={classNames["loading-events"]} />
									<DescriptionBallGhost ref={this.descriptionBallGhost} className={classNames["loading-events"]} />
									<OtherBallGhost ref={this.otherBallGhost} className={classNames["loading-events"]} />
								</GhostsWrapper>
							)}
							{!error && <Gooey />}
						</ModalWindow>
					)}
				</ModalContainer>
			</CSSTransition>
		);
	}
}

const mapStateToProps = store => ({
	readyToStartModalAnimation: store.productItem.readyToStartModalAnimation,
	loading: store.productItem.loading
});

export default connect(
	mapStateToProps,
	{ getProductItemFullDescription }
)(Modal);

// styled components -------------------------

const ModalContainer = styled.div`
	${props => (props.theme.desktop ? desktop.modalContainer : mobile.modalContainer)};
`;

const ModalWindow = styled.section`
	${props => (props.theme.desktop ? desktop.modalWindow : mobile.modalWindow)};
`;

const ImageBall = styled.div`
	${props => (props.theme.desktop ? desktop.imageBall : mobile.imageBall)};
`;

const SmallImagesWrapper = styled.div`
	${props => (props.theme.desktop ? desktop.smallImagesWrapper : mobile.smallImagesWrapper)};
`;

const SmallImageContainer = styled.div`
	${props => (props.theme.desktop ? desktop.smallImageContainer : mobile.SmallImageContainer)};
`;

const SmallImage = styled.img.attrs({
	alt: "kuku"
})`
	${props => (props.theme.desktop ? desktop.smallImage : mobile.smallImage)};
`;

const ErrorCloseButton = styled.div`
	${props => (props.theme.desktop ? desktop.errorCloseButton : mobile.errorCloseButton)}
`;

const DescriptionBall = styled.div`
	${props => (props.theme.desktop ? desktop.descriptionBall : mobile.descriptionBall)};
`;
const OtherBall = styled.div`
	${props => (props.theme.desktop ? desktop.otherBall : mobile.otherBall)};
`;

const LoadingIcon = styled(IconConstructor).attrs({
	body: spinner,
	viewBox: "0 0 16 16"
})`
	${props => (props.theme.desktop ? desktop.loadingIcon : mobile.loadingIcon)};
`;

const TryAgainButton = styled.button`
	${props => (props.theme.desktop ? desktop.tryAgainButton : mobile.tryAgainButton)};
`;

const TryAgainIcon = styled(IconConstructor).attrs({
	body: tryAgainIcon,
	viewBox: "-32 0 512 512"
})`
	${props => (props.theme.desktop ? desktop.tryAgainIcon : mobile.tryAgainIcon)};
`;

const Header = styled.header`
	${props => (props.theme.desktop ? desktop.header : mobile.header)};
`;

const Title = styled.p`
	${props => (props.theme.desktop ? desktop.title : mobile.title)};
`;

const Category = styled.p`
	${props => (props.theme.desktop ? desktop.category : mobile.category)};
`;

const CloseIcon = styled(IconConstructor).attrs({
	body: closeIcon
})`
	${props => (props.theme.desktop ? desktop.closeIcon : mobile.closeIcon)};
`;

const CloseButton = styled.div`
	${props => (props.theme.desktop ? desktop.closeButton : mobile.closeButton)};
`;

const Main = styled.div`
	${props => (props.theme.desktop ? desktop.main : mobile.main)};
`;

const Description = styled.div`
	${props => (props.theme.desktop ? desktop.description : mobile.description)};
`;

const ImageContainer = styled.div`
	${props => (props.theme.desktop ? desktop.imageContainer : mobile.imageContainer)};
`;

const Img = styled.img.attrs({
	alt: "Изображение потерялось..."
})`
	${props => (props.theme.desktop ? desktop.img : mobile.img)};
`;

const LeftArrowIcon = styled(IconConstructor).attrs({
	body: leftArrowIcon,
	viewBox: "-8 -8 48 48"
})`
	${props => (props.theme.desktop ? desktop.leftArrowIcon : mobile.leftArrowIcon)};
`;

const RightArrowIcon = styled(IconConstructor).attrs({
	body: rightArrowIcon,
	viewBox: "-8 -8 48 48"
})`
	${props => (props.theme.desktop ? desktop.rightArrowIcon : mobile.rightArrowIcon)};
`;

const PreviousImageButton = styled.div`
	${props => (props.theme.desktop ? desktop.previousImageButton : mobile.previousImageButton)};
`;

const NextImageButton = styled.div`
	${props => (props.theme.desktop ? desktop.nextImageButton : mobile.nextImageButton)};
`;

const ImageCounter = styled.div`
	${props => (props.theme.desktop ? desktop.imageCounter : mobile.imageCounter)};
`;

const OtherBallFooter = styled.div`
	${props => (props.theme.desktop ? desktop.otherBallFooter : mobile.otherBallFooter)};
`;

const Price = styled.div`
	${props => (props.theme.desktop ? desktop.price : mobile.price)};
`;

const BuyButton = styled.div`
	${props => (props.theme.desktop ? desktop.buyButton : mobile.buyButton)};
`;

const Attention = styled.div`
	${props => (props.theme.desktop ? desktop.attention : mobile.attention)};
`;

const GhostsWrapper = styled.div`
	${props => (props.theme.desktop ? desktop.ghostsWrapper : mobile.ghostsWrapper)};
`;

const ImageBallGhost = styled.div`
	${props => (props.theme.desktop ? desktop.imageBallGhost : mobile.imageBallGhost)};
`;

const DescriptionBallGhost = styled.div`
	${props => (props.theme.desktop ? desktop.descriptionBallGhost : mobile.descriptionBallGhost)};
`;

const OtherBallGhost = styled.div`
	${props => (props.theme.desktop ? desktop.otherBallGhost : mobile.otherBallGhost)};
`;

// -------------------------------------------
