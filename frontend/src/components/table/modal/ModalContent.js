import React from "react";
import Field from "../../Fields/Field";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Dropdown from "../../dropdowns/Dropdown";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "../../Fields/fieldButtons/Button";
import {
	modalSaveButtonCallback,
	modalUndoButtonHandler,
} from "../../fieldCallbacks/modalFieldCallbacks";
import {
	sourceSaveCallback,
	sourceUndoCallback,
	sourceAddCallback,
	sourceDeleteCallback,
} from "../../fieldCallbacks/sourceDropdownCallbacks";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const fetchPage = async (_id) => {
	const url = `/api/v1/watch/page?_id=${_id}`;
	const options = {
		method: "GET",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	};
	const response = await fetch(url, options);
	if (response.status !== 200) {
		throw new Error(`Response was not 200 ${response.status}`);
	}
	const json = await response.json();
	return await json;
};

const formatData = (page) => {
	return [
		{ key: "_id", value: page._id, prettyName: "Page ID" },
		{ key: "pageName", value: page.pageName, prettyName: "Page Name" },
		{ key: "websitePath", value: page.websitePath, prettyName: "Website Path" },
		{ key: "__v", value: page.__v, prettyName: "Version" },
		{ key: "meta.template", value: page.meta.template, prettyName: "Template" },
	];
};

const notImplemented = () => {
	console.log("not implemented");
};

const ModalContent = (props) => {
	const [rows, setRows] = React.useState([]);
	const [source, setSource] = React.useState([]);

	const formatSourceData = (source) => {
		return source.map((s) => {
			return {
				key: s.url,
				url: s.url,
				initialMode: "display",
				saveMethod: handleSourceSave,
			};
		});
	};

	const handleUpdateRows = async () => {
		// refresh the page
		const page = await fetchPage(props._id);

		// set the top level page data
		setRows(formatData(page));

		// set the source data
		const source = await page.source;
		setSource(formatSourceData(source));
	};

	// this wraps the sourceAddCallback to ensure that modal data is refreshed after a field is added
	// the callback will return the result to <Field /> and then refreshes the entire modals data
	const handleSourceAdd = async (value, _id, name) => {
		const result = await sourceAddCallback(value, _id, name);
		handleUpdateRows(); // dont await this - it causes errors where you "Can't perform a React state update on an unmounted component"

		// change the source.url on the newly added field to reflect the new changes we are making
		if (!result instanceof Error) {
			const tempSource = source;
			const addFieldIndex = source.findIndex((s) => s.url === value.newValue);
			if (addFieldIndex !== -1) {
				console.log(`Updating the source`);
				tempSource[addFieldIndex].url = value.newValue;
				setSource([...tempSource]);
			}
		}

		return result;
	};

	// this wraps the sourceDeleteCallback to ensure that modal data is refreshed after a field is added
	// the callback will return the result to <Field /> and then refreshes the entire modals data
	const handleSourceDelete = async (values, _id, name) => {
		const result = await sourceDeleteCallback(values, _id, name);
		handleUpdateRows(); // dont await this - it causes errors where you "Can't perform a React state update on an unmounted component"
		return result;
	};

	const handleSourceSave = async (values, _id, name) => {
		const result = await sourceSaveCallback(values, _id, name);
		handleUpdateRows(); // dont await this - it causes errors where you "Can't perform a React state update on an unmounted component"
		return result;
	};

	// when the modal loads
	React.useEffect(() => {
		handleUpdateRows();
	}, []);

	const classes = useStyles();
	return (
		<>
			<TableContainer>
				<Table className={classes.table} aria-label="simple table">
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.key}>
								<TableCell align="right">{row.prettyName}</TableCell>
								<Field
									_id={props._id}
									initialMode={"display"}
									value={row.value.toString()}
									fieldName={row.key} // the key to update in the database. EG. _id or pageName
									disabled={false}
									saveButtonCallback={modalSaveButtonCallback}
									closeButtonCallback={notImplemented}
									undoButtonCallback={modalUndoButtonHandler}
									editButtonCallback={notImplemented}
									deleteButtonCallback={notImplemented}
									onChangeCallback={notImplemented}
								/>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Dropdown title="Sources" loading={props.loading}>
				<TableContainer>
					<Table className={classes.table} aria-label="simple table">
						<TableBody>
							{source.map((row) => (
								<TableRow key={row.key || row.url}>
									<Field
										_id={props._id}
										initialMode={row.initialMode || "display"} // new fields come in "edit" mode, otherwise use "display" mode
										value={row.url.toString()}
										fieldName={"source.url"} // the key to update in the database. EG. _id or pageName
										disabled={false}
										saveButtonCallback={row.saveMethod || handleSourceSave} // assume field already exists if the saveMethod is not given
										closeButtonCallback={notImplemented}
										undoButtonCallback={sourceUndoCallback}
										editButtonCallback={notImplemented}
										deleteButtonCallback={handleSourceDelete}
										onChangeCallback={notImplemented}
									/>
								</TableRow>
							))}
							<TableRow key={props._id + "addButton"}>
								<TableCell id={props.value}>
									<Button
										disabled={false}
										callback={() => {
											// only add a new field IF there is no empty fields
											const sourceHasEmptyUrl = source.find((s) => {
												return s.url == "";
											});
											if (!sourceHasEmptyUrl) {
												setSource([
													...source,
													{
														url: "",
														initialMode: "edit",
														saveMethod: handleSourceAdd,
													},
												]);
											}
										}}
									>
										<AddBoxIcon />
									</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Dropdown>
		</>
	);
};

export default ModalContent;
