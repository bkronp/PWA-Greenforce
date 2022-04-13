import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root : {
		flexGrow : 1,
		padding  : "1rem",
	},
	paper : {
		padding         : "1rem",
		textAlign       : "center",
		fontSize        : "calc(1vw + 0.8vh)",
		backgroundColor : "#3686c6",
		color           : "white",
	},
	grid : {
		padding : "0.5rem",
	},
}));

export default useStyles;
