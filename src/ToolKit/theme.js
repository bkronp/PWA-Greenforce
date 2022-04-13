import {
	createMuiTheme,
	responsiveFontSizes,
} from "@material-ui/core/styles";
import { esES } from "@material-ui/core/locale";

// Create a theme instance.
let theme = createMuiTheme({
	palette : {
		primary : {
			main       : "#489144",
			dark       : "#235121",
			light      : "#4fb449",
			clearLight : "#D7E6f5",
		},
		secondary : {
			main       : "#EFB810",
			dark       : "#B88900",
			light      : "#F3CA4C",
			clearLight : "#FFEA51",
		},
		deletion : {
			main       : "#f44336",
			dark       : "#aa2e25",
			light      : "#f6685e",
			clearLight : "#f27573",
		},

		dark : {
			main       : "#303030",
			dark       : "#070707",
			regular    : "#1A1A1A",
			light      : "#595959",
			clearLight : "#9E9E9E",
		},
		background : {
			default : "#f6f7f9",
			light   : "#fefefe",
			white   : "#ffffff",
		},
		generalColors : {

		},
	},
	typography : {
		fontFamily : [
			"-apple-system",
			"BlinkMacSystemFont",
			"'Segoe UI'",
			"Roboto",
			"'Helvetica Neue'",
			"Arial",
			"sans-serif",
			"'Apple Color Emoji'",
			"'Segoe UI Emoji'",
			"'Segoe UI Symbol'",
			"'Open Sans'",
			"Montserrat",
		].join(","),
	},
}, esES);

theme = responsiveFontSizes(theme);

export default theme;
