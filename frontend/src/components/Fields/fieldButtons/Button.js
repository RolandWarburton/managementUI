import React, { Children } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEdit,
	faSave,
	faTimesCircle,
	faUndo,
	faTrashAlt,
	faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

function Button(props) {
	const { disabled, callback, children } = props;

	return (
		<button className="button is-text" onClick={callback}>
			{children}
		</button>
	);
}

export default Button;
