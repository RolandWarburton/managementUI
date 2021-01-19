import React, { useEffect, useState } from "react";
import Dropdown from "../dropdowns/Dropdown";
import { Button, Modal } from "@material-ui/core";
import "../../styles/styles.scss";
import Edit from "../Fields/Edit";
import ModalWrapper from "./ModalWrapper";
import {
	sourceSaveButtonHandler,
	sourceUndoButtonHandler,
	sourceAddButtonHandler,
	sourceDeleteButtonHandler,
} from "../fieldCallbacks/sourceDropdownCallbacks";

import {
	modalSaveButtonCallback,
	modalUndoButtonHandler,
} from "../fieldCallbacks/modalFieldCallbacks";

import PageEditField from "../pageEditField/PageEditField";
import Field from "../Fields/Field";

const notImplemented = (functionName) => {
	return functionName + " function not implemented";
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

const SourceFields = (props) => {
	const { open, _id } = props;

	const [source, setSource] = useState([]);

	async function handleModal() {
		// if the modal is opening load in the sources for it (for the dropdown)
		try {
			const page = await getPage(_id);
			if (open && page) {
				setSource(page.source);

				// append an extra "add" field
				setSource([
					...page.source,
					{
						url: "",
						remote: true,
						initialMode: "add",
					},
				]);
			}
		} catch (err) {
			setSource([]);
		}
	}

	// when the modal is opened refresh the field data
	useEffect(() => {
		handleModal();
	}, [open]);

	return (
		<>
			{open && source.length > 0
				? source.map((pageSource, index) => {
						return (
							<Field
								_id={_id}
								initialMode={pageSource.initialMode || "display"}
								value={pageSource.url}
								title="title"
								fieldName={"source"}
								disabled={false}
								key={`${_id}_${index}`}
								saveButtonCallback={async (values, _id, fieldName) => {
									try {
										if (pageSource.initialMode == "add") {
											await sourceAddButtonHandler(values, _id, fieldName);
										} else {
											await sourceSaveButtonHandler(values, _id, fieldName);
										}
									} catch (err) {
										// if the response is not 200 then an error will be returned from these handlers
										return err;
									}

									// then refresh the modal
									handleModal();

									// and return the new value because no errors were thrown
									return values.newValue;
								}}
								closeButtonCallback={notImplemented}
								undoButtonCallback={sourceUndoButtonHandler}
								editButtonCallback={notImplemented}
								deleteButtonCallback={async (values, _id, fieldName) => {
									try {
										await sourceDeleteButtonHandler(values, _id, fieldName);
									} catch (err) {
										return err;
									}

									// then refresh the modal
									handleModal();
								}}
								onChangeCallback={notImplemented}
							/>
						);
				  })
				: "loading"}
		</>
	);
};

export default SourceFields;
