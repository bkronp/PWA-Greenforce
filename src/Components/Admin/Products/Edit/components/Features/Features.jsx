/* eslint-disable camelcase */
import { Fragment, useState, useCallback } from "react";
import PropTypes              from "prop-types";
import {
	Grid,
	Divider,
	TextareaAutosize,
} from "@material-ui/core";

// Import Own Components
import {
	ButtonWithoutStyles as Clicker,
	Select2,
	Typography,
} from "~/ToolKit";
import useStyles from "./styles";

const Features = ({
	delegations : {
		featuresData,
		features,
		handleDelete,
		handleSelection,
		handleLabelChange,
	},
}) => {
	const classes     = useStyles();
	const [featureSelected, setFeatureSelected] = useState();
	const handleSelect = useCallback(name => (evnt, newInputValue) => {
		setFeatureSelected(newInputValue);
		handleSelection(newInputValue);
	}, [handleSelection]);

	return (
		<div className={classes.features}>
			<Grid container spacing={3} alignItems="center">
				<Grid item xs={12}>
					<Select2
						label={
							<Typography>
								Caracteristícas
							</Typography>
						}
						id="feature"
						name="feature"
						options={featuresData}
						onChange={handleSelect("feature")}
						valueSelect={featureSelected}
					/>
				</Grid>
			</Grid>

			<Divider />

			{
				(features && features.length > 0) &&
				features.map(({ id, name, label }, position) => (
					<Fragment key={id}>
						<Grid container spacing={3}>
							<Grid
								item
								xs={6}
							>
								<span className="feat-title">{`Caracteristica ${position + 1}`}</span>
							</Grid>
							<Grid
								item
								xs={6}
								className="delete-feat"
							>
								<Clicker onClick={() => handleDelete(position)}>
									Eliminar
								</Clicker>
							</Grid>

							<Grid item xs={4}>
								<Typography type="header3">
									<div dangerouslySetInnerHTML={
										{ __html : name }
									} />
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<TextareaAutosize
									id="outlined-secondary"
									variant="outlined"
									color="secondary"
									onChange={e => handleLabelChange(position, e?.target?.value)}
									value={label}
									style={{
										width        : "100%",
										minHeight    : "5rem",
										borderRadius : "6px",
									}}
								/>
							</Grid>
						</Grid>

						{ position + 1 !== features?.length && (
							<Divider />
						) }
					</Fragment>
				))
			}
		</div>
	);
};

Features.propTypes = {
	delegations : PropTypes.shape({
		features               : PropTypes.array.isRequired,
		handleDelete           : PropTypes.func.isRequired,
		handleSelection        : PropTypes.func.isRequired,
		handleLabelChange      : PropTypes.func.isRequired,
		handleCreateNewFeature : PropTypes.func.isRequired,
		isAdmin                : PropTypes.bool.isRequired,
		featuresData           : PropTypes.object.isRequired,
	}).isRequired,
};

export default Features;
