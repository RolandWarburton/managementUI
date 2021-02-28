import { makeStyles } from "@material-ui/core/styles";

const tableCellStyles = makeStyles({
	root: {
		display: "grid",
		gridTemplateColumns: "1fr auto",
		alignItems: "center",
	},
});

// ? Instructions to use:
// const classes = useStyles()
// <TableCell className={classes.root} />
export default tableCellStyles;
