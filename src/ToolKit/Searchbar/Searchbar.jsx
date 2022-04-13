import PropTypes    from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
	TextField,
	CircularProgress,
} from "@material-ui/core";

// Import Own Components
import useStyles from "./styles";

const Searchbar = ({
	delegations : {
		open,
		setOpen,
		options,
		loading,
		handleSelection,
		requestDataDebounce,
	},
	formatFn,
	inputProps,
	identifier,
}) => {
	const classes = useStyles();

	return (
		<Autocomplete
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			getOptionSelected={(option, value) => {
				if (option[identifier] === value[identifier]) {
					handleSelection(option);
				}

				return option[identifier] === value[identifier];
			}}
			getOptionLabel={(option) => option[identifier]}
			options={options}
			loading={loading}
			renderOption={formatFn}
			renderInput={(params) => (
				<TextField
					{...params}
					onChange={({ target : { value } }) => requestDataDebounce(value)}
					InputProps={{
						...params.InputProps,
						...inputProps,
						classes : {
							underline : classes.underline,
						},
						className      : `${classes.input} ${inputProps.className}`,
						startAdornment : typeof inputProps.startAdornment === "function"
							? inputProps.startAdornment(loading)
							: inputProps.startAdornment,
						endAdornment : inputProps.endAdornment
							? typeof inputProps.endAdornment === "function"
								? inputProps.endAdornment(loading)
								: inputProps.endAdornment
							: (
								<div className={classes.loadingContainer}>
									{ loading && (
										<CircularProgress
											size={23}
											thickness={4}
											className="loading"
										/>
									) }
								</div>
							),
					}}
				/>
			)}
		/>
	);
};

Searchbar.propTypes = {
	delegations : PropTypes.object.isRequired,
	formatFn    : PropTypes.func,
	inputProps  : PropTypes.object,
	identifier  : PropTypes.string.isRequired,
};

Searchbar.defaultProps = {
	formatFn   : a => a,
	inputProps : {},
};

export default Searchbar;
