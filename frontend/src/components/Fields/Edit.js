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
		saveButtonCallback,
		closeButtonCallback,
		onChangeCallback,
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
			<div className="buttons">
				{/* save button */}
				<button className="button is-text" onClick={saveButtonCallback}>
					<FontAwesomeIcon
						className="has-text-right icon"
						icon={faSave}
					/>
				</button>

				{/* cancel button */}
				<button
					className="button is-text"
					onClick={closeButtonCallback}
				>
					<FontAwesomeIcon
						className="has-text-right icon"
						icon={faTimesCircle}
					/>
				</button>
			</div>
		</Container>
	);
}

export default Edit;
