import React from "react";
// import { Formik, useFormik, useField, Field, ErrorMessage, FieldArray } from "formik";
import { Formik, Field, FieldArray } from "formik";
import { Button } from "@material-ui/core";
import { Fieldset } from "./components/formStyles";
import Wrapper from "./components/Wrapper";
import handleSubmit from "./helpers/handleSubmit";
import StandardField from "./components/StandardField";
import PageSourceFieldArray from "./components/PageSourceFieldArray";
import PageWebsitePathFieldArray from "./components/pageWebsitePathFieldArray";
import propTypes from "prop-types";
import exact from "prop-types-exact";

const MyForm = ({ page }) => {
	return (
		<Formik initialValues={page} enableReinitialize onSubmit={handleSubmit}>
			{({ values, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<Fieldset>
						<Field
							name="_id"
							label="ID"
							onChange={handleChange}
							component={StandardField}
						/>

						<Field
							name="pageName"
							label="Page Name"
							onChange={handleChange}
							component={StandardField}
						/>

						<Field
							name="__v"
							label="Version Number"
							onChange={handleChange}
							component={StandardField}
						/>

						<Field
							name="meta.template"
							label="Template"
							onChange={handleChange}
							component={StandardField}
						/>

						<FieldArray name="websitePath" component={PageWebsitePathFieldArray} />
					</Fieldset>

					<Fieldset>
						<FieldArray name="source" component={PageSourceFieldArray} />
					</Fieldset>

					<Fieldset>
						<Button color="primary" variant="contained" type="submit">
							Submit
						</Button>
					</Fieldset>
				</form>
			)}
		</Formik>
	);
};

const Form = ({ page }) => {
	return (
		<Wrapper>
			<MyForm page={page} />
		</Wrapper>
	);
};
export default Form;

// export default pageForm;

Form.propTypes = exact({
	// page: propTypes.object.isRequired,
	page: propTypes.shape({
		_id: propTypes.string.isRequired,
		pageName: propTypes.string.isRequired,
		source: propTypes.array.isRequired,
		websitePath: propTypes.array.isRequired,
		__v: propTypes.number.isRequired,
	}).isRequired,
});
