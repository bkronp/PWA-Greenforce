/* eslint-disable max-len */
import PropTypes from "prop-types";

const FaSignInAlt = ({ className, ...rest }) => (
	<svg
		style={{
			height : "1rem",
			width  : "1.5rem",
		}}
		className={`svg-inline--fa fa-sign-in-alt fa-w-16 ${className}`}
		aria-hidden="true"
		focusable="false"
		data-prefix="far"
		data-icon="sign-in-alt"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		data-fa-i2svg=""
		{...rest}
	>
		<path
			fill="currentColor"
			d="M144 112v51.6H48c-26.5 0-48 21.5-48 48v88.6c0 26.5 21.5 48 48 48h96v51.6c0 42.6 51.7 64.2 81.9 33.9l144-143.9c18.7-18.7 18.7-49.1 0-67.9l-144-144C195.8 48 144 69.3 144 112zm192 144L192 400v-99.7H48v-88.6h144V112l144 144zm80 192h-84c-6.6 0-12-5.4-12-12v-24c0-6.6 5.4-12 12-12h84c26.5 0 48-21.5 48-48V160c0-26.5-21.5-48-48-48h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96z"
		/>
	</svg>
);

FaSignInAlt.propTypes = {
	className : PropTypes.string,
};

FaSignInAlt.defaultProps = {
	className : "",
};

export default FaSignInAlt;
