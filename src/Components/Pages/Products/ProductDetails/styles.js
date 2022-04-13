import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	tabs : {
		paddingLeft : theme.spacing(1),
	},
	paper : {
		height  : "100%",
		padding : "1rem",
	},
	gallery : {
		height         : "100%",
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
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
	btnProducto : {
		position     : "relative",
		borderRadius : "30px",
		width        : "250px",
		marginTop    : "1rem",
	},
	titleContainer : {
		padding      : "1rem 0rem",
		position     : "relative",
		marginBottom : "7px",
	},
	cardContent : {
		height : "85%",
	},
	cardSize : {
		height    : "350px",
		textAlign : "center",
		padding   : "1rem",

		"& .MuiCardMedia-img" : {
			objectFit : "contain",
		},
	},
	tableContainer : {
		padding : 0,
	},
	table : {
		padding : 0,
	},
	tableCell : {
		padding : "0.5rem",
	},
	productRelatedContainer : {
		padding : "0.5rem",
		height  : "300px",
		margin  : "2em 0 0.5rem 0",
	},
	papperProductRelated : {
		height     : "100%",
		background : "#4f4f52",
		cursor     : "pointer",
	},
	typografyProductRelated : {
		textAlign : "center !important",
		color     : "#f3f3f3 !important",
		width     : "100%",
	},
	productRelated : {
		height : "100%",
	},
	imageProductRelated : {
		width     : "100%",
		height    : "200px",
		margin    : "1rem 0 0 0",
		objectFit : "scale-down",
	},
	pageDescriptionText : {
		padding  : "2rem 0",
		fontSize : "calc(1.3vw + 1.2vh)",
	},
}));

export default useStyles;
