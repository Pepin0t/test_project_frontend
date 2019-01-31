import axios from "axios";
import React, { Component } from "react";

function Auth_API(WrappedComponent) {
	const checkToken = token => {
		return new Promise((resolve, reject) => {
			if (token) {
				axios({
					method: "get",
					url: "/api/check-token",
					headers: {
						Authorization: token
					}
				})
					.then(({ data }) => {
						resolve({ ...data });
					})
					.catch(err => {
						reject({
							errorMessage: err.response.data.message
						});
					});
			} else {
				reject({
					errorMessage: "Требуется авторизация!"
				});
			}
		});
	};

	const signIn = (login, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post("/api/sign-in", { login, password })
				.then(({ data }) => {
					resolve({ ...data });
				})
				.catch(err => {
					reject({
						errorMessage: err.response.data.message
					});
				});
		});
	};

	const registration = () => {
		//
	};

	const adminVerification = (key, token) => {
		return new Promise((resolve, reject) => {
			axios({
				method: "post",
				url: "/api/admin-verification",
				data: { key },
				headers: { Authorization: token }
			})
				.then(({ data }) => {
					resolve({ ...data });
				})
				.catch(err => {
					reject({
						errorMessage: err.response.data.message
					});
				});
		});
	};

	const auth = {
		checkToken,
		signIn,
		registration,
		adminVerification
	};

	return class Auth extends Component {
		constructor(props) {
			super(props);
		}

		render() {
			return <WrappedComponent auth={auth} {...this.props} />;
		}
	};
}

export default Auth_API;
