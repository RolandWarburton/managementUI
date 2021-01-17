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
		if (open) {
			setSource([]);
			const page = await getPage(_id);
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
								initialMode={
									pageSource.initialMode || "display"
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
									if (pageSource.initialMode == "add") {
										await sourceAddButtonHandler(
											values,
											_id,
											fieldName
										);

										// set all source dropdown fields initialMode to "display" and append a new field with initialMode "add"
										setSource([
											...source.map((s) => {
												return {
													url: s.url,
													remote: true,
													initialMode: "display",
												};
											}),
											{
												url: "",
												remote: true,
												initialMode: "add",
											},
										]);
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
												pageSource.initialMode === "add"
										)
									) {
										setSource([
											...source,
											{
												url: "",
												remote: true,
												initialMode: "add",
											},
										]);
									}

									return values.newValue;
								}}
								closeButtonCallback={notImplemented}
								undoButtonCallback={sourceUndoButtonHandler}
								editButtonCallback={notImplemented}
								deleteButtonCallback={async (
									values,
									_id,
									fieldName
								) => {
									await sourceDeleteButtonHandler(
										values,
										_id,
										fieldName
									);
									const page = await getPage(_id);
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
