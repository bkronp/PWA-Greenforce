import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => {
	const centeredFlex = {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
	};

	return {
		root : {
			margin  : 0,
			padding : 0,
			width   : "100vw",
			height  : "100vh",

			...centeredFlex,
			alignItems : "flex-start",
		},
		imageContainer : {
			...centeredFlex,
			"& img" : {
				maxWidth     : "70%",
				marginBottom : "15%",
			},
		},
		mainSection : {
			marginTop : "10%",

			...centeredFlex,
			flexDirection : "column",

			width                        : "60%",
			[theme.breakpoints.up("md")] : {
				width : "33%",
			},
			[theme.breakpoints.up("lg")] : {
				width : "25%",
			},

			"& form" : {
				display       : "flex",
				flexDirection : "column",
				width         : "100%",
			},
		},
		button : {
			marginTop : "10%",
		},
		loading : {
			...centeredFlex,
			margin : "10%",
		},
		backButton : {
			position : "fixed",
			top      : theme.spacing(1),
			left     : theme.spacing(2),
		},
	};
});

export default useStyles;
