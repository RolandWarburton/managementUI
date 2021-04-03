import React, { useState, useEffect, getIn } from "react";
import { useFormikContext, FieldArray, Field, FastField, useField } from "formik";
import { Button } from "@material-ui/core";
// import { TextField } from "formik-material-ui";
import { sourceRowStyles } from "../formikComponents/MUIStyles";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TextField from "@material-ui/core/TextField";

function SourcesSection() {
	// ? include handleSubmit if you want to submit from this component instead of including it in the overall form
	// ? const { handleSubmit, values } = useFormikContext(); // formikProps
	const { values, errors } = useFormikContext(); // formikProps
	const classes = sourceRowStyles();

	useEffect(() => {
		console.log("updated");
	}, [values.source]);

	const handleButton = (e, arrayHelpers, index) => {
		e.preventDefault();
		console.log("adding");
		arrayHelpers.remove(index);
	};

	return (
		<FieldArray
			name="source"
			render={(arrayHelpers) => (
				<div className={classes.root}>
					{values.source &&
						values.source.length > 0 &&
						values.source.map((source, index) => (
							<div key={index}>
								<TextField
									id={`source${index}`}
									name="`source${index}`"
									label={`url ${index}`}
									value={`${values.source[index]}`}
								/>
								<IconButton
									aria-label="delete"
									onClick={(e) => {
										handleButton(e, arrayHelpers, index);
									}}
								>
									<DeleteOutlineIcon />
								</IconButton>
							</div>
						))}

					<Button
						variant="contained"
						color="primary"
						size="small"
						type="button"
						onClick={() => arrayHelpers.push("")}
					>
						Add source
					</Button>
				</div>
			)}
		/>
	);
}
export default SourcesSection;
