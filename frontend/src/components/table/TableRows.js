import React, { useRef } from "react";
// import styled from "styled-components";
import { useTable, usePagination } from "react-table";
import styled from "styled-components";
import Modal from "./modal/Modal";
import SearchBar from "./SearchBar";
import { Button } from "@material-ui/core";
import BuildButton from "./BuildButton";
import { makeStyles } from "@material-ui/core/styles";

// MUI crap
import { TablePagination, TableFooter } from "@material-ui/core";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableRowColumn from "@material-ui/core/TableRow";

const Loading = styled.tr`
	grid-column: 1 / -1;
	progress {
		width: 100%;
		background: #363636;
	}
`;

const tableStyles = makeStyles({
	root: {
		display: "grid",
		gridTemplateColumns: "0.5fr 1fr 2fr 10% 10%",
	},
});

const Table = (props) => {
	const classes = tableStyles();
	const { page, loading, prepareRow } = props;

	// Render the UI for your table
	return (
		<>
			{page.map((row, i) => {
				prepareRow(row);
				return (
					<TableRow {...row.getRowProps()} className={classes.root}>
						{row.cells.map((cell, i) => {
							// store the return value
							let output;

							// figure out if we are displaying buttons or content
							switch (cell.column.Header) {
								// ##──── Edit Column ───────────────────────────────────────────────────────────────────────
								case "Edit":
									output = (
										<TableCell {...cell.getCellProps()}>
											<Modal
												{...cell.row.original}
												cellID={cell.row.id} // cells ID (1,2,3...)
											/>
										</TableCell>
									);
									break;

								// ##──── Rebuild Column ────────────────────────────────────────────────────────────────────
								case "Build":
									output = (
										<TableCell {...cell.getCellProps()}>
											<BuildButton
												// cell props
												key={cell.row.id}
												_id={cell.row.original._id}
											>
												Build
											</BuildButton>
										</TableCell>
									);
									break;

								// ##──── Index Column ──────────────────────────────────────────────────────────────────────
								case "Index":
									output = (
										<TableCell {...cell.getCellProps()}>
											<span
												style={{
													color: "white",
												}}
											>
												{cell.row.index}
											</span>
										</TableCell>
									);
									break;

								// ##──── Whatever data is in the cell ──────────────────────────────────────────────────────
								default:
									output = (
										<TableCell {...cell.getCellProps()}>
											{cell.render("Cell")}
										</TableCell>
									);
									break;
							}
							return output;
						})}
					</TableRow>
				);
			})}
			<Loading>{loading && <td></td>}</Loading>
		</>
	);
};
export default Table;
