import React from "react";
import Table from "./components/table/Table";
import UploadForm from "./components/uploadForm/UploadForm";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ViewPage from "./components/viewPage/ViewPage";
import { theme, Styles, Wrapper } from "./StyleBaseline";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Styles>
				<BrowserRouter basename="/admin">
					{/* <NavBar position="fixed" /> */}
					<Wrapper>
						<Route exact path="/" component={Table} />
						<Route exact path="/upload" component={UploadForm} />
						<Route exact path="/page/:id" component={ViewPage} />
					</Wrapper>
				</BrowserRouter>
			</Styles>
		</ThemeProvider>
	);
}

export default App;
