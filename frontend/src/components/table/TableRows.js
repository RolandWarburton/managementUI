import React from "react";
import styled from "styled-components";
import { tableStyles } from "./tableStyles";
import { useHistory } from "react-router-dom";

// MUI stuff
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

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

const Table = (props) => {
	const classes = tableStyles();
	const history = useHistory();

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
					<TableRow
						{...row.getRowProps()}
						className={classes.tableRowCursor}
						// className={(classes.table, classes.tableRowCursor)}
						onClick={(e) =>
							history.push(`/page/${row.original._id}`, { page: row.original })
						}
					>
						{row.cells.map((cell, i) => {
							// store the return value
							let output;

							// figure out if we are displaying buttons or content
							switch (cell.column.Header) {
								// ##──── Index Column ──────────────────────────────────────────────────────────────────────
								case "Index":
									output = (
										<TableCell
											{...cell.getCellProps()}
											// className={classes.table.cell}
											size="small"
										>
											{cell.row.index}
										</TableCell>
									);
									break;

								// ##──── Whatever data is in the cell ──────────────────────────────────────────────────────
								default:
									output = (
										<TableCell
											{...cell.getCellProps()}
											// className={classes.table}
											size="small"
										>
											{cell.render("Cell")}
										</TableCell>
									);
									break;
							}
							return output;
						})}
					</TableRow>
					// </Link>
				);
			})}
			<Loading>{loading && <td></td>}</Loading>
		</>
	);
};
export default Table;
