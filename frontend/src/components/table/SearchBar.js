import React, { useState } from "react";
import Styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
				onSubmit={search}
				onChange={(e) => {
					setQueryString(e.currentTarget.value);
				}}
			></input>
			<button className="button is-dark" onClick={search}>
				<FontAwesomeIcon className="has-text-right icon" icon={faSearch} color={"white"} />
			</button>
		</Styles>
	);
}
