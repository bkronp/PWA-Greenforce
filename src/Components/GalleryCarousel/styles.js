import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	imageGallery : {
		margin        : "0 auto",
		display       : "flex",
		flexDirection : "column",
		height        : "270px",
		overflow      : "hidden",
	},
	imageGalleryRow : {
		margin        : "0 auto",
		display       : "flex",
		flexDirection : "row",
		width         : "400px!important",
		overflow      : "hidden",

		[theme.breakpoints.between(0, 410)] : {
			width : "110px!important",
		},
		[theme.breakpoints.between(410, 510)] : {
			width : "200px!important",
		},
		[theme.breakpoints.between(510, 610)] : {
			width : "300px!important",
		},
	},
	thumbnailImage : {
		// height    : "100%",
		transform : " translate( -0%, -0%)",
	},
	thumbnails : {
		display        : "flex",
		justifyContent : "center",
		height         : "80px",
		width          : "80px",
		border         : `1px solid ${theme.palette.dark.light}`,
		borderRadius   : "5px",
		margin         : theme.spacing(.5),
		overflow       : "hidden",
	},
	selectedImage : {
		display        : "flex",
		justifyContent : "center",
		padding        : "16px 24px 16px 0",
		overflow       : "hidden",

		[theme.breakpoints.between(0, 960)] : {
			padding : "0.5rem",
		},
	},
	mainImage : {
		height : "100%",
	},
	boxImg : {
		// width     : "100%",
		textAlign : "center",
		"& img "  : {
			height                         : "100%",
			objectFit                      : "contain",
			maxWidth                       : "100vw",
			objectPosition                 : "center center",
			width                          : "100%",
			[theme.breakpoints.down("sm")] : {
				width : "100%",
			},
		},
	},
	bottonCloset : {
		position   : "absolute",
		background : theme.palette.dark.main,
		margin     : "1rem",
		color      : "white",
		right      : 0,
	},
}));


export default useStyles;
