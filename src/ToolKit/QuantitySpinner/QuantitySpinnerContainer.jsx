import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import QuantitySpinner from "./QuantitySpinner";

const QuantitySpinnerContainer = ({ max, min, val, onChangeValue, id }) => {
	const [value, setValue] = useState(val);
	const changeQuantityWith = useCallback(updaterFn => () => {
		setValue(prevQuantity => {
			const newQuantity = updaterFn(prevQuantity);
			onChangeValue(id, newQuantity);
			return newQuantity > max || newQuantity < min
				? prevQuantity
				: newQuantity;
		});
	}, [max, min, id, onChangeValue]);

	return (
		<QuantitySpinner {...{ value, max, min, changeQuantityWith }} />
	);
};

QuantitySpinnerContainer.propTypes = {
	max           : PropTypes.string.isRequired,
	min           : PropTypes.string.isRequired,
	val           : PropTypes.number.isRequired,
	onChangeValue : PropTypes.func,
	id            : PropTypes.number,
};

QuantitySpinner.defaultProps = {
	onChangeValue : ()=>{},
	id            : 0,
};

export default QuantitySpinnerContainer;
