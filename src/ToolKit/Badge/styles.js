import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
	root : {
		"& > *" : {
			margin : theme.spacing(1),
		},
	},
	badge : {
		"& span" : {
			background : theme.palette.secondary.main,
			color      : "white!important",
		},
	},
	Icon : {
		height : "1.6rem",
		width  : "2rem",
	},
}));

export default useStyles;
