import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const ModalsAndOther = props => {
	return ReactDOM.createPortal(props.children, document.getElementById("modals-and-other-root"));
};

ModalsAndOther.propTypes = {
	children: PropTypes.array
};

export default ModalsAndOther;
