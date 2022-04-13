/* eslint-disable key-spacing */
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	avatar: {
		border: `1px solid ${theme.palette.grey[300]}`,
	},
	center: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	btn: {
		fontSize: "1.1em",
		minWidth: theme.spacing(25),
	},
	tab: {
		minWidth: "auto",
		textTransform: "capitalize",
		fontWeight: "bold",
		margin: `${theme.spacing(0.2)}px ${theme.spacing(1)}px`,
		fontSize: "1.05em",
	},
	indicator: {
		height: theme.spacing(1 / 2),
	},
	deleteBtn: {
		margin: "10px",
		background: "#f44336",

		"&:hover": {
			background: "#FB786F"
		},
	},
	centerIco: {
		marginLeft: "10px"
		
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

export default useStyles;
