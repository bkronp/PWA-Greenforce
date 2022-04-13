import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		width        : "100%",
		textAlign    : "center",
		cursor       : "pointer",
		marginBottom : "0.5rem",
	},
	cardContent : {
		padding   : "0.5rem!important",
		minHeight : "4.5rem",

		"& h4" : {
			color : theme.palette.primary.main,
		},
	},
	media : {
		objectFit  : "cover",
		width      : "50%",
		position   : "relative",
		left       : "25%",
		paddingTop : "10px",
	},
	otherClass : {
		objectFit : "none !important",
	},
}));

export default useStyles;
