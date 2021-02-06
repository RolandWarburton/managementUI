import fetchDataPromise from "./helpers/fetchDataPromise";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { Paper } from "@material-ui/core";
import SearchBar from "./SearchBar";

import Table from "./Table";

export default function Pages() {
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
			{
				Header: "Edit",
				accessor: "",
			},
			{
				Header: "Build",
				accessor: "",
			},
		],
		[]
	);

	// This will get called when the table needs new data
	const fetchData = React.useCallback(async ({ pageSize, pageIndex, searchFilter }) => {
		setLoading(true);

		const json = await fetchDataPromise(pageIndex, pageSize, searchFilter);

		// set the data from the APIs response
		// the data that needs to be rendered in <Table/>
		setData(json.data);

		// set the page count from the APIs response
		// the number of rows, IE 10, 20, 50 etc...
		setPageCount(json.length);

		// set the Count from the APIs response
		// the total number of rows within the database, IE 100+
		setCount(json.count);

		if (!searchFilter) {
			const pgCount = Math.ceil(parseInt(json.count) / pageSize);
			setPageCount(pgCount);
			console.log(`the new number of pages is: ${pgCount}`);
		} else {
			// if there is a filter (we are searching for a page) then only show page numbers for those results
			const pgCount = Math.ceil(parseInt(json.length) / pageSize);
			setPageCount(pgCount);
			console.log(`the new number of pages is: ${pgCount}`);
		}

		setLoading(false);
	}, []);

	return (
		// <Paper>
		<Table
			columns={columns}
			data={data}
			fetchData={fetchData}
			loading={loading}
			controlledPageCount={pageCount} // the number of rows, IE 10, 20, 50 etc...
			count={count} // the total number of rows within the database, IE 100+
		/>
		// </Paper>
	);
}
