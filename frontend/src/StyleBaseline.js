import { createMuiTheme } from "@material-ui/core/styles";
import styled from "styled-components";

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
	color: #dedede;
	font-size: calc(10px + 1.5vmin);
	margin: 50px 0vw; // mobile
	/* background-color: #424242; */
	/* height: 100vh; */
	/* position: fixed;
	top: 0;
	right: 0; */
	@media screen and (min-width: 600px) {
		margin: 50px 5vw;
	}
`;

export { theme, Styles, Wrapper };
