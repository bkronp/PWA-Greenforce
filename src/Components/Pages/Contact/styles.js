/* eslint-disable max-len */
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		width   : "100%",
		padding : "1rem",
	},
	cardSize : {
		height    : "350px",
		textAlign : "center",
		padding   : "1rem",

		"& .MuiCardMedia-img" : {
			objectFit : "contain",
		},
	},
	titleContainer : {
		padding      : "1rem 0rem",
		position     : "relative",
		marginBottom : "3.5rem",
	},
	icon : {
		color  : "#000",
		height : "2rem !important",
		width  : "2rem !important",
		margin : ".5rem",
	},
	padding : {
		padding : "0.5rem",
	},
	btn : {
		borderRadius : "30px",
		minWidth     : "150px",
		margin       : "0.5rem",
	},
}));

export default useStyles;
