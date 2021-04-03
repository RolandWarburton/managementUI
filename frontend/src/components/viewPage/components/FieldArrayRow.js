import React from "react";
import { useStyles, Fieldset, FieldArrayWrapper } from "./formStyles";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TextField from "@material-ui/core/TextField";

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

export default FieldArrayRow;
