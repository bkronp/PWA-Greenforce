import PropTypes     from "prop-types";
import { InputBase } from "@material-ui/core";
import useStyles     from "./styles";

const QuantitySpinner = ({ value, changeQuantityWith }) => {
	const classes = useStyles();
	return (
		<div className={classes.inputNumber}>
			<button
				className={classes.btnMinus}
				type="button"
				onClick={changeQuantityWith(value => value - 1)}
			>
				&minus;
			</button>
			<InputBase
				onChange={changeQuantityWith(value => value)}
				className={classes.inputNumberValue}
				inputProps={{ "aria-label" : "naked", style : { textAlign : "center", appearance : "none" } }}
				type="number"
				value={value}
			/>
			<button
				className={classes.btnPlus}
				onClick={changeQuantityWith(value => value + 1)}
			>
				&#43;
			</button>
		</div>
	);
};

QuantitySpinner.propTypes = {
	value              : PropTypes.string.isRequired,
	changeQuantityWith : PropTypes.func.isRequired,
};

export default QuantitySpinner;

