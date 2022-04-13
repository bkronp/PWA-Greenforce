import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	center : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
	},
	btn : {
		fontSize : "1.1em",
		minWidth : theme.spacing(25),
	},
	spacer : {
		flexGrow : 1,
	},
	img : {
		width        : "10rem",
		borderRadius : "50%",
	},
	inputPadding : {
		padding : "0.5rem",
	},
	clicker : {
		textAlign : "right",
		width     : "100%",
	},
	formControl : {
		display : "block",
	},
	paperPadding : {
		width   : "100%",
		padding : "1rem",
	},
	images : {
		display   : "flex",
		flexWrap  : "no-wrap",
		overflowX : "auto",
		overflowY : "hidden",

		"& > *" : {
			margin : `auto ${theme.spacing(1)}px`,
		},
	},
}));

export default useStyles;
