import PropTypes from "prop-types";
import {
	Grid,
	IconButton,
	Hidden,
	Dialog,
} from "@material-ui/core";
import Fade   from "react-reveal/Fade";

// Import Own Components
import {
	FaChevronDown,
	FaChevronUp,
	FaChevronLeft,
	FaChevronRight,
} from "~/Resources/icons/fal";
import {
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import useStyles from "./styles";

const GalleryCarousel = ({
	delegations : {
		up,
		down,
		setImage,
		handleClickOpen,
		handleClose,
		selected,
		displayImages,
		images,
		fullScreen,
		open,
	},
}) => {
	const classes = useStyles();
	return (
		<Grid container>
			<Hidden smDown>
				<Grid
					container
					direction="colum"
					item
					md={3}
					justify="center"
					alignItems="center"
				>
					<Grid container justify="center">
						<IconButton onClick={up}>
							<FaChevronUp />
						</IconButton>
					</Grid>
					<Grid className={classes.imageGallery}>
						{displayImages.length > 0 && displayImages.map((image, i) => (
							<Grid
								key={`image-${i}`}
								item
								container
								justify="center"
							>
								<Clicker onClick={() => setImage(image.original)}>
									<Fade left>
										<div className={classes.thumbnails}>
											<img
												className={classes.thumbnailImage}
												src={image.md}
												alt={`image${image.md}`}
											/>
										</div>
									</Fade>
								</Clicker>
							</Grid>
						))}
					</Grid>
					<Grid container justify="center">
						<IconButton onClick={down}><FaChevronDown /></IconButton>
					</Grid>
				</Grid>
			</Hidden>
			<Grid
				container
				alignItems="center"
				className={classes.selectedImage}
				item
				sm={12}
				md={9}
			>
				<div className={classes.boxImg} onClick={handleClickOpen}>
					<Fade down>
						{
							selected && (<img className={classes.mainImage} src={selected} alt="" />)
						}
					</Fade>
				</div>
			</Grid>
			<Hidden mdUp>
				<Grid
					container
					direction="row"
					item
					xs={12}
					justify="center"
					alignItems="center"
					alignContent="center"
				>
					<Grid container alignItems="center">
						<Grid item justify="center" alignItems="center">
							<IconButton onClick={up}>
								<FaChevronLeft />
							</IconButton>
						</Grid>
						<Grid
							item
							className={classes.imageGalleryRow}
						>
							{displayImages.length > 0 && displayImages.map(({ original }, i) => (
								<Grid
									key={`image-${i}`}
									item
									justify="center"
								>
									<Clicker onClick={() => setImage(original)}>
										<Fade left>
											<div className={classes.thumbnails}>
												<img className={classes.thumbnailImage} src={original} alt={original} />
											</div>
										</Fade>
									</Clicker>
								</Grid>
							))}
						</Grid>
						<Grid item justify="center" alignItems="center">
							<IconButton onClick={down}>
								<FaChevronRight />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Hidden>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
				style={{ minWidth : "90vw" }}
			>
				<IconButton
					edge="start"
					color="inherit"
					onClick={handleClose}
					aria-label="close"
					className={classes.bottonCloset}
				>
					X
				</IconButton>
				<img src={selected} alt={selected} style={{ width : "100%" }} />
			</Dialog>
			<style jsx global>{`
				.MuiIconButton-root {
					height: 3rem;
					width: 3rem;
				}
				.MuiIconButton-root:hover {
					background-color: rgba(0, 0, 0, 0.04);
					height: 3rem;
					width: 3rem;
				}
				.MuiDialog-paperWidthSm {
					max-width: none;
				}
			`}</style>
		</Grid>
	);
};


GalleryCarousel.propTypes = {
	delegations : PropTypes.object,
};

GalleryCarousel.defaultProps = {
	delegations : {},
};

export default GalleryCarousel;
