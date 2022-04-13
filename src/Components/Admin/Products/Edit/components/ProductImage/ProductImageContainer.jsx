/* eslint-disable react-hooks/exhaustive-deps */
import {
	useCallback,
} from "react";
import PropTypes from "prop-types";

// Import Own Components
import ProductImage from "./ProductImage.jsx";

const deleteImage = (position, setDataImg, setImagesRecord) => {
	setDataImg(({ images = [], ...prevState }) => {
		const newImages = [...images];

		newImages.splice(position, 1);

		return {
			...prevState,
			images : newImages,
		};
	});

	setImagesRecord((prevState) => {
		const newImages = [...prevState];

		newImages.splice(position, 1);

		return newImages;
	});
};

const ProductImageContainer = ({
	position,
	delegations : {
		dataImg,
		setDataImg,
		setBtn,
		setImagesRecord,
	},
	...rest }) => {

	const deleteImageMethod = useCallback(() => {
		setBtn(true);
		return deleteImage(position, setDataImg, setImagesRecord);
	}, [position]);

	return (
		<ProductImage
			deleteImage={deleteImageMethod}
			dataImg={dataImg}
			setDataImg={setDataImg}
			{...rest}
		/>
	);
};

ProductImageContainer.propTypes = {
	position    : PropTypes.number.isRequired,
	delegations : PropTypes.any,
};

export default ProductImageContainer;
