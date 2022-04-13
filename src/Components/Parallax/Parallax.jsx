import PropTypes from "prop-types";
import { Grid }  from "@material-ui/core";

// Import Own Components
import {
	Button,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import useStyles from "./styles";

const ParallaxBanner = ({
	delegations : {
		handle,
	},
	id,
	title,
	subtitle,
	background,
	alignment,
	backgroundSize,
	paradax,
	shadow,
	height,
	color,
	titleStyle,
	subtitleStyle,
	btnContainer,
	btnColor,
	btn,
	textColor,
	top,
	clip,
	cursive,
	cursiveTitle,
	cursiveSubtitle,
	repeat,
	scrollButtonHRef,
	scrollButtonTitle,
	scrollButtonTextColor,
	scrollButtonArrowColor,
}) => {
	const classes = useStyles({
		title,
		color,
		shadow,
		height,
		background,
		alignment,
		backgroundSize,
		paradax,
		btnColor,
		top,
		clip,
		cursive,
		cursiveTitle,
		cursiveSubtitle,
		titleStyle,
		subtitleStyle,
		repeat,
		scrollButtonTextColor,
		scrollButtonArrowColor,
	});

	return (
		<div className={classes.parallaxContainer}>
			<div className={classes.parallaxContainerFlex} id={id}>
				<Grid container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"

					>
						<Grid item xs={11} md={10} className={classes.textContainer}>
							{ title &&
								<Grid
									className={classes.title}
									dangerouslySetInnerHTML={{ __html : title }}
									style={{ fontFamily : cursiveTitle ? "Alex Brush, cursive" : "" }}
								/>}
							{ subtitle &&
								<Grid
									className={classes.subTitle}
									style={{ fontFamily : cursiveSubtitle ? "Alex Brush, cursive" : "" }}
									dangerouslySetInnerHTML={{ __html : subtitle }}
								/>}
							{ btnContainer && (
								btn ? (
									<Grid>
										<Button color={btnColor} onClick={handle} textColor={textColor}>
											{btnContainer}
										</Button>
									</Grid>
								) : (
									<Grid>
										<Clicker onClick={handle}>
											{btnContainer}
										</Clicker>
									</Grid>
								)
							) }
						</Grid>
					</Grid>
				</Grid>
			</div>
			{
				scrollButtonHRef &&
				<a href={scrollButtonHRef} className={classes.scrollButton}><span />{scrollButtonTitle}</a>
			}
		</div>
	);
};

ParallaxBanner.propTypes = {
	delegations            : PropTypes.object.isRequired,
	title                  : PropTypes.string,
	subtitle               : PropTypes.string,
	alignment              : PropTypes.string,
	backgroundSize         : PropTypes.string,
	paradax                : PropTypes.string,
	height                 : PropTypes.string,
	btnContainer           : PropTypes.any,
	btnColor               : PropTypes.string,
	btnTextColor           : PropTypes.string,
	boxShadow              : PropTypes.string,
	btnFontSize            : PropTypes.string,
	background             : PropTypes.elementType,
	shadow                 : PropTypes.bool,
	titleStyle             : PropTypes.object,
	subtitleStyle          : PropTypes.object,
	color                  : PropTypes.bool,
	btn                    : PropTypes.bool,
	url                    : PropTypes.string,
	textColor              : PropTypes.bool,
	top                    : PropTypes.string,
	clip                   : PropTypes.string,
	cursive                : PropTypes.bool,
	cursiveTitle           : PropTypes.bool,
	cursiveSubtitle        : PropTypes.bool,
	repeat                 : PropTypes.string,
	id                     : PropTypes.string,
	scrollButtonHRef       : PropTypes.string,
	scrollButtonTitle      : PropTypes.string,
	scrollButtonTextColor  : PropTypes.string,
	scrollButtonArrowColor : PropTypes.string,
};

ParallaxBanner.defaultProps = {
	title                  : undefined,
	subtitle               : undefined,
	background             : undefined,
	btnContainer           : undefined,
	alignment              : "center",
	backgroundSize         : "100%",
	paradax                : "initial",
	height                 : "350px",
	btnColor               : "primary",
	boxShadow              : "",
	btnTextColor           : "",
	btnFontSize            : "",
	shadow                 : false,
	color                  : true,
	btn                    : true,
	url                    : "/",
	textColor              : false,
	top                    : "0px",
	clip                   : "",
	cursive                : true,
	cursiveTitle           : false,
	cursiveSubtitle        : true,
	repeat                 : "repeat",
	id                     : "",
	nextSection            : "",
	nextSectionTitle       : "",
	scrollButtonTextColor  : "#fff",
	scrollButtonArrowColor : "#fff",
};

export default ParallaxBanner;
