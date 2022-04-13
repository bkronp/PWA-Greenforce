/* eslint-disable max-len */
import PropTypes from "prop-types";
import useStyles from "~/Resources/icons/styles";

const FaLocation = ({ className, ...rest }) => {
	const classes = useStyles();
	return (
		<svg
			className={`svg-inline--fa fa-location fa-w-16 ${className} ${classes.iconSize}`}
			aria-hidden="true"
			focusable="false"
			data-prefix="fal"
			data-icon="location"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			{...rest}
		>
			<path
				fill="currentColor"
				d="M504 240h-56.81C439.48 146.76 365.24 72.52 272 64.81V8c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v56.81C146.76 72.52 72.52 146.76 64.81 240H8c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h56.81c7.71 93.24 81.95 167.48 175.19 175.19V504c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-56.81c93.24-7.71 167.48-81.95 175.19-175.19H504c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zM256 416c-88.22 0-160-71.78-160-160S167.78 96 256 96s160 71.78 160 160-71.78 160-160 160zm0-256c-53.02 0-96 42.98-96 96s42.98 96 96 96 96-42.98 96-96-42.98-96-96-96zm0 160c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z"
			/>
		</svg>
	);
};
FaLocation.propTypes = {
	className : PropTypes.string,
};

FaLocation.defaultProps = {
	className : "",
};

export default FaLocation;
