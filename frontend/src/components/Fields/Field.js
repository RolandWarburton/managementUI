import React, { useState, useEffect, useRef } from "react";
import Edit from "./Edit";
import Display from "./Display";
import Add from "./Add";
import Button from "./fieldButtons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEdit,
	faSave,
	faTimesCircle,
	faUndo,
	faTrashAlt,
	faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

const Field = (props) => {
	const {
		_id,
		initialMode,
		value,
		title,
		fieldName,
		disabled,
		saveButtonCallback,
		closeButtonCallback,
		undoButtonCallback,
		editButtonCallback,
		deleteButtonCallback,
		onChangeCallback,
	} = props;

	const [mode, setMode] = useState(initialMode);
	const [firstValue, setFirstValue] = useState(value);
	const [currentValue, setCurrentValue] = useState(value);
	const [newValue, setNewValue] = useState(value);

	// keep a reference to all of the state that we need to pass back up to the <Modal>
	const stateRef = useRef();
	stateRef.current = {
		firstValue: firstValue,
		currentValue: currentValue,
		newValue: newValue,
	};

	function timeout(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const renderField = (mode) => {
		switch (mode) {
			case "edit":
			case "add":
				return (
					<Edit
						currentValue={currentValue}
						disabled={false}
						onChangeCallback={(fieldString) => {
							// when the field changes:
							// 1. update the fields newValue state
							// 2. trigger onChangeCallback function prop which passes this state back to <Modal> to handle
							setNewValue(fieldString);
							onChangeCallback(stateRef.current, _id, fieldName);
						}}
					>
						{/* save button */}
						{!disabled && (
							<Button
								callback={async () => {
									// this will be the save button
									// when we save:
									// 1. swap back to display mode so this switch renders the <Display> field instead
									// 2. trigger the saveCallback function prop which passes this state back to <Modal> to handle
									// 3. set the response from the callback to the new field value. else catch and print the error
									setMode("display");
									const newCurrentValue = await saveButtonCallback(
										stateRef.current,
										_id,
										fieldName
									);

									// check if the response was an error
									if (newCurrentValue instanceof Error) {
										const errorMessage =
											newCurrentValue.message;

										// alert the error message in the field
										setCurrentValue(
											`Error: ${errorMessage}` ||
												"Something went wrong"
										);

										// timeout for 1.5s
										await timeout(1500);

										// set the value back to what it was before (because it failed to update)
										setCurrentValue(currentValue);
									} else {
										// we had no trouble updating, so update the value client side
										setCurrentValue(newCurrentValue);
									}
								}}
							>
								<FontAwesomeIcon
									className="has-text-right icon"
									icon={faSave}
								/>
							</Button>
						)}

						{/* close button */}
						{!disabled && (
							<Button
								callback={() => {
									// when we close:
									// 1. swap back to display mode so this switch renders the <Display> field instead
									// 2. Set our field value back to the current one
									// 3. trigger the saveCallback function prop which passes this state back to <Modal> to handle
									setMode("display");
									setNewValue(currentValue);
									closeButtonCallback(
										stateRef.current,
										_id,
										fieldName
									);
								}}
							>
								<FontAwesomeIcon
									className="has-text-right icon"
									icon={faTimesCircle}
								/>
							</Button>
						)}
					</Edit>
				);

			case "display":
			default:
				return (
					<Display
						showTitle={true}
						color="#323232"
						title={title}
						currentValue={currentValue}
						onChangeCallback={(fieldString) => {
							// when the field changes:
							// 1. update the fields newValue state
							// 2. trigger onChangeCallback function prop which passes this state back to <Modal> to handle
							setNewValue(fieldString);
							onChangeCallback(stateRef.current, _id);
						}}
					>
						{/* undo button */}
						{currentValue !== firstValue && (
							<Button
								callback={async () => {
									// when we undo:
									// 1. trigger the undoButtonCallback which passes this state back to <Modal> to handle
									// 2. set the current value of the button the the first value
									// 3. set the new value of the button to the first value
									await undoButtonCallback(
										stateRef.current,
										_id,
										fieldName
									);
									setCurrentValue(firstValue);
									setNewValue(firstValue);
								}}
							>
								<FontAwesomeIcon
									className="has-text-right icon"
									icon={faUndo}
								/>
							</Button>
						)}

						{/* edit button */}
						{!disabled && (
							<Button
								callback={() => {
									// when we edit:
									// 1. swap back to display mode so this switch renders the <Display> field instead
									// 2. Set our field value back to the current one
									// 3. trigger the editButtonCallback function prop which passes this state back to <Modal> to handle
									setMode("edit");
									setNewValue(currentValue);
									editButtonCallback(stateRef.current, _id);
								}}
							>
								<FontAwesomeIcon
									className="has-text-right icon"
									icon={faEdit}
								/>
							</Button>
						)}

						{/* delete button */}
						{!disabled && (
							<Button
								callback={() => {
									// when we delete
									// 1. trigger the deleteCallback
									console.log("delete");
									deleteButtonCallback(stateRef.current, _id);
								}}
							>
								<FontAwesomeIcon
									className="has-text-right icon"
									icon={faTrashAlt}
								/>
							</Button>
						)}
					</Display>
				);
		}
	};

	// return the rendered field
	return renderField(mode);
};

export default Field;
