import React, { Component } from "react";
import PropTypes from "prop-types";
import { Cookies } from "react-cookie";

// client API
import { Auth_API } from "../../client_api/index";

// styles
import styled from "styled-components";
import classNames from "classnames";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// components
import UserPage from "../main/pages/user_page/UserPage";
import AdminPage from "../main/pages/admin_page/AdminPage";

class UserAcces extends Component {
	constructor(props) {
		super(props);

		this.state = {
			waiting: true,
			blackOut: false,

			component: null
		};
	}

	static propTypes = {
		auth: PropTypes.object,
		location: PropTypes.object,
		history: PropTypes.object,
		cookies: PropTypes.instanceOf(Cookies)
	};

	componentDidMount() {
		if (this.props.location.from === "/auth") {
			this.checkToken();
		} else {
			this.setState({
				blackOut: true
			});
		}
	}

	async checkToken() {
		try {
			let token = this.props.cookies.get("user-access");
			let data = await this.props.auth.checkToken(token);
			this.successful(data);
		} catch (err) {
			this.failed(err);
		}
	}

	successful = data => {
		if (!data.permittedRoutes.includes(this.props.location.pathname)) {
			this.props.history.replace({
				pathname: data.redirectPath,
				from: this.props.location.from
			});
		} else {
			switch (data.audience) {
				case "admin": {
					if (data.verified) {
						this.setState({
							component: data.audience
						});
					} else {
						this.props.history.replace({
							pathname: "/auth",
							from: this.props.location.from
						});
					}

					break;
				}
				case "user": {
					this.setState({
						component: data.audience
					});

					break;
				}

				default:
					return;
			}
		}
	};

	failed = () => {
		this.props.history.replace({
			pathname: "/auth",
			from: this.props.location.from
		});
	};

	renderComponent = component => {
		switch (component) {
			case "admin": {
				return <AdminPage />;
			}
			case "user": {
				return <UserPage cookies={this.props.cookies} history={this.props.history} />;
			}
			default:
				return null;
		}
	};

	render() {
		const Fragment = React.Fragment;

		const darkScreenClassNames = classNames({
			"black-out": this.state.blackOut,
			complete: !!this.state.component
		});

		return (
			<Fragment>
				{this.state.waiting && (
					<DarkScreen
						className={darkScreenClassNames}
						onAnimationEnd={e => {
							if (e.animationName === "black-out") {
								this.checkToken();
							}

							if (e.animationName === "complete") {
								this.setState({
									waiting: false
								});
							}
						}}
					>
						Подождите...
					</DarkScreen>
				)}

				{this.renderComponent(this.state.component)}
			</Fragment>
		);
	}
}

export default Auth_API(UserAcces);

// styled-components --------------------------------

const DarkScreen = styled.div`
	${props => (props.theme.desktop ? desktop.darkScreen : mobile.darkScreen)};
`;
