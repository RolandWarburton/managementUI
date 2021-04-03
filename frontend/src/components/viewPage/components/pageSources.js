import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
`;

const sourcesRenderer = (values, arrayHelpers) => {
	const { push, swap, move, insert, unshift, remove, pop, replace } = arrayHelpers;
	return (
		<div>
			{values.source &&
				values.source.length > 0 &&
				values.source.map((s, i) => (
					<Wrapper key={i}>
						<TextField
							fullWidth
							label="URL"
							type="text"
							value={s.url}
							// variant="outlined"
						/>

						<IconButton aria-label="delete" onClick={() => arrayHelpers.remove(i)}>
							<DeleteIcon />
						</IconButton>

						{/* <button
							type="button"
							onClick={() => arrayHelpers.insert(i, "")} // insert an empty string at a position
						>
							+
						</button> */}
					</Wrapper>
				))}

			<Wrapper>
				<div>Add a new field</div>
				<IconButton
					aria-label="delete"
					onClick={() =>
						arrayHelpers.insert(values.source.length, { url: "", remote: true })
					}
				>
					<AddBoxIcon />
				</IconButton>
			</Wrapper>

			<div>
				<button type="submit">Submit</button>
			</div>
		</div>
	);
};

export { sourcesRenderer };
