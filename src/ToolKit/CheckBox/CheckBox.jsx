import PropTypes from "prop-types";
import {
	Grid,
	FormControlLabel,
	Checkbox,
} from "@material-ui/core";

import { Typography } from "~/ToolKit";

// Import Own Components
import useStyles from "./styles";

const CheckBox = ({ label, description, className, ...rest }) => {
	const classes = useStyles();

	return (
		<Grid container
			direction="row"
			justify="center"
			alignItems="baseline"
			className={classes.paddingY}
		>
			<Grid
				item
				xs={12}
				sm={4}
			>
				<Typography
					type="body2"
					fontWeight="600"
					color="primary"
				>
					{label}
				</Typography>

			</Grid>
			<Grid
				item
				xs={12}
				sm={8}
			>
				<FormControlLabel
					value=""
					control={
						<Checkbox color="primary" {...rest} />
					}
					label={
						<Typography
							type="caption"
						>
							{description}
						</Typography>
					}
					labelPlacement="end"
				/>
			</Grid>
		</Grid>
	);
};

CheckBox.propTypes = {
	label       : PropTypes.string,
	description : PropTypes.string,
	className   : PropTypes.string,
};

CheckBox.defaultProps = {
	className : "",
};

export default CheckBox;
