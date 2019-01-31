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
		cookies: PropTypes.instanceOf(Cookies)
	};

	render() {
		return <p>kuku</p>;
	}
}

export default UserPage;
