import React, { Children } from "react";
import { Container } from "./Field.style";

import propTypes from "prop-types";
import exact from "prop-types-exact";

function Edit(props) {
	const { currentValue, disabled, onChangeCallback, children } = props;

	return (
		<Container id={props.value} color={props.color} columns={"1fr auto"}>
			{/* Input box */}
			<input
				className="is-primary"
				defaultValue={currentValue}
				id="inputField"
				disabled={disabled}
				onChange={(e) => {
					onChangeCallback(e.target.value);
				}}
			/>

			{/* Button group */}
			<div className="buttons">{children}</div>
		</Container>
	);
}

export default Edit;

Edit.propTypes = exact({
	currentValue: propTypes.string.isRequired,
	disabled: propTypes.bool.isRequired,
	onChangeCallback: propTypes.func.isRequired,
	children: propTypes.arrayOf(propTypes.node),
});
