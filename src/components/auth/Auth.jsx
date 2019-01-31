import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Cookies } from "react-cookie";
import axios from "axios";

// client API
import { Auth_API } from "../../client_api/index";

// styles
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, closeIcon } from "../../images/SVG/icons";

// components
import Timer from "./auth_components/Timer";

class Auth extends Component {
	constructor(props) {
		super(props);

		this.checkToken = this.checkToken.bind(this);
		this.signIn = this.signIn.bind(this);
		this.adminVerification = this.adminVerification.bind(this);

		this.authInputs = [];
		this.verificationInputs = [];

		this.userForm = React.createRef();
		this.closeButton = React.createRef();
		this.title = React.createRef();
		this.signInButton = React.createRef();
		this.changeFormButton = React.createRef();

		this.state = {
			checkTokenWaiting: true,
			checkTokenMessage: null,
			showUserForm: false,
			registration: false,
			signInMessage: null,
			showVerificationForm: false,
			verificationComplete: false,
			redirectPath: null
		};
	}

	static propTypes = {
		auth: PropTypes.object,
		location: PropTypes.object,
		cookies: PropTypes.instanceOf(Cookies),
		path: PropTypes.string
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
					this.setState({
						checkTokenWaiting: false,
						showVerificationForm: !data.verified,
						verificationComplete: data.verified,
						redirectPath: data.redirectPath
					});

					break;
				}

