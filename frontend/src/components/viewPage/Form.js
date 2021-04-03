import React from "react";
import { Formik, useFormik, useField, Field, ErrorMessage, FieldArray } from "formik";
import { Button, Container, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Form, useStyles } from "./formStyles";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { makeStyles } from "@material-ui/core/styles";
import { withFormik } from "formik";

import * as Yup from "yup";
// const validationSchema = Yup.object({
// 	_id: Yup.string().required("Required"),
// });

const FieldArrayWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
`;

const Fieldset = styled.fieldset`
	border: none;
	margin: 1em 0;
`;

const Wrapper = ({ children }) => {
	const classes = useStyles();
	return (
		<Container className={classes.root} maxWidth="lg">
			<Paper elevation={3} elementtype="section">
				{children}
			</Paper>
		</Container>
	);
};

const handleChange = ({ field, form }) => {
	form.values.firstName = "aaa";
};

const MyField = ({ field, form, label }) => {
	return (
		// <div>
		<TextField label={label} fullWidth {...field} />
		// </div>
	);
};

const handleSubmit = (values) => {
	alert(JSON.stringify(values, null, 2));
};

const FieldArrayRow = ({ field, form, label, handleDeleteButton }) => {
	return (
		<FieldArrayWrapper>
			<TextField label={label} fullWidth {...field} />
			<IconButton aria-label="delete" onClick={handleDeleteButton}>
				<DeleteOutlineIcon />
			</IconButton>
		</FieldArrayWrapper>
	);
};

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
			<div className={classes.button}>
				<Button
					variant="contained"
					color="primary"
					endIcon={<AddBoxIcon />}
					onClick={() => push({ url: "", remote: true })}
				>
					Add source
				</Button>
			</div>
		</div>
	);
};

const MyForm = ({ page }) => {
	return (
		<Formik initialValues={page} enableReinitialize onSubmit={handleSubmit}>
			{({ values, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<Fieldset>
						<Field
							name="_id"
							label="ID"
							value={values.firstName}
							onChange={handleChange}
							component={MyField}
						/>
					</Fieldset>

					<Fieldset>
						<FieldArray name="source" component={MyDynamicForm} />
					</Fieldset>

					<Button color="primary" variant="contained" type="submit">
						Submit
					</Button>
				</form>
			)}
		</Formik>
	);
};

export default function ({ page }) {
	const { _id, pageName, source } = page;
	return (
		<Wrapper>
			<MyForm page={page} />
		</Wrapper>
	);
}

// export default pageForm;
