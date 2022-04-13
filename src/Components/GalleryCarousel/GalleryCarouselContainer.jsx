import { useState }  from "react";
import PropTypes     from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme }  from "@material-ui/core/styles";

// Import Own Components
import GalleryCarousel from "./GalleryCarousel";

const GalleryCarouselContainer = ({ images }) => {
	const theme      = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const [selected, setSelected]           = useState(images[0].original);
	const [displayImages, setDisplayImages] = useState(images);

	const [open, setOpen] = useState(false);

	const up = () => {
		setDisplayImages(prevImgs => [
			prevImgs[prevImgs.length - 1],
			...prevImgs.splice(0, prevImgs.length - 1),
		]);
	};

	const down = () => {
		setDisplayImages(prevImgs => [
			...prevImgs.splice(1, prevImgs.length),
			prevImgs[prevImgs.length - 1],
		]);
	};

	const setImage = (src) => {
		setSelected(src);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<GalleryCarousel
			delegations={{
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
			}}
		/>
	);
};


GalleryCarouselContainer.propTypes = {
	images : PropTypes.array.isRequired,
};

GalleryCarouselContainer.defaultProps = {
	images : [],
};

export default GalleryCarouselContainer;
