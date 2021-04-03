import React from "react";
import { Formik, useFormik, useField, Field, ErrorMessage, FieldArray } from "formik";
import { Button, Container, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Form, useStyles } from "./formStyles";
import { withFormik } from "formik";

import * as Yup from "yup";
// const validationSchema = Yup.object({
// 	_id: Yup.string().required("Required"),
// });

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

const MyField = ({ field, form }) => {
	return <TextField {...field} />;
};

const handleSubmit = (values) => {
	alert(JSON.stringify(values, null, 2));
};

const MyForm = () => {
	return (
		<Formik initialValues={{ firstName: "bob" }} enableReinitialize onSubmit={handleSubmit}>
			{({ values, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<Field
						name="firstName"
						id="firstName"
						value={values.firstName}
						onChange={handleChange}
						component={MyField}
					/>

					<Button color="primary" variant="contained" type="submit">
						Submit
					</Button>
				</form>
			)}
		</Formik>
	);
};

export default function ({ page }) {
	const { _id, pageName } = page;
	return (
		<Wrapper>
			<MyForm />
		</Wrapper>
	);
}

// export default pageForm;
