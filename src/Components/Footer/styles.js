import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	footer : {
		width          : "100%",
		margin         : "0 auto",
		background     : theme.palette.primary.main,
		display        : "flex",
		justifyContent : "center",
		flexDirection  : "column",
		minHeight      : "260px",
		position       : "relative",
	},
	footer2 : {
		background : theme.palette.primary.dark,
		padding    : ".5rem",
	},
	figureRigth : {
		marginLeft  : "auto",
		marginRight : "auto",
	},
	figureLeft : {
		height      : "170px",
		marginLeft  : "auto",
		marginRight : "auto",
	},
	LabelImage : {
		textAlign : "center",
		color     : "#f3f3f3",
	},
	icon : {
		color  : "white",
		width  : "2rem !important",
		height : "2rem !important",
		margin : "0.4rem",
	},
	listLinks : {
		color   : "white",
		padding : "2px 0 2px 16px",
	},
}));

export default useStyles;
