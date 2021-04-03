import React from "react";
import TextField from "@material-ui/core/TextField";
import { FieldWrapper } from "./formStyles";

const StandardField = ({ field, form, label, errors }) => {
	const hasErrors = errors ? true : false;

	return (
		<FieldWrapper>
			<TextField label={label} fullWidth {...field} error={hasErrors} helperText={errors} />
		</FieldWrapper>
	);
};

export default StandardField;
