import React, { Component } from "react";
import PropTypes from "prop-types";
import { Cookies } from "react-cookie";

// styles
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

// components
import Timer from "../timer/Timer";

class VerificationForm extends Component {
	constructor(props) {
		super(props);

		this.inputs = [];

		this.actionButton = React.createRef();

		this.adminVerification = this.adminVerification.bind(this);

		this.state = {
			show: false,
			actionWaiting: false
		};
	}

	static propTypes = {
		timeIsUp: PropTypes.func,
		verificationComplete: PropTypes.func,
		onmounted: PropTypes.func,
		auth: PropTypes.object,
		location: PropTypes.object,
		cookies: PropTypes.instanceOf(Cookies),
		path: PropTypes.string
	};

	componentDidMount() {
		this.setState({
			show: true
		});
	}

	inputsOnChange = (e, i) => {
		let currentInput = this.inputs[i];
		let prevInput = this.inputs[i - 1];
		let nextInput = this.inputs[i + 1];

		if (e.key === "Backspace") {
			if (currentInput.value) {
				currentInput.value = "";
			} else if (!currentInput.value && i > 0) {
				prevInput.value = "";
				currentInput.disabled = true;
				prevInput.disabled = false;
				prevInput.focus();
			}
		} else if (i < this.inputs.length - 1) {
			currentInput.disabled = true;
			nextInput.disabled = false;
			nextInput.focus();
		}
	};

	async adminVerification() {
		try {
			this.actionButtonAnimations(null, "start");

			let key = this.inputs.reduce((acc, input) => acc + input.value, "");
			let token = this.props.cookies.get("user-access");

			const data = await this.props.auth.adminVerification(key, token);
			this.setState(
				{
					actionWaiting: false
				},
				() => {
					this.props.verificationComplete(data);

					this.props.cookies.remove("expires-in-date");
				}
			);
		} catch (err) {
			this.setState(
				{
					actionWaiting: false
				},
				() => {
					this.inputs.forEach((input, i) => {
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
			);
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
					}
				);
				break;
			}

			case "stop": {
				if (e.animationName === "verification-action-waiting" && !this.state.actionWaiting) {
					this.actionButton.current.classList.remove("action-waiting");
				}
				break;
			}

			default:
				return;
		}
	};

	render() {
		const Fragment = React.Fragment;

		return (
			<CSSTransition
				in={this.state.show}
				classNames={"verification-form"}
				timeout={{ enter: 600, exit: 400 }}
				onExited={() => {
					this.props.onmounted();
				}}
				unmountOnExit
			>
				<Form>
					<Timer
						expiresInDate={this.props.cookies.get("expires-in-date")}
						timeIsUp={() => {
							this.setState(
								{
									show: false
								},
								() => {
									this.props.timeIsUp();
								}
							);
						}}
					/>

					<Title>Введите проверочный код</Title>
					<InputsContainer>
						{Array.from({ length: 5 }).map((_, i, arr) => {
							return (
								<Fragment key={"verification-input-" + i}>
									<Input
										ref={input => (this.inputs[i] = input)}
										disabled={i > 0}
										autoFocus={i === 0}
										onChange={e => this.inputsOnChange(e, i)}
										onKeyDown={e => {
											if (e.key === "Backspace") {
												this.inputsOnChange(e, i);
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
									{i < arr.length - 1 && <p style={{ color: "#959595" }}>&#1470;</p>}
								</Fragment>
							);
						})}
					</InputsContainer>
					<ActionButton
						ref={this.actionButton}
						onClick={this.adminVerification}
						onAnimationIteration={e => this.actionButtonAnimations(e, "stop")}
					>
						Готово
					</ActionButton>
				</Form>
			</CSSTransition>
		);
	}
}

export default VerificationForm;

// styled-components -------------------------------------------

const Form = styled.div`
	${props => (props.theme.desktop ? desktop.form : mobile.form)}
`;

const Title = styled.div`
	${props => (props.theme.desktop ? desktop.title : mobile.title)}
`;

const InputsContainer = styled.div`
	${props => (props.theme.desktop ? desktop.inputsContainer : mobile.inputsContainer)}
`;

const Input = styled.input.attrs({
	type: "text",
	maxLength: "1"
})`
	${props => (props.theme.desktop ? desktop.input : mobile.input)}
`;

const ActionButton = styled.button`
	${props => (props.theme.desktop ? desktop.actionButton : mobile.actionButton)}
`;
