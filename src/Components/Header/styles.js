import {
	Tooltip,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core";

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
	root : {
		position : "initial",
		flexGrow : 1,
		zIndex   : theme.zIndex.drawer + 2,
	},
	appBar : {
		backgroundColor : "transparent !important",
		position        : "initial!important",
		boxShadow       : "none!important",
	},
	appBarMural : {
		position : "relative",
	},
	appBarTransparent : {
		position  : "initial",
		boxShadow : "none!important",
	},
	spacer : {
		flexGrow : 1,
	},
	userName : {
		overflow   : "hidden",
		whiteSpace : "nowrap",
		padding    : "2%",
	},
	toolbar : {
		padding : theme.spacing(0.5),
	},
	img : {
		height   : "64px",
		padding  : "0.5rem",
		position : "relative",

		[theme.breakpoints.up("md")] : {
			height   : "110px",
			zIndex   : "10",
			padding  : "0",
			top      : "10px",
			left     : "10px",
			position : "absolute",
		},
	},
	divContainerdisplay : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
	},
	divContainerdisplayMenu : {
		display        : "flex",
		justifyContent : "flex-end",
		alignItems     : "center",
		height         : "64px",
		width          : "100%",
		marginRight    : "1rem",
	},
	nav : {
		margin     : "0 1rem 0 1rem",
		fontWeight : "600!important",
	},
	productsMenu : {
		top   : "40px",
		left  : "0px",
		width : "100vw",
	},
	logo : {
		height : "80px",
	},
	icon : {
		height : "2rem !important",
		width  : "2rem !important",
		margin : ".5rem",
	},
	iconWhatsApp : {
		color : "#00e676",
	},
	iconFacebook : {
		color : "#0e8ef2",
	},
	iconTwitter : {
		color : "#00acee",
	},
	subList : {
		paddingLeft : "10px",
	},
	drawer : {
		width      : drawerWidth,
		flexShrink : 0,
	},
	drawerPaper : {
		width : drawerWidth,
	},
	drawerHeader : {
		display        : "flex",
		alignItems     : "center",
		padding        : theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent : "flex-start",
		minWidth       : "30vw",
	},
	nested : {
		paddingLeft : theme.spacing(4),
	},
	button : {
		margin     : "0.5rem",
		fontWeight : "600",
		"&:hover"  : {
			background : "transparent",
			color      : theme.palette.secondary.light,
		},
	},
	menutext : {
		color     : "#489144",
		"&:hover" : {
			background : "transparent",
			color      : theme.palette.primary.dark,
		},
	},
	padding : {
		padding : "1rem",
	},
	title : {
		fontSize   : "calc(2.5vw + 1.8vh)",
		marginLeft : theme.spacing(2),
		flex       : 1,
		textAlign  : "center",
		padding    : "1vh",
		textShadow : "5px 5px 10px #0032a8",
	},
	arrowRight : {
		position : "absolute",
		right    : "10px",
	},
	whatsappFab : {
		background   : "#25D366",
		height       : "56px",
		width        : "56px",
		borderRadius : "35px",
		position     : "fixed",
		bottom       : "50px",
		right        : "28px",
		zIndex       : "10",
		boxShadow    :
			"0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)",
		"-webkit-animation" : "all 1s ease 0s",
		animation           : "all 1s ease 0s",

		"&:hover" : {
			filter : "brightness(90%)",
		},
	},
	iconWhatsAppFab : {
		color    : "white",
		height   : "2.7rem !important",
		width    : "2.7rem !important",
		position : "relative",
		top      : "6px",
		left     : "7px",
	},
	"@-webkit-keyframes wap" : {
		"0%" : {
			"-webkit-transform" : "translate(0, 0)",
		},
		"100%" : {
			"-webkit-transform" : "translate(0, 5px)",
		},
	},
	"@keyframes wap" : {
		"0%" : {
			transform : "translate(0, 0)",
		},
		"100%" : {
			transform : "translate(0, 5px)",
		},
	},
	fabTooltip : {
		fontSize : "3rem",
	},
}));

export const FabTooltip = withStyles((theme) => ({
	tooltip : {
		boxShadow : theme.shadows[1],
		fontSize  : "1.5rem",
	},
}))(Tooltip);

export default useStyles;
