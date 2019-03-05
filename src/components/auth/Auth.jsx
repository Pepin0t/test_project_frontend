import React, { Component } from "react";
import PropTypes from "prop-types";
import { Cookies } from "react-cookie";

// client API
import { Auth_API } from "../../client_api/";

import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// components
import UserForm from "./auth_components/user_form/UserForm";
import VerificationForm from "./auth_components/verification_form/VerificationForm";

class Auth extends Component {
	constructor(props) {
		super(props);

		this.checkToken = this.checkToken.bind(this);

		this.state = {
			checkTokenWaiting: true,
			checkTokenMessage: null,
			showUserForm: false,
			showVerificationForm: false
		};
	}

	static propTypes = {
		auth: PropTypes.object,
		location: PropTypes.object,
		history: PropTypes.object,
		cookies: PropTypes.instanceOf(Cookies)
	};

	componentDidMount() {
		this.checkToken();
	}

	async checkToken() {
		try {
			const token = this.props.cookies.get("user-access");
			const data = await this.props.auth.checkToken(token);

			switch (data.audience) {
				case "admin": {
					if (data.verified) {
						this.props.history.push({
							pathname: data.redirectPath,
							from: "/auth"
						});
					} else {
						this.setState({
							checkTokenWaiting: false,
							showVerificationForm: true
						});
					}

					break;
				}

				case "user": {
					this.props.history.push({
						pathname: data.redirectPath,
						from: "/auth"
					});

					break;
				}

				default:
					return;
			}
		} catch (err) {
			this.defaultState();
		}
	}

	signInComplete = data => {
		switch (data.audience) {
			case "admin": {
				this.setState({
					showVerificationForm: true
				});
				break;
			}

			case "user": {
				this.prepareToRedirect(data);
				break;
			}
			default:
				return;
		}
	};

	verificationComplete = data => {
		this.prepareToRedirect(data);
	};

	prepareToRedirect = data => {
		// setTimeout(() => {
		this.props.history.replace({
			pathname: data.redirectPath,
			from: "/auth"
		});
		// }, 400);
	};

	defaultState = () => {
		this.setState({
			checkTokenWaiting: false,
			checkTokenMessage: null,
			showUserForm: true,
			showVerificationForm: false
		});
	};

	render() {
		return (
			<Container>
				{this.state.checkTokenWaiting ? (
					<p style={{ position: "absolute", top: "15px", left: "15px", color: "#fff" }}>Подождите...</p>
				) : (
					this.state.checkTokenMessage
				)}

				{this.state.showUserForm && (
					<UserForm
						history={this.props.history}
						location={this.props.location}
						cookies={this.props.cookies}
						auth={this.props.auth}
						signInComplete={this.signInComplete}
						onmounted={() => {
							this.setState({
								showUserForm: false
							});
						}}
					/>
				)}

				{this.state.showVerificationForm && (
					<VerificationForm
						cookies={this.props.cookies}
						auth={this.props.auth}
						verificationComplete={this.verificationComplete}
						timeIsUp={() => {
							this.setState({
								showUserForm: true
							});
						}}
						onmounted={() => {
							this.setState({
								showVerificationForm: false
							});
						}}
					/>
				)}
			</Container>
		);
	}
}

export default Auth_API(Auth);

// styled-components -------------------

const Container = styled.div`
	${props => (props.theme.desktop ? desktop.container : mobile.container)}
`;
