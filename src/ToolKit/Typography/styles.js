import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	textColor : ({ color : requestedColor }) => {
		const color = (() => {
			switch (requestedColor) {
				case "white":     return theme.palette.common.white;
				case "secondary": return theme.palette.secondary.main;
				case "primary":   return theme.palette.primary.main;
				case "grey":      return theme.palette.grey[700];
				case "grey2":     return theme.palette.grey[500];
				default:          return theme.palette.dark.main;
			}
		})();

		return { color };
	},
	title : ({ fontWeight }) => ({
		fontWeight,
		fontSize   : "6vh",
		lineHeight : "100%",
	}),
	header1 : ({ fontWeight }) => ({
		fontWeight : fontWeight || "bold",
		fontSize   : "6vh",
		lineHeight : "100%",
	}),
	header2 : ({ fontWeight }) => ({
		fontWeight : fontWeight || "bold",
		fontSize   : "3.2vh",
		lineHeight : "100%",
	}),
	header3 : ({ fontWeight }) => ({
		fontWeight,
		fontSize : "2.5vh",
	}),
	header4 : ({ fontWeight }) => ({
		fontWeight,
	}),
	body2 : ({ fontWeight }) => ({
		fontWeight,
	}),
	caption : ({ fontWeight }) => ({
		fontWeight,
	}),
	paragraph : ({ fontWeight }) => ({
		fontWeight,
		fontSize : "1em",
	}),
}));

export default useStyles;
