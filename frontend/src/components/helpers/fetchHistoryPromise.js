export default async (_id) => {
	const url = `/api/v1/watch/history/find/${_id}`;

	console.log(`fetching items: "${url}"`);
	return fetch(url, { method: "get" });
};
