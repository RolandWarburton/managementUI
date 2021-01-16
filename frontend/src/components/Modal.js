import React, { useState } from "react";
import Dropdown from "./dropdowns/Dropdown";
import { Button } from "@material-ui/core";
import "../styles/styles.scss";
import Edit from "./Fields/Edit";
import {
	sourceSaveButtonHandler,
	sourceUndoButtonHandler,
	sourceAddButtonHandler,
} from "./fieldCallbacks/sourceDropdownCallbacks";

import {
	modalSaveButtonCallback,
	modalUndoButtonHandler,
} from "./fieldCallbacks/modalFieldCallbacks";

import PageEditField from "./pageEditField/PageEditField";
import Field from "./Fields/Field";

// callback to update the main fields

const getPage = async (_id) => {
	const url = `/api/v1/watch/page?_id=${_id}`;
	const response = await fetch(url, { method: "GET" });

	if (response.status !== 200) {
		throw new Error(`Response to ${url} returned a non 200 status`);
	}

	const json = await response.json();
	return json;
};

const deletePageHandler = async (_id) => {
	const postURL = `/api/v1/watch/delete/${_id}`;
	const options = {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	};
	const result = await (await fetch(postURL, options)).json();
	return result;
};

const deleteButtonHandler = async (values, _id) => {
	// extract the values
	const { firstValue, currentValue, newValue } = values;
};

const notImplemented = (functionName) => {
	return functionName + " function not implemented";
};

export default function Model(props) {
	const [open, setOpen] = useState(false);
	const [fields, setFields] = useState([]);
	const [source, setSource] = useState([]);
	const { _id } = props.data.original;

	// toggle the modal
	const handleModalToggle = async () => {
		// a template that defines each field to load in
		const formFields = [
			{
				title: "ID",
				fieldName: "_id",
				value: props._id,
				disabled: true,
			},
			{
				title: "Page Name",
				fieldName: "pageName",
				value: props.pageName,
				disabled: false,
			},
			{
				title: "Website Path",
				fieldName: "websitePath",
				value: props.websitePath,
				disabled: false,
			},
			{
				title: "Hidden",
				fieldName: "hidden",
				value: props.hidden,
				disabled: false,
			},
			{
				title: "Revision",
				fieldName: "__v",
				value: props.__v,
				history: props.history,
				disabled: true,
			},
		];

		// if the modal is opening load in the fields for it
		if (!open) {
			const fields = formFields.map((field, i) => {
				return (
					<Field
						_id={_id}
						initialMode={"display"}
						value={field.value}
						title={field.title}
						fieldName={field.fieldName}
						disabled={field.disabled}
						key={_id + i}
						saveButtonCallback={modalSaveButtonCallback}
						editButtonCallback={notImplemented}
						closeButtonCallback={notImplemented}
						onChangeCallback={notImplemented}
						deleteButtonCallback={notImplemented}
						undoButtonCallback={modalUndoButtonHandler}
					/>
				);
			});
			setFields(fields);
		}

		// if the modal is opening load in the sources for it (for the dropdown)
		if (!open) {
			const page = await getPage(_id);
			setSource([...page.source]);

			// add one more source to render as the "add field"
			if (
				!source.some((pageSource) => pageSource.initialMode === "add")
			) {
				setSource([
					...page.source,
					{
						url: "",
						remote: true,
						initialMode: "add",
					},
				]);
			}
			console.log(source);
		}
	};

	return (
		<>
			{/* open the modal button */}
			<button
				className="button is-dark"
				key={props.cellID}
				onClick={() => {
					setOpen(true);
					handleModalToggle();
				}}
			>
				Edit
			</button>

			{/* Modal wrapper */}
			<div className={`modal ${open ? "is-active" : ""} `}>
				{/* Dim background */}
				<div
					className="modal-background"
					onClick={() => {
						setOpen(false);
						handleModalToggle();
					}}
				></div>

				{/* Modal card */}
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">{props.pageName}</p>
						{/* top right close */}
						<button
							className="delete"
							aria-label="close"
							onClick={() => {
								setOpen(false);
							}}
						></button>
					</header>
					<section className="modal-card-body">
						{/* print out every form field for this modal */}
						{fields.map((f) => f)}
						<Dropdown title="test">
							{open && source.length > 0
								? source.map((pageSource, index) => {
										return (
											<Field
												_id={_id}
												initialMode={
													pageSource.initialMode ||
													"display"
												}
												value={pageSource.url}
												title="title"
												fieldName={"source"}
												disabled={false}
												key={`${_id}_${index}`}
												saveButtonCallback={async (
													values,
													_id,
													fieldName
												) => {
													if (
														pageSource.initialMode ==
														"add"
													) {
														await sourceAddButtonHandler(
															values,
															_id,
															fieldName
														);
													} else {
														await sourceSaveButtonHandler(
															values,
															_id,
															fieldName
														);
													}

													console.log(source);

													if (
														!source.some(
															(pageSource) =>
																pageSource.initialMode ===
																"add"
														)
													) {
														setSource([
															...source,
															{
																url: "",
																remote: true,
																initialMode:
																	"add",
															},
														]);
													}

													return values.newValue;
												}}
												closeButtonCallback={
													notImplemented
												}
												undoButtonCallback={
													sourceUndoButtonHandler
												}
												editButtonCallback={
													notImplemented
												}
												deleteButtonCallback={
													deleteButtonHandler
												}
												onChangeCallback={
													notImplemented
												}
											/>
										);
								  })
								: "loading"}
						</Dropdown>
					</section>
					<footer className="modal-card-foot">
						<Button
							variant="contained"
							type="submit"
							color="primary"
							disabled={false}
							onClick={async () => {
								await deletePageHandler(_id);
								setOpen(false);
								handleModalToggle();
							}}
						>
							Delete
						</Button>
					</footer>
				</div>
				{/* End modal card */}
			</div>
			{/* End modal wrapper */}
		</>
	);
}
