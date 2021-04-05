import React, { useState, useEffect, useMemo } from "react";
import fetchDataPromise from "../helpers/fetchDataPromise";
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

	const [searchFilter, setSearchFilter] = React.useState("");
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pageCount, setPageCount] = useState(0);
	const [count, setCount] = useState(-1);

	const columns = useMemo(
		() => [
			{
				Header: "Index",
				accessor: "i",
			},
			{
				Header: "ID",
				accessor: "_id",
			},
			{
				Header: "page Name",
				accessor: "pageName",
			},
		],
		[]
	);

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
			pageCount: pageCount, // the number of rows
		},
		usePagination
	);

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage);
	};

	// Listen for changes in pagination and use the state to fetch our new data
	useEffect(() => {
		console.log(`the searchFilter is: ${searchFilter}`);
		const effect = async () => {
			setLoading(true);

			const json = await fetchDataPromise(pageIndex, pageSize, searchFilter);
			const { count } = await (await fetch("/api/v1/watch/count", { method: "GET" })).json();

			// set the data from the APIs response
			// the data that needs to be rendered in <Table/>
			setData(json);

			// set the page count from the APIs response
			// the number of rows, IE 10, 20, 50 etc...
			setPageCount(json.length);

			// set the Count from the APIs response
			// the total number of rows within the database, IE 100+
			setCount(count);

			if (!searchFilter) {
				const pgCount = Math.ceil(parseInt(count) / pageSize);
				setPageCount(pgCount);
			} else {
				// if there is a filter (we are searching for a page) then only show page numbers for those results
				const pgCount = Math.ceil(parseInt(json.length) / pageSize);
				setPageCount(pgCount);
			}
			console.log(`the new number of pages is: ${pageCount}`);

			setLoading(false);
		};
		effect();
		// fetchData({ pageIndex, pageSize, searchFilter });
	}, [pageIndex, pageSize, searchFilter]);

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
