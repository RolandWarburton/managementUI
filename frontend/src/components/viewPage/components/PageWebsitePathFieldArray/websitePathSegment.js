import React from "react";
import TextField from "@material-ui/core/TextField";

const websitePathSegment = ({ field, label }) => {
	return <TextField label={label} {...field} />;
};

export default websitePathSegment;
