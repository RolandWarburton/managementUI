import React from "react";
import { Button, Container, Paper, AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";

const NavBar = (props) => {
	return (
		<AppBar>
			<Link to={{ pathname: "/upload" }}>Upload</Link>
		</AppBar>
	);
};

export default NavBar;
