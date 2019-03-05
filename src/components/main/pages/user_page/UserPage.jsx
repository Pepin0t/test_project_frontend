import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Cookies } from "react-cookie";

class UserPage extends Component {
	constructor(props) {
		super(props);
		//
	}
	static propTypes = {
		history: PropTypes.object,
		cookies: PropTypes.instanceOf(Cookies)
	};

	logOut = () => {
		this.props.cookies.remove("user-access", { path: "/" });
		this.props.history.push({ pathname: "/content/main" });
	};

	render() {
		const Fragment = React.Fragment;

		return (
			<div style={{ padding: "15px" }}>
				<div>Страница пользователя еще не готова...</div>
				<button style={{ cursor: "pointer", margin: "15px", width: "80px", height: "40px" }} onClick={this.logOut}>
					Выйти
				</button>
			</div>
		);
	}
}

export default UserPage;
