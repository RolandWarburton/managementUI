import React, { useState } from "react";
import Dropdown from "./dropdowns/Dropdown";
import { Button } from "@material-ui/core";
import "../styles/styles.scss";
import Edit from "./Fields/Edit";

import PageEditField from "./pageEditField/PageEditField";
import Field from "./Fields/Field";

// callback to update the main fields
const formCallback = async (fieldState, avoid, push) => {
	const { _id, fieldName, newValue } = fieldState;
	// UPDATE WHERE SELECT _id IS _id
	const filter = { _id: _id };

	// SET source.url = newValue
	const update = { [fieldName]: push };

	// print them out for debugging
	console.log(`filter: ${JSON.stringify(filter)}`);
	console.log(`update: ${JSON.stringify(update)}`);

	// construct the body request
	const body = {
		filter: filter,
		update: update,
	};

	// stringify it for the POST request
	console.log("stringifying the body");
	const bodyString = JSON.stringify(body);

	// send the post request
	const url = `/api/v1/watch/update/${_id}`;
	return fetch(url, {
		method: "PATCH",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
		body: bodyString,
	});
};

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

const saveButtonHandler = async (values, _id) => {
	// extract the values
	const { firstValue, currentValue, newValue } = values;

	// construct the url
	const url = `/api/v1/watch/update/${_id}`;

	// mongo style filter
	const filter = {
		_id: _id,
		"source.url": currentValue,
	};

	// mongo style update
	const update = {
		$set: { "source.$.url": newValue, "source.$.remote": true },
	};

	// create the options for the request
	const options = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			filter: filter,
			update: update,
		}),
	};

	// do the request
	try {
		const response = await fetch(url, options);

		if (response.status !== 200) {
			throw new Error("Response status was not 200");
		} else {
			return newValue;
		}
	} catch (err) {
		return err;
	}
};

const undoButtonHandler = async (values, _id) => {
	// extract the values
	const { firstValue, currentValue, newValue } = values;

	// construct the url
	const url = `/api/v1/watch/update/${_id}`;

	// mongo style filter
	const filter = {
		_id: _id,
	};

	// mongo style update
	const update = {
		source: [
			{
				url: firstValue,
			},
		],
	};

	// create the options for the request
	const options = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			filter: filter,
			update: update,
		}),
	};

	// do the request
	try {
		const response = await fetch(url, options);

		if (response.status !== 200)
			throw new Error("Response status was not 200");
		return currentValue;
	} catch (err) {
		return newValue;
	}
};

const addButtonHandler = async (values, _id) => {
	// extract the values
	const { firstValue, currentValue, newValue } = values;

	// construct the url
	const url = `/api/v1/watch/update/source/${_id}`;

	// create the options for the request
	const options = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			url: newValue,
			remote: "true",
		}),
	};

	// do the request
	try {
		const response = await fetch(url, options);

		if (response.status !== 200) {
			throw new Error("Response status was not 200");
		} else {
			return newValue;
		}
	} catch (err) {
		return err;
	}
};

const deleteButtonHandler = async (values, _id) => {
	// extract the values
	const { firstValue, currentValue, newValue } = values;
};

const renderAddField = (_id) => {
	return (
		<Field
			_id={_id}
			initialMode="add"
			value={""}
			title="title"
			key={`${_id}_add`}
			saveButtonCallback={addButtonHandler}
			closeButtonCallback={(props) => {
				const { firstValue, currentValue, newValue } = props;
				console.log("closeButtonCallback callback");
			}}
			undoButtonCallback={undoButtonHandler}
			editButtonCallback={(props) => {
				const { firstValue, currentValue, newValue } = props;
				console.log("editButtonCallback callback");
			}}
			onChangeCallback={(props) => {
				const { firstValue, currentValue, newValue } = props;
				console.log("on change callback");
			}}
		/>
	);
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
				name: "ID",
				fieldName: "_id",
				value: props._id,
				disabled: true,
			},
			{
				name: "Page Name",
				fieldName: "pageName",
				value: props.pageName,
				disabled: false,
			},
			{
				name: "Website Path",
				fieldName: "websitePath",
				value: props.websitePath,
				disabled: false,
			},
			{
				name: "Hidden",
				fieldName: "hidden",
				value: props.hidden,
				disabled: false,
			},
			{
				name: "Revision",
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
					<PageEditField
						name={field.name}
						fieldName={field.fieldName}
						value={field.value}
						key={props._id + i}
						_id={props._id}
						disabled={field.disabled}
						deletable={false}
						color={"#282C34"}
						formCallback={formCallback}
					/>
				);
			});
			setFields(fields);
		}

		// if the modal is opening load in the sources for it (for the dropdown)
		if (!open) {
			const page = await getPage(_id);
			const sources = await page.source.map((source, index) => {
				return (
					<Field
						_id={_id}
						initialMode="display"
						value={source.url}
						title="title"
						key={`${_id}_${index}`}
						saveButtonCallback={saveButtonHandler}
						closeButtonCallback={(props) => {
							const {
								firstValue,
								currentValue,
								newValue,
							} = props;

							console.log("closeButtonCallback callback");
						}}
						undoButtonCallback={undoButtonHandler}
						editButtonCallback={(props) => {
							const {
								firstValue,
								currentValue,
								newValue,
							} = props;

							console.log("editButtonCallback callback");
						}}
						deleteButtonCallback={deleteButtonHandler}
						onChangeCallback={(props) => {
							const {
								firstValue,
								currentValue,
								newValue,
							} = props;

							console.log("on change callback");
						}}
					/>
				);
			});
			sources.push(renderAddField(_id));
			setSource(sources);
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
								? source.map((field) => {
										return field;
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
