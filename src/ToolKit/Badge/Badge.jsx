import PropTypes  from "prop-types";
import Badge      from "@material-ui/core/Badge";

import useStyles  from "./styles";

const DotBadge = ({ numNotification, icon, className  }) => {
	const classes = useStyles();

	return (
		<div className={classes.root, className}>
			<Badge
				className={classes.badge}
				badgeContent={numNotification}
				max={9}
			>
				{icon}
			</Badge>
		</div>
	);
};

DotBadge.propTypes = {
	numNotification : PropTypes.number.isRequired,
	className       : PropTypes.string,
	icon            : PropTypes.any,
};

DotBadge.defaultProps = {
	numNotification : 0,
};

export default DotBadge;
