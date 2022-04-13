import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	bannerContainer : {
		padding  : "0",
		position : "relative",
		top      : "0",
	},
	images : {
		width                          : "auto",
		maxHeight                      : "calc(100vh - 80px)",
		display                        : "block",
		marginLeft                     : "auto",
		marginRight                    : "auto",
		[theme.breakpoints.down("sm")] : {
			width : "100%",
		},
	},
}));

export default useStyles;
