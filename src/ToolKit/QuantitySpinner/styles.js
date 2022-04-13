import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	inputNumber : {
		position                                                              : "relative",
		height                                                                : "45px",
		backgroundColor                                                       : theme.palette.dark.clearLight,
		overflow                                                              : "hidden",
		borderRadius                                                          : "20px",
		margin                                                                : "2px",
		display                                                               : "flex",
		justifyContent                                                        : "center",
		alignItems                                                            : "center",
		width                                                                 : "100%",
		padding                                                               : "10px",
		"&input::-webkit-outer-spin-button,	input::-webkit-inner-spin-button" : {
			appearance : "none",
		},
	},

	inputNumberValue : {
		position     : "absolute",
		height       : "100%",
		borderRadius : "20px",
		textAlign    : "center",
		fontSize     : "1.2rem",
		display      : "flex",
		alignItems   : "center",
	},

	btnPlus : {
		height          : "35px",
		width           : "35px",
		backgroundColor : theme.palette.primary.main,
		border          : "none",
		color           : theme.palette.background.white,
		fontSize        : "1.3rem",
		fontWeight      : "bold",
		cursor          : "pointer",
		borderRadius    : "50%",
		outline         : "none",
		zIndex          : 10,
		position        : "absolute",
		right           : "10px",
		"&:hover"       : {
			backgroundColor : theme.palette.secondary.main,
		},
	},

	btnMinus : {
		height          : "35px",
		width           : "35px",
		backgroundColor : theme.palette.primary.main,
		border          : "none",
		color           : theme.palette.background.white,
		fontSize        : "1.3rem",
		fontWeight      : "bold",
		cursor          : "pointer",
		borderRadius    : "50px",
		outline         : "none",
		zIndex          : 100,
		position        : "absolute",
		left            : "10px",
		"&:hover"       : {
			backgroundColor : theme.palette.secondary.main,
		},
	},

}));

export default useStyles;
