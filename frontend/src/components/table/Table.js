import React from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import TableRows from "./TableRows";

import { TablePagination, TableFooter } from "@material-ui/core";
import { useTable, usePagination } from "react-table";
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

const TableWrapper = (props) => {
	const { columns, data, fetchData, loading, controlledPageCount, count } = props;

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

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage);
	};

	// Listen for changes in pagination and use the state to fetch our new data
	React.useEffect(() => {
		console.log(`the searchFilter is: ${searchFilter}`);
		fetchData({ pageIndex, pageSize, searchFilter });
	}, [fetchData, pageIndex, pageSize, searchFilter]);

	return (
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

			<MaUTable {...getTableProps()}>
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
							rowsPerPageOptions={[1, 10, 20, 50, { label: "All", value: -1 }]}
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
		</>
	);
};

export default TableWrapper;
