/* eslint-disable max-len */
import PropTypes from "prop-types";

const FaTimes = ({ className, style, ...rest }) => (
	<svg
		style={{
			height : "1.5rem",
			width  : "1.5rem",
			...style,
		}}
		className={`svg-inline--fa fa-times fa-w-10 ${className}`}
		aria-hidden="true"
		focusable="false"
		data-prefix="fal"
		data-icon="times"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 320 512"
		data-fa-i2svg=""
		{...rest}
	>
		<path
			fill="currentColor"
			d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
		/>
	</svg>
);

FaTimes.propTypes = {
	className : PropTypes.string,
	style     : PropTypes.object,
};

FaTimes.defaultProps = {
	className : "",
	styles    : {},
};

export default FaTimes;
