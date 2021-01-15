import React, { useState, useEffect, useRef } from "react";
import Edit from "./Edit";
import Display from "./Display";
import Add from "./Add";

const Field = (props) => {
	const {
		_id,
		initialMode,
		value,
		title,
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
						saveButtonCallback={async () => {
							// this will be the save button
							// when we save:
							// 1. swap back to display mode so this switch renders the <Display> field instead
							// 2. trigger the saveCallback function prop which passes this state back to <Modal> to handle
							// 3. set the response from the callback to the new field value. else catch and print the error
							setMode("display");

							const newCurrentValue = await saveButtonCallback(
								stateRef.current,
								_id
							);

							// check if the response was an error
							if (newCurrentValue instanceof Error) {
								const errorMessage = newCurrentValue.message;

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
						closeButtonCallback={() => {
							// this will be the save button
							// when we save:
							// 1. swap back to display mode so this switch renders the <Display> field instead
							// 2. Set our field value back to the current one
							// 3. trigger the saveCallback function prop which passes this state back to <Modal> to handle
							setMode("display");
							setNewValue(currentValue);
							closeButtonCallback(stateRef.current, _id);
						}}
						onChangeCallback={(fieldString) => {
							// when the field changes:
							// 1. update the fields newValue state
							// 2. trigger onChangeCallback function prop which passes this state back to <Modal> to handle
							setNewValue(fieldString);
							onChangeCallback(stateRef.current, _id);
						}}
					/>
				);

			// case "add":
			// 	return <Edit currentValue={""} />;

			case "display":
			default:
				return (
					<Display
						showTitle={true}
						color="#323232"
						title={title}
						disabled={false}
						currentValue={currentValue}
						firstValue={firstValue}
						newValue={newValue}
						undoButtonCallback={() => {
							// when we undo:
							// 1. set the current value of the button the the first value
							// 2. set the new value of the button to the first value
							// 3. trigger the undoButtonCallback which passes this state back to <Modal> to handle
							setCurrentValue(firstValue);
							setNewValue(firstValue);
							undoButtonCallback(stateRef.current, _id);
						}}
						editButtonCallback={() => {
							// when we edit:
							// 1. swap back to display mode so this switch renders the <Display> field instead
							// 2. Set our field value back to the current one
							// 3. trigger the editButtonCallback function prop which passes this state back to <Modal> to handle
							setMode("edit");
							setNewValue(currentValue);
							editButtonCallback(stateRef.current, _id);
						}}
						deleteButtonCallback={() => {
							// when we delete
							// 1. trigger the deleteCallback
							deleteButtonCallback(stateRef.current, _id);
						}}
						onChangeCallback={(fieldString) => {
							// when the field changes:
							// 1. update the fields newValue state
							// 2. trigger onChangeCallback function prop which passes this state back to <Modal> to handle
							setNewValue(fieldString);
							onChangeCallback(stateRef.current, _id);
						}}
					/>
				);
		}
	};

	// return the rendered field
	return renderField(mode);
};

export default Field;
