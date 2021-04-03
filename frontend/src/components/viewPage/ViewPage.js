import React, { useState, useEffect } from "react";
import Form from "./Form";

export default function ViewPage(props) {
	const _id = props.match.params.id;

	const [page, setPage] = useState({
		_id: "waiting",
		pageName: "waiting",
		source: [{ url: "waiting", remote: true }],
	});
	const [loading, setLoading] = useState(true);

	// ##──── on load ───────────────────────────────────────────────────────────────────────────
	useEffect(() => {
		// prepend the URL base if in development.
		// This fixes storybook components that need to fetch from APIs and stuff
		const urlBase = process.env.NODE_ENV ? "https://localhost.com" : "";
		const url = `${urlBase}/api/v1/watch/page?_id=${_id}`;

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);
				setPage({ ...page, ...data[0] });
				return data;
			});
	}, [_id]);

	return (
		<div>
			<Form page={page} />
		</div>
	);
}
