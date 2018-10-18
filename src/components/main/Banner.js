import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import bnnr from "../../images/random_grey_variations.png";
import banner from "../../images/banner_3a.jpg";
import styled from "styled-components";

// styled components -------------------------

const Container = styled.div`
	position: relative;
	margin: 0 auto;
	width: 1140px;
	z-index: 0;

	@media (max-width: 1140px) {
		width: 100vw;
	}
`;

const StyledBanner = styled.img.attrs({
	alt: "..."
})`
	width: 100%;
	filter: saturate(70%);
`;

const Bnnr = styled.div`
	width: 100%;
	height: 100px;
	background-image: url(${bnnr});
`;

const Contacts = styled.div`
	position: absolute;
	top: 15px;
	left: 15px;
	z-index: 2;
	color: #fff;
`;

const Title = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	padding-top: 35px;
	/* text-align: center;
	top: calc(50% - 10px); */
	z-index: 1;
	font-size: 60px;
	font-family: "Neucha";

	@media (max-width: 920px) {
		font-size: 48px;
		padding-top: 25px;
	}

	@media (max-width: 620px) {
		font-size: 36px;
		padding-top: 15px;
	}
`;
// -------------------------------------------

class Banner extends Component {
	// не используется

	state = {
		title: null
	};

	static getDerivedStateFromProps(props) {
		switch (props.location.pathname) {
			case "/": {
				return {
					title: "Главная"
				};
			}
			case "/admin": {
				return {
					title: "Admin Page"
				};
			}
			case "/goods": {
				return {
					title: "Товары"
				};
			}
			case "/about": {
				return {
					title: "О нас"
				};
			}
			case "/contacts": {
				return {
					title: "Наши контакты"
				};
			}
			case "/delivery": {
				return {
					title: "Доставка"
				};
			}
			default:
				return null;
		}
	}

	render() {
		return (
			<Container>
				<Contacts>Телефон: 099-221-XX-XX</Contacts>
				<Title>{this.state.title}</Title>
				{/* <StyledBanner src={banner} /> */}
				<Bnnr />
			</Container>
		);
	}
}

export default withRouter(Banner);
