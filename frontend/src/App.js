import React from "react";
import Pages from "./components/Pages";
import UploadForm from "./components/uploadForm/UploadForm";
import styled from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./components/navigation/navBar";
import ViewPage from "./components/viewPage/ViewPage";

const Styles = styled.div`
	color: #dedede;
	font-size: calc(10px + 1.5vmin);
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

const Wrapper = styled.div`
	margin: 50px 15vw;
	@media screen and (max-width: $medium) {
		margin: 50px 5vw;
	}
`;

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Styles>
				<BrowserRouter basename="/admin">
					{/* <NavBar position="fixed" /> */}
					<Wrapper>
						<Route exact path="/" component={Pages} />
						<Route exact path="/upload" component={UploadForm} />
						<Route exact path="/page/:id" component={ViewPage} />
					</Wrapper>
				</BrowserRouter>
			</Styles>
		</ThemeProvider>
	);
}

export default App;
