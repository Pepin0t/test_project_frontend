import React, { Component } from "react";

// styles
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

// styled components -------------------------

const ArrowButton = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	left: calc((100vw - 1140px) / 2 + 15px);
	bottom: 105px;
	width: 100px;
	height: 40px;
	background-color: #959595;
	color: #fff;
	border-radius: 20px;
	opacity: 0.5;
	transition: all 100ms ease;

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

	@media (max-width: 1140px) {
		display: none;
	}
`;

// -------------------------------------------

class ArrowToTop extends Component {
	state = {
		show: false
	};

	componentDidMount() {
		// запретить маунт по локациям

		window.addEventListener("scroll", this.scroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.scroll);
	}

	scroll = () => {
		let userScroll = window.pageYOffset || document.documentElement.scrollTop;
		const { show } = this.state;
		const limit = 1500;

		if (userScroll > limit && show === false) {
			this.setState(() => ({
				show: true
			}));
		}

		if (userScroll < limit && show === true) {
			this.setState(() => ({
				show: false
			}));
		}
	};

	toTop = () => {
		try {
			window.scroll({
				top: 0,
				behavior: "smooth"
			});
		} catch (error) {
			window.scroll(0, 0);
		}
	};

	render() {
		const { show } = this.state;
		return (
			<CSSTransition in={show} classNames="arrow" timeout={250} unmountOnExit>
				<ArrowButton onClick={this.toTop}>Вверх</ArrowButton>
			</CSSTransition>
		);
	}
}

export default ArrowToTop;
