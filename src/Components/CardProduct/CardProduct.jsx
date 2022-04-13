import { useCallback } from "react";
import { useRouter }   from "next/router";
import PropTypes       from "prop-types";
import Zoom            from "react-reveal/Zoom";
import {
	Card,
	CardContent,
	CardMedia,
	Hidden,
} from "@material-ui/core";

// Import Own Components
import {
	Typography,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import useStyles from "./styles";

import { slug }  from "~/Util/ApiHelpers";

/** Component to find an image with title and information */
const CardProducts = ({
	id,
	category,
	image,
	label,
	nameProduct,
	variant,
	elevation,
	otherClass,
	height,
}) => {
	const classes = useStyles();
	const router  = useRouter();

	const toRouter = useCallback(url =>() => {
		router.push(url);
	}, [router]);
	return (
		<Clicker
			className={classes.root}
			onClick={toRouter(`/products/${slug(category)}/${slug(nameProduct)}/${id}`)}
		>
			<Card variant={variant} elevation={elevation}>
				<Hidden smUp>
					<Zoom clear>
						<CardMedia
							component="img"
							image={image}
							height={150}
							className={
								`${classes.media}
								${otherClass ? classes.otherClass : ""}`
							}
							title={nameProduct}
						/>
					</Zoom>
				</Hidden>
				<Hidden xsDown>
					<Zoom clear>
						<CardMedia
							component="img"
							image={image}
							className={
								`${classes.media}
								${otherClass ? classes.otherClass : ""}`
							}
							title={nameProduct}
						/>
					</Zoom>
				</Hidden>
				<CardContent className={classes.cardContent}>
					<Typography
						type="header4"
						color="dark"
						fontWeight="600"
					>
						{nameProduct}
					</Typography>
					<Typography
						type="caption"
						color="grey"
					>
						{label}
					</Typography>
				</CardContent>
			</Card>
		</Clicker>
	);
};

CardProducts.propTypes = {
	image       : PropTypes.string,
	nameProduct : PropTypes.string,
	id          : PropTypes.number,
	label       : PropTypes.string,
	variant     : PropTypes.string,
	elevation   : PropTypes.number,
	imageBorder : PropTypes.bool,
	otherClass  : PropTypes.bool,
	height      : PropTypes.any,
	category    : PropTypes.string,
};

CardProducts.defaultProps = {
	cardActions : <></>,
	nameProduct : "",
	label       : "",
	variant     : "outlined",
	elevation   : 2,
	imageBorder : false,
	otherClass  : false,
};

export default CardProducts;
