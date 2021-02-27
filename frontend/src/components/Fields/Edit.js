import React, { Children } from "react";
import TableCell from "@material-ui/core/TableCell";
import tableCellStyles from "./TableCell.theme";
import TextField from "@material-ui/core/TextField";
import propTypes from "prop-types";
import exact from "prop-types-exact";

function Edit(props) {
	const { currentValue, disabled, onChangeCallback, children } = props;
	const classes = tableCellStyles();

	return (
		<TableCell id={props.value} className={classes.root}>
			{/* Input box */}
			<TextField
				id="standard-basic"
				// label="Standard"
				defaultValue={currentValue}
				fullWidth={true}
				onChange={(e) => {
					onChangeCallback(e.target.value);
				}}
			/>

			{/* Button group */}
			<div className="buttons">{children}</div>
		</TableCell>
	);
}

export default Edit;

Edit.propTypes = exact({
	currentValue: propTypes.string.isRequired,
	disabled: propTypes.bool.isRequired,
	onChangeCallback: propTypes.func.isRequired,
	children: propTypes.arrayOf(propTypes.node),
});
