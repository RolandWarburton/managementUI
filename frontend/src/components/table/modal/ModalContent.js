import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const ModalContent = (props) => {
	const { rows } = props;
	const classes = useStyles();
	return (
		<TableContainer>
			<Table className={classes.table} aria-label="simple table">
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
							{/* <TableCell component="th" scope="row">
								{row.name}
							</TableCell> */}
							<TableCell align="right">{row.key}</TableCell>
							<TableCell align="right">{row.value}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ModalContent;
