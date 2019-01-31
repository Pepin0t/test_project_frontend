import React, { Component } from "react";
import PropTypes from "prop-types";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

class Timer extends Component {
	constructor(props) {
		super(props);

		this.timerNumbers = [];

		this.state = {
			timeLeft: undefined
		};
	}

	static propTypes = {
		defaultState: PropTypes.func,
		expiresInDate: PropTypes.string
	};

	componentDidMount() {
		this.startTimer(this.props.expiresInDate);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	startTimer = expiresInDate => {
		const convertTime = (t, prevTimeLeft = [0, 0, 0, 0]) => {
			let time = new Date(t);

			let minutes = "0" + time.getMinutes();
			let seconds = "0" + time.getSeconds();

			let timeLeft = [minutes.substr(-2, 1), minutes.substr(-1, 1), seconds.substr(-2, 1), seconds.substr(-1, 1)];

			if (!this.state.timeLeft || this.state.timeLeft.join("") !== timeLeft.join("")) {
				this.setState(
					{
						timeLeft
					},
					() => {
						this.timerNumbers.forEach((number, i) => {
							if (number) {
								if (timeLeft[i] !== prevTimeLeft[i]) {
									number.classList.add("change");
								}

								if (!number.dataset.after) {
									number.dataset.after = timeLeft[i];
								}
							}
						});
					}
				);
			}
		};

		this.timer = setInterval(() => {
			convertTime(expiresInDate - Date.now(), this.state.timeLeft);

			if (this.state.timeLeft.join("") === "0000") {
				this.props.defaultState();
			}
		}, 100);
	};

	render() {
		const Fragment = React.Fragment;

		return (
			<TimerContainer>
				{Array.from({ length: 4 }).map((_, i) => {
					return (
						<Fragment key={"timer-number-" + i}>
							<TimerNumber
								ref={number => (this.timerNumbers[i] = number)}
								onAnimationStart={e => {
									if (e.target && e.animationName === "change-number") {
										e.target.dataset.before = this.state.timeLeft[i];
									}
								}}
								onAnimationEnd={e => {
									if (e.target && e.animationName === "change-number") {
										e.target.classList.remove("change");
										e.target.dataset.after = this.state.timeLeft[i];
									}
								}}
							/>
							{i === 1 && <div style={{ marginRight: "5px", fontWeight: 600, color: "#fff" }}>:</div>}
						</Fragment>
					);
				})}
			</TimerContainer>
		);
	}
}

export default Timer;

// styled components ---------------------------------

const TimerContainer = styled.div`
	${props => (props.theme.desktop ? desktop.timerContainer : mobile.timerContainer)}
`;

const TimerNumber = styled.div`
	${props => (props.theme.desktop ? desktop.timerNumber : mobile.timerNumber)}
`;
