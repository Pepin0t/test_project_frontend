import React, { Component } from "react";

// styles
import styled from "styled-components";

// styled components -------------------------
const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-grow: 1;
	min-width: 160px;
`;

const Container = styled.div`
	position: ${props => (props.detach ? "fixed" : "absolute")};
	top: ${props => (props.detach ? "30px" : 0)};
	display: flex;
	flex-direction: column;
	width: 100%;

	@media (max-width: 1140px) {
		position: static;
		margin-top: 15px;
		top: 0;
		width: 100%;
		flex-direction: row;
		flex-wrap: wrap;
		flex-grow: 0;
		justify-content: space-around;
	}
`;

const Link = styled.a.attrs({
	href: "/"
})`
	display: block;
	height: 30px;
	min-width: 160px;
	margin-bottom: 15px;
	text-decoration: none;
	color: black;
	font-size: 18px;
	font-weight: 600;

	:hover {
		color: #f1592a;
	}

	@media (max-width: 1140px) {
		margin: 15px 0;
		text-align: center;
	}
`;

// -------------------------------------------

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.wrapper = React.createRef();

		// сделать возможность устанавливать категории через админку
		this.state = {
			categories: ["Торты", "Букеты", "Конфеты", "Подарки"],
			detachSidebar: false
		};
	}

	componentDidMount() {
		window.addEventListener("scroll", this.detach);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.detach);
	}

	shouldComponentUpdate() {
		return window.innerWidth > 1140 ? true : false;
	}

	detach = () => {
		let top = this.wrapper.current.getBoundingClientRect().top;

		const { detachSidebar } = this.state;
		const limit = 30;

		if (top < limit && detachSidebar === false) {
			this.setState({
				detachSidebar: true
			});
		}

		if (top > limit && detachSidebar === true) {
			this.setState({
				detachSidebar: false
			});
		}
	};

	render() {
		const { detachSidebar } = this.state;

		return (
			<Wrapper innerRef={this.wrapper}>
				<Container detach={detachSidebar}>
					{this.state.categories.map((item, i) => {
						return <Link key={i + " cat"}>{item}</Link>;
					})}
				</Container>
			</Wrapper>
		);
	}
}

export default Sidebar;
