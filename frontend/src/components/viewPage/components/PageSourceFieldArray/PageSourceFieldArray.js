import React from "react";
import { Field } from "formik";
import { Button } from "@material-ui/core";
import { useStyles, Error } from "../formStyles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FieldArrayRow from "./FieldArrayRow";

export const MyDynamicForm = ({ move, swap, push, insert, unshift, pop, remove, form }) => {
	const classes = useStyles();
	return (
		<div>
			{form.values.source.map((s, i) => {
				return (
					<Field
						key={i}
						name={`source[${i}].url`}
						label={`URL ${i}`}
						value={s.url}
						onChange={form.handleChange}
						component={FieldArrayRow}
						handleDeleteButton={(e) => {
							remove(i);
						}}
					/>
				);
			})}

			<div>
				{form.errors.source &&
					form.errors.source.map((error, i) => {
						return <Error key={i}>{error.url}</Error>;
					})}
			</div>

			<div className={classes.button}>
				<Button
					variant="contained"
					endIcon={<AddBoxIcon />}
					onClick={() => push({ url: "", remote: true })}
				>
					Add source
				</Button>
			</div>
		</div>
	);
};

export default MyDynamicForm;
