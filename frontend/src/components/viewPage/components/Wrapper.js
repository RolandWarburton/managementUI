import React from "react";
import { Container, Paper } from "@material-ui/core";
import { useStyles } from "./formStyles";

const Wrapper = ({ children }) => {
	const classes = useStyles();
	return (
		<Container className={classes.root} maxWidth="xl">
			<Paper elevation={3} elementtype="section">
				{children}
			</Paper>
		</Container>
	);
};

export default Wrapper;
