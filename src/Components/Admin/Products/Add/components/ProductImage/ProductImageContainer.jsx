/* eslint-disable react-hooks/exhaustive-deps */
import {
	useCallback,
} from "react";
import PropTypes from "prop-types";

// Import Own Components
import ProductImage from "./ProductImage.jsx";

const deleteImage = (position, setData) => {
	setData(({ images = [], ...prevState }) => {
		const newImages = [...images];

		newImages.splice(position, 1);

		return {
			...prevState,
			images : newImages,
		};
	});
};

const ProductImageContainer = ({
	position,
	delegations : {
		dataImg,
		setDataImg,
	},
	...rest }) => {

	const deleteImageMethod = useCallback(() => deleteImage(position, setDataImg), [position]);

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
