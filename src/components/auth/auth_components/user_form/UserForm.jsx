import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Cookies } from "react-cookie";

// styles
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// icons
import { IconConstructor, closeIcon } from "../../../../images/SVG/icons";

// components
import TermsOfUse from "../terms_of_use/TermsOfUse";

import { closeAuthPage } from "../../../../actions/transitionsActions";

class UserForm extends Component {
	constructor(props) {
		super(props);

		this.authInputs = [];

		this.signIn = this.signIn.bind(this);
		this.registration = this.registration.bind(this);

		this.userForm = React.createRef();
		this.closeButton = React.createRef();
		this.title = React.createRef();
		this.actionButton = React.createRef();
		this.changeFormButton = React.createRef();

		this.state = {
			show: false,
			showTermsOfUse: false,
			registration: false,
			addConfirmPasswordInput: false,
			signInMessage: null
		};
	}

	static propTypes = {
		closeAuthPage: PropTypes.func,
		signInComplete: PropTypes.func,
		onmounted: PropTypes.func,
		auth: PropTypes.object,
		history: PropTypes.object,
		location: PropTypes.object,
		cookies: PropTypes.instanceOf(Cookies)
	};

	componentDidMount() {
		this.setState({
			show: true
		});
	}

	async signIn() {
		const login = this.authInputs[0].value;
		const password = this.authInputs[1].value;

		if (login && password) {
			this.actionButtonAnimations(null, "start");

			try {
				const data = await this.props.auth.signIn(login, password);
				this.setState(
					{
						show: false,
						actionWaiting: false
					},
					() => {
						this.props.signInComplete(data);
					}
				);
			} catch (err) {
				this.setState({
					signInMessage: err.errorMessage,
					actionWaiting: false
				});
			}
		} else {
			this.authInputs.forEach(input => !input.value && input.classList.add("empty"));
		}
	}

	async registration() {
		const login = this.authInputs[0].value;
		const password = this.authInputs[1].value;
		const confirmPassword = this.authInputs[2].value;
		const iAccept = this.authInputs[3].checked;

		if (login && password && confirmPassword) {
			if (!iAccept) {
				this.setState(
					{
						signInMessage: (
							<p>
								А пользовательское соглашение?
								<br />
								Куда ж без него?
							</p>
						)
					},
					() => {
						this.authInputs[3].classList.add("empty");
					}
				);
			} else if (/[^a-zA-Z\d]/.test(login + password + confirmPassword)) {
				this.setState({
					signInMessage: (
						<p>
							Хорошо бы латинскими буквами...
							<br />А еще цифры можно...
						</p>
					)
				});
			} else if (password !== confirmPassword) {
				this.setState({
					signInMessage: (
						<p>
							Пароли не совпадают!
							<br />
							Будьте внимательны!
						</p>
					)
				});
			} else if (password.length < 8) {
				this.setState({
					signInMessage: (
						<p>
							Хорошо бы пароль подлиннее...
							<br />8 символов будет достаточно...
						</p>
					)
				});
			} else if (!/\d/.test(password)) {
				this.setState({
					signInMessage: (
						<p>
							Хорошо бы в пароль цифр чуть-чуть...
							<br />У нас тут безопасность, так сказать...
						</p>
					)
				});
			} else {
				try {
					this.actionButtonAnimations(null, "start");

					const data = await this.props.auth.registration(login, password, confirmPassword);
					if (data.registrationComplete) {
						this.setState(
							{
								signInMessage: (
									<p>
										Регистрация удалась!
										<br />
										Добро пожаловать, {login}!
									</p>
								),
								actionWaiting: false
							},
							() => {
								this.changeForm();
							}
						);
					}
				} catch (err) {
					this.setState({
						signInMessage: err.errorMessage,
						actionWaiting: false
					});
				}
			}
		} else {
			this.authInputs.forEach((input, i) => {
				if ((!input.value && i < 3) || (!input.checked && i === 3)) {
					input.classList.add("empty");
				}
			});
		}
	}

	actionButtonAnimations = (e, type) => {
		switch (type) {
			case "start": {
				this.setState(
					{
						actionWaiting: true
					},
					() => {
						this.actionButton.current.classList.add("action-waiting");
						this.changeFormButton.current.classList.add("action-waiting");
					}
				);
				break;
			}

			case "stop": {
				if (e.animationName === "action-waiting" && !this.state.actionWaiting) {
					this.actionButton.current.classList.remove("action-waiting");
					this.changeFormButton.current.classList.remove("action-waiting");
				}
				break;
			}

			default:
				return;
		}
	};

	changeForm = () => {
		const setState = this.state.registration ? { registration: false, addConfirmPasswordInput: false } : { registration: true };

		this.setState(setState, () => {
			this.authInputs.forEach((input, i) => {
				if (i < 3) {
					i === 0 && input.focus();
					input.value = "";
				} else {
					input.checked = false;
				}
			});

			this.title.current.classList.add("changing-form");
			this.actionButton.current.classList.add("changing-form");
			this.changeFormButton.current.classList.add("changing-form");
		});
	};

	onCloseModal = (history, location) => {
		let coordinates = this.closeButton.current.getBoundingClientRect();
		this.closeButton.current.style.display = "none";
		this.props.closeAuthPage({ top: coordinates.top, left: coordinates.left });

		if (location.from) {
			history.push(location.from);
		} else {
			history.push("/content/main");
		}
	};

