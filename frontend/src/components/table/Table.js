import React from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import TableRows from "./TableRows";
import { tableStyles } from "./tableStyles";
import Wrapper from "../viewPage/components/Wrapper";

import { TablePagination, TableFooter } from "@material-ui/core";
import { useTable, usePagination } from "react-table";
import MaUTable from "@material-ui/core/Table";
import { TableHead, TableCell, TableRow, TableBody } from "@material-ui/core";

const Loading = styled.tr`
	grid-column: 1 / -1;
	progress {
		width: 100%;
		background: #363636;
	}
`;

const TableWrapper = (props) => {
	const classes = tableStyles();
	const { columns, data, fetchData, loading, controlledPageCount, count } = props;

	// ? TableJS Props:
	// getTableProps, getTableBodyProps, gotoPage, page, canPreviousPage, canNextPage, pageOptions,
	// pageCount, nextPage, previousPage, setPageSize, prepareRow, state: { pageIndex, pageSize },

	const {
		getTableProps,
		getTableBodyProps,
		gotoPage,
		page,
		setPageSize,
		prepareRow,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 15 }, // Pass our hoisted table state
			manualPagination: true,
			pageCount: controlledPageCount, // the number of rows
		},
		usePagination
	);

	console.log(pageSize);

	const [searchFilter, setSearchFilter] = React.useState("");

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage);
	};

	// Listen for changes in pagination and use the state to fetch our new data
	React.useEffect(() => {
		console.log(`the searchFilter is: ${searchFilter}`);
		fetchData({ pageIndex, pageSize, searchFilter, setPageSize });
	}, [fetchData, pageIndex, pageSize, searchFilter]);

	return (
		<Wrapper>
			<SearchBar
				formCallback={(queryString) => {
					// Set the search filter, this is what we will use in the url to search for
					// Right now the only thing thats supported is searching by page name
					setSearchFilter(queryString);

					// set the current page number back to the first page
					gotoPage(0);
				}}
			/>

			<MaUTable {...getTableProps()}>
				<TableHead>
					<TableRow className={classes.table}>
						<TableCell size="small" align="left">
							Index
						</TableCell>
						<TableCell size="small" align="left">
							ID
						</TableCell>
						<TableCell size="small" align="left">
							Name
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody {...getTableBodyProps()}>
					{/* table guts are rendered here */}
					<TableRows page={page} loading={loading} prepareRow={prepareRow}></TableRows>
					<Loading>{loading && <td></td>}</Loading>
				</TableBody>
				{/* Table Footer */}
				<TableFooter>
					<TableRow>
						{/* https://material-ui.com/api/table-pagination/#tablepagination-api */}
						<TablePagination
							className="pagination"
							rowsPerPageOptions={[1, 10, 15, 20, 50, { label: "All", value: -1 }]}
							count={count} // The total number of rows.
							page={pageIndex} // The zero-based index of the current page.
							rowsPerPage={pageSize}
							SelectProps={{
								inputProps: { "aria-label": "rows per page" },
								native: true,
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={(e) => {
								setPageSize(Number(e.target.value));
							}}
						></TablePagination>
					</TableRow>
				</TableFooter>
			</MaUTable>
		</Wrapper>
	);
};

export default TableWrapper;
