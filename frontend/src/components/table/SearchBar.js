import React, { useState } from "react";
import Styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import SearchButton from "@material-ui/icons/SearchRounded";

const Styles = Styled.form`
	padding: 0;
	padding: 1em 0;

	display: grid;
	grid-template-columns: 1fr 10px auto;

	input {
		grid-column: 1;
		background-color: #363636;
		border: none;
	}

	button {
		grid-column: 3;
	}
`;

export default function SearchBar(props) {
	const [queryString, setQueryString] = useState("");
	const search = (event) => {
		event.preventDefault();
		props.formCallback(queryString);
	};

	return (
		<Styles>
			<input
				className="input"
				placeholder="Search"
				defaultValue=""
				style={{ color: "white", padding: "0 1em" }}
				onChange={(e) => {
					setQueryString(e.currentTarget.value);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						search(e);
					}
				}}
			/>
			<IconButton aria-label="delete" onClick={search}>
				<SearchButton />
			</IconButton>
		</Styles>
	);
}
