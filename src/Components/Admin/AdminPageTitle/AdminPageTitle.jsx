import PropTypes from "prop-types";
import { Grid }  from "@material-ui/core";
// Import Own Components
import { Typography } from "~/ToolKit";
import useStyles      from "./styles";

const AdminPageTitle = ({ title, button : Button }) => {
	const classes = useStyles(Boolean(Button));

	return (
		Button ? (
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
				className={classes.root}
			>
				<Grid item>
					<Typography
						type="header1"
						className={classes.title}
					>
						{title}
					</Typography>
				</Grid>
				<Grid item>
					{Button}
				</Grid>
			</Grid>
		) : (
			<Typography
				type="header1"
				className={classes.title}
			>
				{title}
			</Typography>
		)
	);
};

AdminPageTitle.propTypes = {
	title  : PropTypes.string.isRequired,
	button : PropTypes.node,
};

AdminPageTitle.defaultProps = {
	button : null,
};

export default AdminPageTitle;
