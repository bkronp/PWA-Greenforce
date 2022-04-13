import PropTypes     from "prop-types";

import { Typography } from "~/ToolKit";
import useStyles from "./styles";

const BlueBar = ({ text }) => {
	const classes = useStyles();

	return (<>
		<Typography type="header2" fontWeight="600" className={classes.root}>
			{text}
		</Typography>
	</>);
};

BlueBar.propTypes = {
	text : PropTypes.text,
};

export default BlueBar;
