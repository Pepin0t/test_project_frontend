import React, { Component } from "react";
import ReactDOM from "react-dom";

class ModalsAndOther extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return ReactDOM.createPortal(this.props.children, document.getElementById("modals-and-other-root"));
	}
}

export default ModalsAndOther;
