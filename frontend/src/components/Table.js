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
		// gridTemplateColumns: "50% 50%",
		// [theme.breakpoints.up("md")]: {
		// 	maxWidth: "80vw",
		// },
		// [theme.breakpoints.up("lg")]: {
		// 	maxWidth: "50vw",
		// },
	},
});

const Table = ({ columns, data, fetchData, loading, controlledPageCount, count }) => {
	const classes = tableStyles();

	const {
		getTableProps,
		getTableBodyProps,
		gotoPage,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		nextPage,
		previousPage,
		setPageSize,
		prepareRow,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 }, // Pass our hoisted table state
			manualPagination: true,
			pageCount: controlledPageCount, // the number of rows
		},
		usePagination
	);

	const [searchFilter, setSearchFilter] = React.useState("");
	// const [pageCount, setPageCount] = React.useState("");

	console.log({ controlledPageCount });

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage);
	};

	// Listen for changes in pagination and use the state to fetch our new data
	React.useEffect(() => {
		console.log(`the searchFilter is: ${searchFilter}`);
		fetchData({ pageIndex, pageSize, searchFilter });
	}, [fetchData, pageIndex, pageSize, searchFilter]);

	// Render the UI for your table
	return (
		// <Styles>
		<>
			<SearchBar
				formCallback={(queryString, tag) => {
					if (!tag) {
						setSearchFilter(`pageName/${queryString || "placeholder"}`);
					} else {
						setSearchFilter(`${tag.key}/${tag.value}`);
					}

					if (!queryString) {
						setSearchFilter(``);
					}

					// set the current page number back to the first page
					gotoPage(0);
				}}
			/>
			{/* style={{ width: "auto", tableLayout: "auto" }} */}
			<MaUTable {...getTableProps()}>
				<TableBody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							// style={{ width: "80%" }}
							<TableRow {...row.getRowProps()} className={classes.root}>
								{row.cells.map((cell, i) => {
									// console.log(cell);

									// store the return value
									let output;

									// figure out if we are displaying buttons or content
									switch (cell.column.Header) {
										// Return the edit button
										case "Edit":
											output = (
												<TableCell {...cell.getCellProps()}>
													<Modal
														{...cell.row.original}
														// cells ID (1,2,3...)
														cellID={cell.row.id}
													/>
												</TableCell>
											);
											break;

										// Return the rebuild button
										case "Build":
											output = (
												<TableCell {...cell.getCellProps()}>
													<BuildButton
														// disabled={isSubmitting}
														// cell props
														key={cell.row.id}
														_id={cell.row.original._id}
													>
														Build
													</BuildButton>
												</TableCell>
											);
											break;

										// the number column
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

										// Return the cells data
										default:
											output = (
												<TableCell {...cell.getCellProps()}>
													{/* <span
														style={{
															color: "white",
														}}
													> */}
													{cell.render("Cell")}
													{/* </span> */}
												</TableCell>
											);
											break;
									}
									return output;
								})}
							</TableRow>
						);
					})}
					<Loading>
						{loading && (
							// Use our custom loading state to show a loading indicator
							// <td>
							// 	<progress className="progress is-medium is-dark" max="100">
							// 		45%
							// 	</progress>
							// </td>
							<td></td>
						)}
					</Loading>
				</TableBody>
				<TableFooter>
					<TableRow>
						{/* https://material-ui.com/api/table-pagination/#tablepagination-api */}
						<TablePagination
							className="pagination"
							rowsPerPageOptions={[1, 10, 20, 50, { label: "All", value: -1 }]}
							// The total number of rows.
							count={count}
							// The zero-based index of the current page.
							page={pageIndex}
							rowsPerPage={pageSize}
							SelectProps={{
								inputProps: { "aria-label": "rows per page" },
								native: true,
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={(e) => {
								// setRowsPerPage(Number(e.target.value));
								// console.log(Number(e.target.value));
								setPageSize(Number(e.target.value));
							}}
							// ActionsComponent={TablePaginationActions}
						></TablePagination>
					</TableRow>
				</TableFooter>
			</MaUTable>
		</>
		// </Styles>
	);
};
export default Table;
