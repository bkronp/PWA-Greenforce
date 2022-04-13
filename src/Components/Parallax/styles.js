import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	title : ({ color, cursive }) => ({
		zIndex        : 1000,
		textAlign     : "center",
		fontSize      : "calc(1rem + 2vw)",
		textTransform : "inherit",
		fontWeight    : 600,
		color         : color ? theme.palette.dark.main : theme.palette.background.white,
		padding       : cursive ? "" : "1rem",
		"& p"         : {
			marginBlockStart  : "0em",
			marginBlockEnd    : "0em",
			marginInlineStart : "0px",
			marginInlineEnd   : "0px",
		},
	}),
	subTitle : ({ color, cursive }) => ({
		zIndex        : 1000,
		textAlign     : "justify",
		color         : color ? theme.palette.dark.main : theme.palette.background.white,
		fontSize      : "3.2vh",
		wordSpacing   : "-2px",
		textTransform : "inherit",
		padding       : "1rem 1rem 2rem 1rem",
		lineHeight    : "4vh",
		textShadow    : "0px 0px 15px #000",
	}),
	textContainer : ({ title, subtitle }) => ({
		// backgroundColor : title || subtitle ? "rgba(0,0,0, 0.4)" : "",
		padding : "1vh",
	}),
	parallaxContainerFlex : ({ shadow }) => ({
		width           : "100%",
		height          : "100%",
		display         : "flex",
		position        : "absolute",
		alignItems      : "center",
		flexDirection   : "column",
		justifyContent  : "center",
		backgroundColor : shadow ? "#494e5087" : "",
	}),
	parallaxContainer : ({
		height,
		background,
		alignment,
		backgroundSize,
		paradax,
		top,
		clip,
		repeat,
	}) => ({
		position             : "relative",
		height               : height,
		backgroundSize       : `${backgroundSize ? backgroundSize : "100% "}!important`,
		background           : `url( ${background} ) ${alignment}/${backgroundSize} ${repeat}`,
		backgroundAttachment : paradax,
		top                  : top,
		clipPath             : clip,
	}),
	scrollButton : {
		position            : "absolute",
		bottom              : "20px",
		left                : "50%",
		zIndex              : "10",
		display             : "inline-block",
		"-webkit-transform" : "translate(-50%, -50%)",
		transform           : "translate(-50%, -50%)",
		color               : ({ scrollButtonTextColor }) => `${scrollButtonTextColor}`,
		fontSize            : "2.3vh",
		letterSpacing       : ".1em",
		textDecoration      : "none",
		transition          : "opacity .3s",
		paddingTop          : "70px",

		"&:hover" : {
			opacity : ".5",
		},

		"& span" : {
			position            : "absolute",
			top                 : 0,
			left                : "50%",
			width               : "24px",
			height              : "24px",
			marginLeft          : "-12px",
			borderLeft          : ({ scrollButtonArrowColor }) => `1px solid ${scrollButtonArrowColor}`,
			borderBottom        : ({ scrollButtonArrowColor }) => `1px solid ${scrollButtonArrowColor}`,
			"-webkit-transform" : "rotate(-45deg)",
			transform           : "rotate(-45deg)",
			animation           : "$scrollArrow 1.5s infinite",
			boxSizing           : "border-box",
		},
	},
	"@keyframes scrollArrow" : {
		"0%" : {
			transform : "rotate(-45deg) translate(0, 0)",
			opacity   : 0,
		},
		"50%" : {
			opacity : 1,
		},
		"100%" : {
			transform : "rotate(-45deg) translate(-20px, 20px)",
			opacity   : 0,
		},
	},
}));

export default useStyles;
