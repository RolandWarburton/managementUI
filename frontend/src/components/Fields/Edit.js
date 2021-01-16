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

function Edit(props) {
	const {
		currentValue,
		disabled,
		saveButton,
		cancelButton,
		saveButtonCallback,
		closeButtonCallback,
		onChangeCallback,
		children,
	} = props;

	return (
		<Container id={props.value} color={props.color} columns={"1fr auto"}>
			{/* Input box */}
			<input
				className="is-primary"
				defaultValue={currentValue}
				id="inputField"
				disabled={disabled}
				onChange={(e) => {
					onChangeCallback(e.target.value);
				}}
			/>

			{/* Button group */}
			<div className="buttons">{children}</div>
		</Container>
	);
}

export default Edit;
