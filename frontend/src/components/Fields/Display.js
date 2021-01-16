import React, { Children } from "react";
import {
	DisplayContainer,
	EditContainer,
	BaseStyle,
	Container,
} from "./pageEditfield.style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faEdit,
	faSave,
	faTimesCircle,
	faUndo,
	faTrashAlt,
	faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

function Display(props) {
	const { showTitle, color, title, disabled, currentValue, children } = props;
	return (
		<Container id={props.value} color={props.color} columns={"1fr auto"}>
			<span>{currentValue}</span>

			{/* Button group */}
			<div className="buttons">{children}</div>
		</Container>
	);
}

export default Display;
