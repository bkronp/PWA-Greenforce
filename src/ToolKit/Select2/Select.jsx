import PropTypes    from "prop-types";
import TextField    from "@material-ui/core/TextField";
import Typography   from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";

import useStyles from "./styles";

const Select2 = ({
	label,
	options,
	valueSelect,
	className,
	id,
	...rest
}) => {
	const classes = useStyles();

	const defaultProps = {
		options,
		getOptionLabel : (option) => option.name || option.label,
	};

	return (
		<div className={classes.form}>
			{label}
			<Autocomplete
				{...rest}
				className={`${classes.select} ${className}`}
				{...defaultProps}
				id={id}
				selectOnFocus
				value={valueSelect}
				renderOption={(option) => (
					<Typography type="header3">
						<div dangerouslySetInnerHTML={
							{ __html : option.name }
						} />
					</Typography>
				)}
				renderInput={(params) =>
					<TextField
						className={`${classes.select} ${className}`}
						value={"Ok"}
						{...params}
					/>}
			/>
		</div>
	);
};

Select2.propTypes = {
	id          : PropTypes.string.isRequired,
	className   : PropTypes.string,
	label       : PropTypes.any,
	options     : PropTypes.array,
	valueSelect : PropTypes.object,
};

Select2.defaultProps = {
	label       : null,
	className   : "",
	valueSelect : {},
	options     : [],
};

export default Select2;
