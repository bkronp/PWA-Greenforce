/* eslint-disable max-len */
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	title : {
		fontSize : "calc(2rem + 1vw)",
	},
	quote : {
		fontSize : "calc(2.5vw + 1.2vh)",
	},
	titleDescription : {
		fontSize : "calc(1.9vw + 1.2vh)",
	},
	subCategory : {
		fontSize : "calc(1rem + 1vw)",
	},
	productBar : {
		fontSize        : "calc(1.9vw + 1.2vh)",
		backgroundColor : "#005187",
		padding         : "1.5rem",
		color           : "#ffff",
		alignSelf       : "justify",
	},
	btnProducto : {
		borderRadius : "20px",
		marginBottom : "15px",
		animation    : "$animate 1s linear infinite",
	},
	"@keyframes animate" : {
		"0%" : {
			boxShadow : "0 0 0 0 #4fb44991",
		},
		"100%" : {
			boxShadow : "0 0 0 20px #4fb44900",
		},
	},
}));

export default useStyles;
