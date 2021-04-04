import React from "react";
import { Field } from "formik";
import { Error } from "../formStyles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import websitePathSegment from "./websitePathSegment";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// { move, swap, push, insert, unshift, pop, remove, form }
export const MyDynamicForm = ({ push, remove, form }) => {
	return (
		<div>
			{form.values.websitePath.map((s, i) => {
				return (
					<Field
						key={i}
						name={`websitePath[${i}]`}
						label={`Web Path ${i}`}
						value={s}
						onChange={form.handleChange}
						component={websitePathSegment}
						handleDeleteButton={(e) => {
							remove(i);
						}}
					/>
				);
			})}
			<IconButton
				aria-label="delete"
				onClick={() => {
					remove(form.values.websitePath.length - 1);
				}}
			>
				<ArrowBackIcon />
			</IconButton>
			<IconButton aria-label="delete" onClick={() => push("")}>
				<AddBoxIcon />
			</IconButton>
			<div>
				{form.errors.websitePath &&
					form.errors.websitePath.map((error, i) => {
						return <Error key={i}>{error}</Error>;
					})}
			</div>
		</div>
	);
};

export default MyDynamicForm;