				case "user": {
					this.setState({
						checkTokenWaiting: false,
						showUserForm: !data.verified,
						verificationComplete: data.verified,
						redirectPath: data.redirectPath
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

	async signIn() {
		this.clearSignInMessage();

		const login = this.authInputs[0].value;
		const password = this.authInputs[1].value;

		if (login && password) {
			try {
				const data = await this.props.auth.signIn(login, password);

				switch (data.audience) {
					case "admin": {
						this.setState({
							showVerificationForm: !data.verified,
							showUserForm: data.verified
						});

						break;
					}

					case "user": {
						this.setState({
							verificationComplete: true,
							redirectPath: data.redirectPath
						});

						break;
					}
				}
			} catch (err) {
				this.setState({
					signInMessage: err.errorMessage
				});
			}
		} else {
			this.authInputs.forEach(input => !input.value && input.classList.add("empty"));
		}
	}

	registration = () => {
		this.clearSignInMessage();

		const login = this.authInputs[0].value;
		const password = this.authInputs[1].value;
		const confirmPassword = this.authInputs[2].value;

		if (login && password && confirmPassword) {
			axios
				.post("/api/registration", { login, password, confirmPassword })
				.then(({ data }) => {
					console.log(data);
				})
				.catch(err => {
					console.log(err.response.data.message);
				});
		} else {
			this.authInputs.forEach(input => !input.value && input.classList.add("empty"));
		}
	};

	async adminVerification() {
		try {
			let key = this.verificationInputs.reduce((acc, input) => acc + input.value, "");
			let token = this.props.cookies.get("user-access");

			const data = await this.props.auth.adminVerification(key, token);
			this.setState(
				{
					verificationComplete: data.verified,
					redirectPath: data.redirectPath
				},
				() => {
					this.props.cookies.remove("expires-in-date");
				}
			);
		} catch (err) {
			this.verificationInputs.forEach((input, i) => {
				if (i === 0) {
					input.disabled = false;
					input.focus();
				} else {
					input.disabled = true;
				}

				setTimeout(() => {
					input.classList.add("wrong-key");
				}, 50 * i);
			});
		}
	}

	verificationInputsOnChange = (e, i) => {
		let currentInput = this.verificationInputs[i];
		let prevInput = this.verificationInputs[i - 1];
		let nextInput = this.verificationInputs[i + 1];

		if (e.key === "Backspace") {
			if (currentInput.value) {
				currentInput.value = "";
			} else if (!currentInput.value && i > 0) {
				prevInput.value = "";
				currentInput.disabled = true;
				prevInput.disabled = false;
				prevInput.focus();
			}
		} else if (i < this.verificationInputs.length - 1) {
			currentInput.disabled = true;
			nextInput.disabled = false;
			nextInput.focus();
		}
	};

	clearSignInMessage = () => {
		if (this.state.signInMessage) {
			this.setState({
				signInMessage: null
			});
		}
	};

	changeForm = () => {
		const setState = this.state.registration ? { registration: false, addConfirmPasswordInput: false } : { registration: true };

		this.setState(setState, () => {
			this.authInputs.forEach((input, i) => {
				i === 0 && input.focus();
				input.value = "";
			});

			this.title.current.classList.add("changing-form");
			this.signInButton.current.classList.add("changing-form");
			this.changeFormButton.current.classList.add("changing-form");
		});
	};

	onCloseModal = (history, location) => {
		if (location.from) {
			history.push(location.from);
		} else {
			history.push("/content/main");
		}
	};

	defaultState = () => {
		this.setState(
			{
				checkTokenWaiting: false,
				checkTokenMessage: null,
				showUserForm: true,
				registration: false,
				signInMessage: null,
				showVerificationForm: false,
				verificationComplete: false
			},
			() => {
				this.authInputs.forEach((input, i) => {
					i === 0 && input.focus();
					input.value = "";
				});
			}
		);
	};

	render() {
		const Fragment = React.Fragment;

		const userFormClassNames = classNames({
			registration: this.state.registration
		});

		const confirmPasswordLabelClassNames = classNames({
			"add-input": this.state.addConfirmPasswordInput
		});

		const signInMessageClassNames = classNames({
			"show-message": this.state.signInMessage
		});

		return (
			<Route
				exact
				path={this.props.path}
				render={({ history }) => {
					if (this.state.verificationComplete) {
						return <Redirect to={{ pathname: this.state.redirectPath, from: "/auth" }} />;
					} else {
						return (
							<Container>
								{this.state.checkTokenWaiting ? (
									<p style={{ position: "absolute", top: "15px", left: "15px", color: "#fff" }}>Подождите...</p>
								) : (
									this.state.checkTokenMessage
								)}

								<CSSTransition
									in={this.state.showUserForm}
									classNames={"user-form"}
									timeout={600}
									onEntered={() => {
										this.closeButton.current.classList.add("show");
									}}
									onExited={() => {
										// console.log(e);
									}}
									unmountOnExit
								>
									<Fragment>
										<UserForm
											ref={this.userForm}
											className={userFormClassNames}
											onTransitionEnd={e => {
												if (e.target === this.userForm.current && this.state.registration) {
													this.setState({
														addConfirmPasswordInput: true
													});
												}
											}}
										>
											<CloseButton ref={this.closeButton} onClick={() => this.onCloseModal(history, this.props.location)}>
												<CloseIcon />
											</CloseButton>
											<Title
												ref={this.title}
												onTransitionEnd={e => {
													if (e.target.classList.contains("changing-form")) {
														e.target.innerText = this.state.registration ? "Регистрация" : "Войдите";
														e.target.classList.remove("changing-form");
													}
												}}
											>
												Войдите
											</Title>
											<Label htmlFor="login">
												{"Логин:"}
												<Input
													type="text"
													id="login"
													autoFocus
													ref={input => (this.authInputs[0] = input)}
													onChange={this.clearSignInMessage}
													onAnimationEnd={e => {
														e.target.classList.remove("empty");
													}}
												/>
											</Label>

											<Label htmlFor="password">
												{"Пароль:"}
												<Input
													id="password"
													type="password"
													ref={input => (this.authInputs[1] = input)}
													onChange={this.clearSignInMessage}
													onAnimationEnd={e => {
														e.target.classList.remove("empty");
													}}
												/>
											</Label>

											<Label id="confirm-password-label" htmlFor="confirm-password" className={confirmPasswordLabelClassNames}>
												{"Повторите пароль:"}
												<Input
													id="confirm-password"
													type="password"
													ref={input => (this.authInputs[2] = input)}
													onChange={this.clearSignInMessage}
													onAnimationEnd={e => e.target.classList.remove("empty")}
												/>
											</Label>

											<Controls>
												<SignInButton
													ref={this.signInButton}
													onClick={this.state.registration ? this.registration : this.signIn}
													onTransitionEnd={e => {
														if (e.target.classList.contains("changing-form")) {
															e.target.innerText = this.state.registration ? "Зарегистрироваться" : "Войти";
															e.target.classList.add(this.state.registration && "registration");
															e.target.classList.remove("changing-form", !this.state.registration && "registration");
														}
													}}
												>
													Войти
												</SignInButton>
												<ChangeFormButton
													ref={this.changeFormButton}
													onClick={this.changeForm}
													onTransitionEnd={e => {
														if (e.target.classList.contains("changing-form")) {
															e.target.innerText = this.state.registration ? "Вход" : "Регистрация";
															e.target.classList.add(this.state.registration && "registration");
															e.target.classList.remove("changing-form", !this.state.registration && "registration");
														} else {
															!this.state.registration && this.userForm.current.classList.remove("registration");
														}
													}}
												>
													Регистрация
												</ChangeFormButton>
											</Controls>
										</UserForm>
										<SighInMessage className={signInMessageClassNames}>{this.state.signInMessage}</SighInMessage>
									</Fragment>
								</CSSTransition>

								<CSSTransition
									in={this.state.showVerificationForm}
									classNames={"verification-form"}
									timeout={600}
									unmountOnExit
									onExited={() => {
										//
									}}
								>
									<VerificationForm>
										<Timer expiresInDate={this.props.cookies.get("expires-in-date")} defaultState={this.defaultState} />

										<Title id="verification-form">Введите проверочный код</Title>
										<VerificationInputsContainer>
											{Array.from({ length: 5 }).map((_, i, arr) => {
												return (
													<Fragment key={"verification-input-" + i}>
														<VerificationInput
															ref={input => (this.verificationInputs[i] = input)}
															disabled={i > 0}
															autoFocus={i === 0}
															onChange={e => this.verificationInputsOnChange(e, i)}
															onKeyDown={e => {
																if (e.key === "Backspace") {
																	this.verificationInputsOnChange(e, i);
																}
																if (e.key === "Enter") {
																	this.adminVerification();
																}
															}}
															onAnimationEnd={e => {
																if (e.target && e.animationName === "wrong-key") {
																	e.target.classList.remove("wrong-key");
																	e.target.value = "";
																}
															}}
														/>
														{i < arr.length - 1 && <p style={{ color: "#959595" }}> &#1470;</p>}
													</Fragment>
												);
											})}
										</VerificationInputsContainer>
										<SignInButton id="verification" onClick={this.adminVerification}>
											Готово
										</SignInButton>
									</VerificationForm>
								</CSSTransition>
							</Container>
						);
					}
				}}
			/>
		);
	}
}

export default Auth_API(Auth);

// styled-components -------------------

const Container = styled.div`
	${props => (props.theme.desktop ? desktop.container : mobile.container)}
`;

const Title = styled.div`
	${props => (props.theme.desktop ? desktop.title : mobile.title)}
`;

const UserForm = styled.div`
	${props => (props.theme.desktop ? desktop.userForm : mobile.userForm)}
`;

const VerificationForm = styled.div`
	${props => (props.theme.desktop ? desktop.verificationForm : mobile.verificationForm)}
`;

const VerificationInputsContainer = styled.div`
	${props => (props.theme.desktop ? desktop.verificationInputsContainer : mobile.verificationInputsContainer)}
`;

const VerificationInput = styled.input.attrs({
	type: "text",
	maxLength: "1"
})`
	${props => (props.theme.desktop ? desktop.verificationInput : mobile.verificationInput)}
`;

const Label = styled.label`
	${props => (props.theme.desktop ? desktop.label : mobile.label)}
`;

const Input = styled.input`
	${props => (props.theme.desktop ? desktop.input : mobile.input)}
`;

const Controls = styled.div`
	${props => (props.theme.desktop ? desktop.controls : mobile.controls)}
`;

const SignInButton = styled.button`
	${props => (props.theme.desktop ? desktop.signInButton : mobile.signInButton)}
`;

const ChangeFormButton = styled.button`
	${props => (props.theme.desktop ? desktop.changeFormButton : mobile.changeFormButton)}
`;

const SighInMessage = styled.div`
	${props => (props.theme.desktop ? desktop.sighInMessage : mobile.sighInMessage)}
`;

const CloseIcon = styled(IconConstructor).attrs({
	body: closeIcon,
	viewBox: "-4 -4 40 40"
})`
	${props => (props.theme.desktop ? desktop.closeIcon : mobile.closeIcon)};
`;

const CloseButton = styled.div`
	${props => (props.theme.desktop ? desktop.closeButton : mobile.closeButton)};
`;
