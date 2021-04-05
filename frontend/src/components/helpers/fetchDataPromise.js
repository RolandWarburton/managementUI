const fetchDataPromise = async (pageIndex, pageSize, searchFilter) => {
	const pagination = `page=${pageIndex || 0}&per_page=${pageSize || 1}`;

	let url = `/api/v1/watch/page?pageName=${searchFilter}&${pagination}`;

	console.log(`fetching items ${url}`);
	const response = await fetch(url, { method: "get" });
	if (response.status !== 200) console.log(response);
	const json = await response.json();
	return json;
};

export default fetchDataPromise;
