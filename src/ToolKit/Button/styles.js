import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	backgroundColorButton : ({ color, textColor }) => {
		const backgroundColor = colorValue => ({
			backgroundColor : colorValue,
			color           : textColor ? theme.palette.primary.main : (color === "white" || color === "default")
				? theme.palette.grey[800] : theme.palette.common.white,
			"&:hover" : {
				backgroundColor : theme.palette.augmentColor({ main : colorValue }).light,
			},
		});

		switch (color) {
			case "secondary":
				return backgroundColor(theme.palette.secondary.main);
			case "white":
				return backgroundColor(theme.palette.background.white);
			case "primary":
				return backgroundColor(theme.palette.primary.main);
			case "dark":
				return backgroundColor(theme.palette.dark.main);
			default:
				return backgroundColor(theme.palette.grey[300]);
		}
	},
	button : ({ grow }) => ({
		textTransform : "none",
		width         : grow ? "100%" : "auto",
		borderRadius  : 0,
	}),
}));

export default useStyles;
