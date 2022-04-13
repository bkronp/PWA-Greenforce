import PropTypes from "prop-types";
import {
	AppBar,
	Toolbar,
	Menu,
	MenuItem,
	Divider,
} from "@material-ui/core";

// Import Own Components
import withStateLoaded from "~/Store/withStateLoaded";
import useStyles       from "./styles";
import {
	Typography,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";

const Header = ({
	delegations : {
		anchorEl,
		handleOpen,
		handleClose,
		routes,
		toAdminHome,
		logOut,
	},
	username,
	userId,
}) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<div className={classes.spacer} />

					<div>
						<Clicker onClick={handleOpen}>
							<Typography
								type="header4"
								className={classes.userName}
							>
								Menú
							</Typography>
						</Clicker>

						<Menu
							id="admin-user-routing-options"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							{ routes.map(({ redirectFn, components }, index) => (
								<MenuItem
									onClick={redirectFn(handleClose)}
									key={index}
								>
									{ components }
								</MenuItem>
							)) }
							<Divider />

							<MenuItem onClick={logOut}>Cerrar Sesión</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<br />
		</div>
	);
};

Header.propTypes = {
	delegations : PropTypes.object.isRequired,
	username    : PropTypes.string,
	userId      : PropTypes.number,
};

Header.defaultProps = {
	username : "",
};

const mapStateToProps = ({ userReducer : { admin } }) => ({
	username : admin?.data?.username,
	userId   : admin?.data?.id,
});

export default withStateLoaded(mapStateToProps)(Header);
