import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "block",
		width: "100%",
		height: "100%",
		"& > *": {
			padding: theme.spacing(4),
		},
		// [theme.breakpoints.up("md")]: {
		// 	backgroundColor: theme.palette.secondary.main,
		// },
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

const FieldArrayWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
`;

const FieldWrapper = styled.div`
	margin: 0.5em 0;
`;

const Fieldset = styled.fieldset`
	border: none;
	margin: 1em 0;
`;

const Error = styled.div`
	color: #f44336;
	font-size: 0.75em;
`;

export { useStyles, FieldArrayWrapper, FieldWrapper, Fieldset, Error };
