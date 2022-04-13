import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		height: "100%",
		padding: "1rem",
	},
	padding: {
		padding: "1rem",
	},
	titleContainer: {
		padding: "1rem 0rem",
		position: "relative",
		marginBottom: "3rem",
	},
	btnProducto: {
		borderRadius: "30px",
		minWidth: "150px",
		margin: "0.5rem",
	},
	appBar: {
		position: "relative",
	},
	cont: {
		display: "flex",
		justifyContent: "center",
		padding: "0 1rem"
	},
	list: {
		width: "50%",
		margin: "10px",
		marginLeft: "15%",
		
		"& li":{
			padding: "5px",
		}
	},

	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	img: {
		maxWidth: "100%",
		padding: "1rem",
		margin: "1rem",
		boxShadow: "none!important",
		background: "transparent",

		"& .MuiCardMedia-img": {
			objectFit: "contain",
		},
		"& .MuiPaper-rounded": {
			boxShadow: "0 0 black !important",
		},
	},
	meanLogoText: {
		fontSize: "calc(1.9vw + 1.2vh)",
		padding: "1rem",
		textAlign: "justify",
		textJustify: "inter-word",
		color: "#ffff",
		"& span": {
			fontWeight: "bolder",
			textDecoration: "underline",
		},
	},
	meanLogoTitle: {
		fontSize: "calc(4vw + 1.2vh)",
		textTransform: "uppercase",
		color: "#ffff",
		fontWeight: "bolder",
	},
	scrollButton: {
		position: "relative",
		bottom: "-50px",
		left: "50%",
		zIndex: "10",
		display: "inline-block",
		"-webkit-transform": "translate(-50%, -50%)",
		transform: "translate(-50%, -50%)",
		color: "#489144",
		fontSize: "2.3vh",
		letterSpacing: ".1em",
		textDecoration: "none",
		transition: "opacity .3s",
		paddingTop: "70px",

		"&:hover": {
			opacity: ".5",
		},

		"& span": {
			position: "absolute",
			top: 0,
			left: "50%",
			width: "24px",
			height: "24px",
			marginLeft: "-12px",
			borderLeft: "1px solid #489144",
			borderBottom: "1px solid #489144",
			"-webkit-transform": "rotate(-45deg)",
			transform: "rotate(-45deg)",
			"-webkit-animation": "$sdb05 1.5s infinite",
			animation: "$sdb05 1.5s infinite",
			boxSizing: "border-box",
		},
	},
	"@-webkit-keyframes sdb05": {
		"0%": {
			"-webkit-transform": "rotate(-45deg) translate(0, 0)",
			opacity: 0,
		},
		"50%": {
			opacity: 1,
		},
		"100%": {
			"-webkit-transform": "rotate(-45deg) translate(-20px, 20px)",
			opacity: 0,
		},
	},
	"@keyframes sdb05": {
		"0%": {
			transform: "rotate(-45deg) translate(0, 0)",
			opacity: 0,
		},
		"50%": {
			opacity: 1,
		},
		"100%": {
			transform: "rotate(-45deg) translate(-20px, 20px)",
			opacity: 0,
		},
	},
}));

export default useStyles;
