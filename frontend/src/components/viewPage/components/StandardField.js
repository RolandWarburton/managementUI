import React from "react";
import TextField from "@material-ui/core/TextField";
import { FieldWrapper } from "./formStyles";

const StandardField = ({ field, form, label }) => {
	return (
		<FieldWrapper>
			<TextField label={label} fullWidth {...field} />
		</FieldWrapper>
	);
};

export default StandardField;
