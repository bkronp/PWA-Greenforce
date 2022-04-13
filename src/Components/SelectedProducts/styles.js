import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		width : "100%",
	},
	selectedProducts : {
		maxWidth : "1200px",
		margin   : "0 auto",
		padding  : "2rem",
	},
	productContainer : {
		display        : "flex",
		flexDirection  : "column",
		alignItems     : "center",
		justifyContent : "center",
	},
	btnProducto : {
		position     : "relative",
		borderRadius : "30px",
		width        : "250px",
		top          : "-20px",
		background   : theme.palette.dark.dark,
	},
}));

export default useStyles;
