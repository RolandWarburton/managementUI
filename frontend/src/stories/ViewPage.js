import React from "react";
import Component from "../components/viewPage/Form";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../StyleBaseline";

export const ViewPage = ({ page }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<Component page={page} />
			</CssBaseline>
		</ThemeProvider>
	);
};

ViewPage.defaultProps = {
	page: {
		_id: "5fd5783bf4500b001f1144a7",
		__v: 1,
		pageName: "testPage",
		source: [
			{ url: "a", remote: true },
			{ url: "b", remote: true },
		],
		websitePath: ["website", "path"],
		meta: { template: "template.ejs" },
	},
};
