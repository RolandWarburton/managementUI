import React from "react";
import { Formik, Field, FieldArray } from "formik";
import { Button } from "@material-ui/core";
import { Fieldset } from "./components/formStyles";
import handleSubmit from "./helpers/handleSubmit";
import StandardField from "./components/StandardField";
import PageSourceFieldArray from "./components/PageSourceFieldArray/PageSourceFieldArray";
import PageWebsitePathFieldArray from "./components/PageWebsitePathFieldArray/pageWebsitePathFieldArray";
import propTypes from "prop-types";
import exact from "prop-types-exact";
import validationSchema from "./helpers/validation";

const MyForm = ({ page, initialPage }) => {
	return (
		<Formik
			initialValues={page}
			enableReinitialize
			onSubmit={async (values, { setSubmitting }) => {
				// gets an object of values that were updated
				const difference = await handleSubmit(values, initialPage);

				// If a field changed from the last submit. update the initialPage Values to reflect
				// This fixes a bug where if you change a fields value from original to new then back, the page will not update
				if (difference) initialPage = values;

				setSubmitting(false);
			}}
			validationSchema={validationSchema}
			validateOnChange={false}
		>
			{({ status, dirty, submitCount, values, handleChange, errors, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<Fieldset>
						<Field
							name="_id"
							label="ID"
							onChange={handleChange}
							component={StandardField}
							errors={errors?._id}
						/>

						<Field
							name="pageName"
							label="Page Name"
							onChange={handleChange}
							component={StandardField}
							errors={errors?.pageName}
						/>

						<Field
							name="__v"
							label="Version Number"
							onChange={handleChange}
							component={StandardField}
							errors={errors?.__v}
						/>

						<Field
							name="meta.template"
							label="Template"
							onChange={handleChange}
							component={StandardField}
							errors={errors?.meta?.template}
						/>

						<FieldArray name="websitePath" component={PageWebsitePathFieldArray} />
					</Fieldset>
					<Fieldset>
						<FieldArray name="source" component={PageSourceFieldArray} />
					</Fieldset>
					<Fieldset>
						<Button variant="contained" type="submit">
							Submit
						</Button>
					</Fieldset>
				</form>
			)}
		</Formik>
	);
};

const Form = ({ page, initialPage }) => {
	return <MyForm page={page} initialPage={initialPage} />;
};
export default Form;

Form.propTypes = exact({
	page: propTypes.shape({
		_id: propTypes.string.isRequired,
		pageName: propTypes.string.isRequired,
		source: propTypes.array.isRequired,
		websitePath: propTypes.array.isRequired,
		__v: propTypes.number.isRequired,
	}).isRequired,
	initialPage: propTypes.object,
});
