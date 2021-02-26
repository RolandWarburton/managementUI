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

// used for the fullscreen media query
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const Loading = styled.tr`
	grid-column: 1 / -1;
	progress {
		width: 100%;
		background: #363636;
	}
`;

const tableStyles = makeStyles({
	root: {
		// display: "grid",
		// gridTemplateColumns: "0.5fr 1fr 2fr 10% 10%",
	},
});

const Table = (props) => {
	const classes = tableStyles();

	// when bp small or below fullScreen is true
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
												fullScreen={fullScreen}
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
												fullScreen={fullScreen}
												{...cell.row.original}
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
											{cell.row.index}
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
