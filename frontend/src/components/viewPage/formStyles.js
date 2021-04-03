import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "block",
		width: "100%",
		"& > *": {
			padding: theme.spacing(4),
		},
	},
	textField: {
		width: "100%",
	},
	button: {
		"& > *": {
			"margin-top": theme.spacing(2),
			"margin-bottom": theme.spacing(2),
		},
	},
}));

const Form = styled.form`
	width: 100%;
`;

export { Form, useStyles };
