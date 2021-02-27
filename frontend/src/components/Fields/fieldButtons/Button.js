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

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

// import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

function ButtonGenerator(props) {
	const { disabled, callback, children } = props;

	return (
		<IconButton size={"small"} aria-label="delete" onClick={callback}>
			{children}
		</IconButton>
	);
}

export default ButtonGenerator;
