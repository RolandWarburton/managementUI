import React from "react";
import Pages from "./components/Pages";
import UploadForm from "./components/uploadForm/UploadForm";
import styled from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./components/navigation/navBar";
import { Button, Container, Paper, Grid, AppBar } from "@material-ui/core";
import { compose, spacing, palette, breakpoints } from "@material-ui/system";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import { purple } from "@material-ui/core/colors";

const Styles = styled.div`
	color: #dedede;
	font-size: calc(10px + 1.5vmin);
	// padding: 0 10%;
`;

const theme = createMuiTheme({
	typography: {
		fontFamily: "Cantarell, Raleway, Arial",
	},
	overrides: {
		MuiCssBaseline: {
			"@global": {
				"@font-face": "Cantarell",
			},
		},
	},
	palette: {
		type: "dark",
		background: {
			default: "#282c34",
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Styles>
				<BrowserRouter basename="/admin">
					<NavBar position="fixed" />
					<div className={"wrapper"}>
						<Route exact path="/" component={Pages} />
						<Route exact path="/upload" component={UploadForm} />
					</div>
				</BrowserRouter>
			</Styles>
		</ThemeProvider>
	);
}

export default App;
