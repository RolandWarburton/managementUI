// ##──── INSTRUCTIONS ───────────────────────────────────────────────────────────────────
// import { makeStyles } from "@material-ui/core/styles";
// function Component() {
// 	const classes = paperStyles();
// 	return (
// 		<Paper className={classes.root}>
//			content goes here
// 		</Paper>
// 	);
// }

// breakpoints for paper MUI elements
const paperStyles = makeStyles({
	root: {
		display: "flex",
		marginTop: "3em",
		margin: "auto",
		[theme.breakpoints.up("md")]: {
			maxWidth: "80vw",
		},
		[theme.breakpoints.up("lg")]: {
			maxWidth: "50vw",
		},
	},
});

export default paperStyles;
