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
	margin: 50px 15vw;
	@media screen and (max-width: $medium) {
		margin: 50px 5vw;
	}
`;

export { theme, Styles, Wrapper };
