import { Portal } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import Wrapper from "./components/Wrapper";
import Form from "./Form";

const unloadedPage = {
	_id: "waiting",
	pageName: "waiting",
	source: [{ url: "waiting", remote: true }],
	websitePath: ["waiting"],
	__v: 0,
	meta: { template: "waiting" },
};

export default function ViewPage(props) {
	const _id = props.match.params.id;

	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(unloadedPage);
	const [initialPage, setInitialPage] = useState(unloadedPage);

	// ##──── on load ───────────────────────────────────────────────────────────────────────────
	useEffect(() => {
		// Don't do anything if the page is already set
		if (!loading) return;

		// this state is passed in through react-router-dom if the page is already in the state
		if (props.location?.state?.page) {
			setPage(props.location?.state?.page);
			setInitialPage(props.location?.state?.page);
			setLoading(false);
			return;
		}

		// If the above state didn't exist, then we need to go get the page

		// prepend the URL base if in development.
		// This fixes storybook components that need to fetch from APIs and stuff
		const urlBase = process.env.NODE_ENV ? "https://localhost.com" : "";
		const url = `${urlBase}/api/v1/watch/page?_id=${_id}`;

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setPage({ ...data[0] });
				setInitialPage({ ...data[0] });
				setLoading(false);
				console.log("done loading");
				return data;
			});
	}, [_id]);

	return (
		<>
			{loading ? (
				""
			) : (
				<Wrapper>
					<Form loading={loading} page={page} initialPage={initialPage} />
				</Wrapper>
			)}
		</>
	);
}
