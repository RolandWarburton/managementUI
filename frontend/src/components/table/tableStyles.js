import { makeStyles } from "@material-ui/core/styles";

const tableStyles = makeStyles((theme) => ({
	table: {
		display: "grid",
		"grid-template-columns": "minmax(50px, 80px) minmax(250px, auto) 1fr",
	},
	tableRowCursor: {
		display: "grid",
		"grid-template-columns": "minmax(50px, 80px) minmax(250px, auto) 1fr",
		cursor: "pointer;",
	},
}));

export { tableStyles };