	render() {
		const formContainerClassNames = classNames({
			"show-terms-of-use": this.state.showTermsOfUse
		});

		const formClassNames = classNames({
			registration: this.state.registration
		});

		const registrationLabelsClassNames = classNames({
			"add-input": this.state.addConfirmPasswordInput
		});

		const signInMessageClassNames = classNames({
			"show-message": this.state.signInMessage
		});

		return (
			<>
				<CSSTransition
					in={this.state.show}
					classNames={"user-form"}
					timeout={{ enter: 600, exit: 400 }}
					onEntered={() => {
						this.closeButton.current.classList.add("show");
					}}
					onExited={() => {
						this.props.onmounted();
					}}
					unmountOnExit
				>
					<FormContainer
						className={formContainerClassNames}
						onTransitionEnd={e => {
							if (e.target.classList.contains("show-terms-of-use")) {
								e.target.style.zIndex = -1;
							} else {
								e.target.style.zIndex = 1;
							}
						}}
					>
						<CloseButton
							ref={this.closeButton}
							onClick={e => e.target.classList.add("closing")}
							onAnimationEnd={e => {
								if (e.animationName === "closing") {
									this.onCloseModal(this.props.history, this.props.location);
								}
							}}
						>
							<CloseIcon />
						</CloseButton>

						<Form
							ref={this.userForm}
							className={formClassNames}
							onTransitionEnd={e => {
								e.stopPropagation();
								if (e.target === this.userForm.current && this.state.registration) {
									this.setState({
										addConfirmPasswordInput: true
									});
								}
							}}
						>
							<Title
								ref={this.title}
								onTransitionEnd={e => {
									e.stopPropagation();
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
									onAnimationEnd={e => {
										e.target.classList.remove("empty");
									}}
								/>
							</Label>

							<RegistrationInputs>
								<Label id="confirm-password-label" htmlFor="confirm-password" className={registrationLabelsClassNames}>
									{"Повторите пароль:"}
									<Input
										id="confirm-password"
										type="password"
										ref={input => (this.authInputs[2] = input)}
										onAnimationEnd={e => e.target.classList.remove("empty")}
									/>
								</Label>

								<Label htmlFor={null} id="checkbox-label" className={registrationLabelsClassNames}>
									<Checkbox
										ref={input => (this.authInputs[3] = input)}
										id="checkbox"
										onAnimationEnd={e => {
											e.target.classList.remove("empty");
										}}
									/>
									<p>
										Я принимаю условия{" "}
										<span
											style={{ color: "#70bc7b", pointerEvents: "auto", cursor: "pointer" }}
											onClick={e => {
												e.preventDefault();
												this.setState({
													showTermsOfUse: true
												});
											}}
										>
											пользовательского соглашения
										</span>
									</p>
								</Label>
							</RegistrationInputs>

							<Controls>
								<ActionButton
									ref={this.actionButton}
									onClick={() => {
										this.setState({
											signInMessage: null
										});

										return this.state.registration ? this.registration() : this.signIn();
									}}
									onTransitionEnd={e => {
										e.stopPropagation();
										if (e.target.classList.contains("changing-form")) {
											e.target.innerText = this.state.registration ? "Зарегистрироваться" : "Войти";
											e.target.classList.add(this.state.registration && "registration");
											e.target.classList.remove("changing-form", !this.state.registration && "registration");
										}
									}}
									onAnimationIteration={e => this.actionButtonAnimations(e, "stop")}
								>
									Войти
								</ActionButton>
								<ChangeFormButton
									ref={this.changeFormButton}
									onClick={this.changeForm}
									onTransitionEnd={e => {
										e.stopPropagation();
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
							<SignInMessage
								className={signInMessageClassNames}
								onAnimationEnd={e => {
									if (e.animationName === "show-message") {
										this.setState({
											signInMessage: null
										});
									}
								}}
							>
								{this.state.signInMessage}
							</SignInMessage>
						</Form>
					</FormContainer>
				</CSSTransition>

				{this.state.showTermsOfUse && (
					<TermsOfUse
						close={() => {
							this.setState({
								showTermsOfUse: false
							});
						}}
					/>
				)}
			</>
		);
	}
}

export default connect(
	null,
	{ closeAuthPage }
)(UserForm);

// styled-components ----------------------------

const FormContainer = styled.div`
	${props => (props.theme.desktop ? desktop.formContainer : mobile.formContainer)}
`;

const Form = styled.div`
	${props => (props.theme.desktop ? desktop.form : mobile.form)}
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

const Title = styled.div`
	${props => (props.theme.desktop ? desktop.title : mobile.title)}
`;

const Label = styled.label`
	${props => (props.theme.desktop ? desktop.label : mobile.label)}
`;

const Input = styled.input`
	${props => (props.theme.desktop ? desktop.input : mobile.input)}
`;

const RegistrationInputs = styled.div`
	${props => (props.theme.desktop ? desktop.registrationInputs : mobile.registrationInputs)}
`;

const Checkbox = styled.input.attrs({
	type: "checkbox"
})`
	${props => (props.theme.desktop ? desktop.checkbox : mobile.checkbox)}
`;

const Controls = styled.div`
	${props => (props.theme.desktop ? desktop.controls : mobile.controls)}
`;

const ActionButton = styled.button`
	${props => (props.theme.desktop ? desktop.actionButton : mobile.actionButton)}
`;

const ChangeFormButton = styled.button`
	${props => (props.theme.desktop ? desktop.changeFormButton : mobile.changeFormButton)}
`;

const SignInMessage = styled.div`
	${props => (props.theme.desktop ? desktop.signInMessage : mobile.signInMessage)}
`;
