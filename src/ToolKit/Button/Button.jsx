import PropTypes               from "prop-types";
import { Button as MuiButton } from "@material-ui/core";

// Import Own Components
import useStyles from "./styles";

const Button = ({ color, grow, textColor, variant, className, ...rest }) => {
	const classes = useStyles({ color, grow, textColor });
	return (
		<MuiButton
			variant={variant}
			className={`${classes.backgroundColorButton} ${classes.button} ${className}`}
			{...rest}
		/>
	);
};

Button.propTypes = {
	color : PropTypes.oneOf([
		"secondary",
		"white",
		"deletion",
		"primary",
		"dark",
		"default",
	]),
	grow      : PropTypes.bool,
	className : PropTypes.string,
	textColor : PropTypes.bool,
	variant   : PropTypes.string,
};

Button.defaultProps = {
	grow      : false,
	className : "",
	textColor : false,
	variant   : "contained",
};

export default Button;
