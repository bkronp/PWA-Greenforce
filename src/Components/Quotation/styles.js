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
		background   : theme.palette.dark.dark,
	},
	spacer : {
		flexGrow : 1,
	},
	formControl : {
		display : "block",
	},
	padding : {
		marginBottom : "1rem",
		marginRight  : "0.5rem",
		marginLeft   : "0.5rem",
	},
	appBar : {
		position : "relative",
	},
	title : {
		marginLeft : theme.spacing(2),
		flex       : 1,
	},
	root2 : {
		width   : 28,
		height  : 16,
		padding : 0,
		display : "flex",
	},
	switchBase : {
		padding     : 2,
		color       : theme.palette.grey[500],
		"&$checked" : {
		  transform    : "translateX(12px)",
		  color        : theme.palette.common.white,
		  "& + $track" : {
				opacity         : 1,
				backgroundColor : theme.palette.primary.main,
				borderColor     : theme.palette.primary.main,
		  },
		},
	},
	thumb : {
		width        : 12,
		height       : 12,
		boxShadow    : "none",
		marginBottom : "0.6rem",
	},
	track : {
		border          : `1px solid ${theme.palette.grey[500]}`,
		borderRadius    : 16 / 2,
		opacity         : 1,
		backgroundColor : theme.palette.common.white,
	},
}));

export default useStyles;
