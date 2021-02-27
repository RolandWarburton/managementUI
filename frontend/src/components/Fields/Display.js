import React from "react";
import TableCell from "@material-ui/core/TableCell";

import propTypes from "prop-types";
import exact from "prop-types-exact";
import tableCellStyles from "./TableCell.theme";

function Display(props) {
	const { currentValue, children } = props;
	const classes = tableCellStyles();
	return (
		<TableCell id={props.value} className={classes.root}>
			<span>{currentValue}</span>

			{/* Button group */}
			<div className="buttons">{children}</div>
		</TableCell>
	);
}

export default Display;

Display.propTypes = exact({
	currentValue: propTypes.string.isRequired,
	children: propTypes.arrayOf(propTypes.node),
});
