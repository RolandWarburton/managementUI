import React from "react";
import { Button, Container, Paper, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const appBarStyles = makeStyles({
	root: {
		height: "50px",
	},
});

const NavBar = (props) => {
	const classes = appBarStyles();
	return (
		<AppBar className={classes.root}>
			<Link to={{ pathname: "/upload" }}>Upload</Link>
		</AppBar>
	);
};

export default NavBar;
