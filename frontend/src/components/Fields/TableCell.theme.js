import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const tableCellStyles = makeStyles({
	root: {
		display: "grid",
		gridTemplateColumns: "1fr auto",
		justifyItems: "center",
		alignItems: "center",
	},
});

// ? Instructions to use:
// const classes = useStyles()
// <TableCell className={classes.root} />
export default tableCellStyles;
