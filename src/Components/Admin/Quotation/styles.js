import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	avatar : {
		border : `1px solid ${theme.palette.grey[300]}`,
	},
	center : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
	},
	btn : {
		margin : "0.25rem",
	},

	tabs : {
		paddingLeft : theme.spacing(1),
	},
	tab : {
		minWidth      : "auto",
		textTransform : "capitalize",
		fontWeight    : "bold",
		margin        : `${theme.spacing(0.2)}px ${theme.spacing(1)}px`,
		fontSize      : "1.05em",
	},
	indicator : {
		height : theme.spacing(1 / 2),
	},
}));

export default useStyles;
