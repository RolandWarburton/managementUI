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
	const {
		showTitle,
		color,
		title,
		disabled,
		currentValue,
		firstValue,
		newValue,
		editButtonCallback,
		undoButtonCallback,
		deleteButtonCallback,
	} = props;
	return (
		<Container id={props.value} color={props.color} columns={"1fr auto"}>
			<span>{currentValue}</span>

			{/* Button group */}
			<div className="buttons">
				{/* undo button */}
				{currentValue != firstValue && (
					<button
						className="button is-text"
						onClick={undoButtonCallback}
					>
						<FontAwesomeIcon
							className="has-text-right icon"
							icon={faUndo}
						/>
					</button>
				)}
				{/* edit button */}
				<button className="button is-text" onClick={editButtonCallback}>
					<FontAwesomeIcon
						className="has-text-right icon"
						icon={faEdit}
					/>
				</button>

				{/* delete button */}
				<button
					className="button is-text"
					onClick={deleteButtonCallback}
				>
					<FontAwesomeIcon
						className="has-text-right icon"
						icon={faTrashAlt}
					/>
				</button>
			</div>
		</Container>
	);
}

export default Display;
