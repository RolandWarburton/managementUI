import React from "react";
import Field from "../../Fields/Field";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
	modalSaveButtonCallback,
	modalUndoButtonHandler,
} from "../../fieldCallbacks/modalFieldCallbacks";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const notImplemented = () => {
	console.log("not implemented");
};

const ModalContent = (props) => {
	const { rows } = props;
	const classes = useStyles();
	return (
		<TableContainer>
			<Table className={classes.table} aria-label="simple table">
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.key}>
							{/* <TableCell component="th" scope="row">
								{row.name}
							</TableCell> */}
							<TableCell align="right">{row.prettyName}</TableCell>
							{/* <TableCell align="left"> */}
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
							{/* </TableCell> */}
							{/* <TableCell align="right">{row.value}</TableCell> */}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ModalContent;
