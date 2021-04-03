import React from "react";
import { Field } from "formik";
import { useStyles } from "./formStyles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import websitePathSegment from "./websitePathSegment";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const MyDynamicForm = ({ move, swap, push, insert, unshift, pop, remove, form }) => {
	const classes = useStyles();
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
		</div>
	);
};

export default MyDynamicForm;
