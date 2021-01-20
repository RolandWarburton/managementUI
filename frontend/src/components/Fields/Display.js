import React from "react";
import { Container } from "./Field.style";

import propTypes from "prop-types";
import exact from "prop-types-exact";

function Display(props) {
	const { currentValue, children } = props;
	return (
		<Container id={props.value} color={props.color} columns={"1fr auto"}>
			<span>{currentValue}</span>

			{/* Button group */}
			<div className="buttons">{children}</div>
		</Container>
	);
}

export default Display;

Display.propTypes = exact({
	currentValue: propTypes.string.isRequired,
	children: propTypes.arrayOf(propTypes.node),
});
