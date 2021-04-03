import React from "react";
import { useStyles, Fieldset, FieldArrayWrapper } from "../formStyles";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TextField from "@material-ui/core/TextField";

const websitePathSegment = ({ field, form, label }) => {
	return <TextField label={label} {...field} />;
};

export default websitePathSegment;
