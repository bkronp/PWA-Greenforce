/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable max-len */
import PropTypes    from "prop-types";
import clsx         from "clsx";
import { useState, useEffect } from "react";
import {
	AppBar,
	Toolbar,
	Grid,
	Hidden,
	IconButton,
	Drawer,
	Divider,
	List,
	ListItem,
	useTheme,
	Collapse,
	Menu,
	Fade,
	MenuItem,
	Zoom,
} from "@material-ui/core";
import TwitterIcon 				  from "@material-ui/icons/Twitter";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import MenuIcon  		          from "@material-ui/icons/Menu";
import ListItemText 	          from "@material-ui/core/ListItemText";
import ChevronRightIcon           from "@material-ui/icons/ChevronRight";
// Import Own Components
import {
	Typography,
	ButtonWithoutStyles as Button,
} from "~/ToolKit";
import { FaPhone }      from "~/Resources/icons/fal";
import withStateLoaded  from "~/Store/withStateLoaded";
import logo             from "~/Resources/logo.png";
import FaFacebookSquare from "~/Resources/icons/fab/FaFacebookSquare";
import FaWhatsapp       from "~/Resources/icons/fab/FaWhatsapp";
import useStyles, { FabTooltip }        from "./styles";
import settings         from "~/Server/settings.json";


const Header = ({
	delegations : {
		state,
		anchorEl,
		anchorEl2,
		handleOpen,
		handleClose,
		handleOpen2,
		handleClose2,
		toRouter,
		toggleDrawer,
	},
}) => {
	const classes = useStyles();
	const theme = useTheme();

	const [openSubmenu, setOpenSubmenu] = useState(true);
	const [openFabTooltip, setOpenFabTooltip] = useState(false);

	const handleCloseFabTooltip = () => {
		setOpenFabTooltip(false);
	};

	const handleOpenFabTooltip = () => {
		setOpenFabTooltip(true);
	};

	useEffect(() => {
		setTimeout(() => {
			handleOpenFabTooltip();
			setTimeout(() => {
				handleCloseFabTooltip(false);
			}, 5000);
		}, 1000);
	}, []);

	const handleClick = () => {
		setOpenSubmenu(!openSubmenu);
	};

	const open = Boolean(anchorEl);
	return (
		<div className={classes.root}>
			{/* <Hidden mdUp>
				<div id="google_translate_element" />
			</Hidden> */}
			<AppBar elevation={1} className={classes.appBar}>
				<Toolbar>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center">
						<Grid
							container
							justify="center"
							item
							xs={1}
							style={{ marginLeft : "7px" }}
							className={classes.divContainerdisplay}
						>
							<img className={classes.img} src={logo} alt="Logotipo Progenetic" onClick={toRouter("/")} />
						</Grid>
						<Hidden smDown>
							<Grid
								item
								xs={5}
							 />
							<Grid
								container
								direction="row"
								justify="center"
								alignItems="center"
								item
								xs={2}
							>
								<FaPhone />
								<Typography
									type="header4"
									fontWeight="600"
								>
									 33-31214076
								</Typography>
							</Grid>
							<Grid
								container
								item
								direction="row"
								justify="center"
								alignItems="center"
								xs={2}
							>
								{settings.page.social.facebook ?
									(<a href={settings.page.social.facebook} target="_blank">
										<FaFacebookSquare className={`${classes.icon} ${classes.iconFacebook}`} />
									</a>) : null}
								{settings.page.social.twitter ?
									(<a href={settings.page.social.twitter} target="_blank">
										<TwitterIcon className={`${classes.icon} ${classes.iconTwitter}`} />
									</a>) : null}
								{settings.page.social.whatsapp ?
									(<a href={`https://wa.me/${settings.page.social.whatsapp}`} target="_blank">
										<FaWhatsapp className={`${classes.icon} ${classes.iconWhatsApp}`} />
									</a>) : null}
							</Grid>
							{/* <Grid item xs={2}>
								<div id="google_translate_element" />
							</Grid> */}
						</Hidden>
						<Hidden mdUp>
							<Button
								aria-controls="fade-menu"
								aria-haspopup="true"
								onClick={handleOpen}
								className={classes.button}
							>
								Soluciones
							</Button>

							<Menu
								id="fade-menu"
								anchorEl={anchorEl}
								keepMounted
								open={open}
								getContentAnchorEl={null}
								anchorOrigin={{
									vertical   : "bottom",
									horizontal : "center",
								}}
								transformOrigin={{
									vertical   : "top",
									horizontal : "center",
								}}
								onClose={handleClose}
								TransitionComponent={Fade}
								className={classes.productsMenu}
							>
								<MenuItem onClick={() => {handleOpen2({ currentTarget : null });toRouter("/nutricion-vegetal/1")();}}>
									Nutrición Vegetal
								</MenuItem>
								<MenuItem onClick={() => {handleOpen2({ currentTarget : null });toRouter("/proteccion-cultivos/2")();}}>
									Protección de Cultivos
								</MenuItem>
							</Menu>
							<Button
								aria-controls="fade-menu"
								aria-haspopup="true"
								onClick={toRouter("/contact")}
								className={classes.button}
							>
								Contacto
							</Button>
							<div className={classes.spacer} />
							<IconButton
								aria-label="open drawer"
								edge="end"
								onClick={toggleDrawer(true)}
								className={clsx(open && classes.hide)}
							>
								<MenuIcon />
							</IconButton>

						</Hidden>
					</Grid>
				</Toolbar>
			</AppBar>
			<Hidden smDown>
				<AppBar className={classes.appBarTransparent} style={{ backgroundColor : "rgb(240, 240, 240)" }}>
					<Toolbar className={classes.toolbar}>
						<Grid
							container
							direction="row"
							justify="center"
							alignItems="center"
						>

							<Grid
								container
								item
								xs={12}
								md={10}
								className={classes.divContainerdisplay}
							>

								<Button
									aria-controls="fade-menu"
									aria-haspopup="true"
									onClick={toRouter("/")}
									className={classes.button}
								>
									<Typography
										type="header4"
										fontWeight="600"
										color="white"
										className={classes.menutext}
									>
										INICIO
									</Typography>
								</Button>
								<Button
									aria-controls="fade-menu"
									aria-haspopup="true"
									onClick={toRouter("/about-us")}
									className={classes.button}
								>
									<Typography
										type="header4"
										fontWeight="600"
										color="white"
										className={classes.menutext}
									>
										¿QUIÉNES SOMOS?
									</Typography>
								</Button>
								<Button
									aria-controls="fade-menu"
									aria-haspopup="true"
									onClick={toRouter("/mision-vision")}
									className={classes.button}
								>
									<Typography
										type="header4"
										fontWeight="600"
										color="white"
										className={classes.menutext}
									>
										MISIÓN Y VISIÓN
									</Typography>
								</Button>
								<Button
									aria-controls="fade-menu"
									aria-haspopup="true"
									onClick={handleOpen2}
									className={classes.button}
								>
									<Typography
										type="header4"
										fontWeight="600"
										color="white"
										className={classes.menutext}
									>
										SOLUCIONES
									</Typography>
								</Button>
								<Menu
									id="fade-menu"
									anchorEl={anchorEl2}
									keepMounted
									getContentAnchorEl={null}
									anchorOrigin={{
										vertical   : "bottom",
										horizontal : "center",
									}}
									transformOrigin={{
										vertical   : "top",
										horizontal : "center",
									}}
									open={!!anchorEl2}
									onClose={handleClose2}
									TransitionComponent={Fade}
									className={classes.productsMenu}
								>
									<MenuItem onClick={() => {handleOpen2({ currentTarget : null });toRouter("/nutricion-vegetal/1")();}}>
										Nutrición Vegetal
									</MenuItem>
									<MenuItem onClick={() => {handleOpen2({ currentTarget : null });toRouter("/proteccion-cultivos/2")();}}>
										Protección de Cultivos
									</MenuItem>
								</Menu>
								<Button
									aria-controls="fade-menu"
									aria-haspopup="true"
									onClick={toRouter("/contact")}
									className={classes.button}
								>
									<Typography
										type="header4"
										fontWeight="600"
										color="white"
										className={classes.menutext}
									>
										CONTACTO
									</Typography>
								</Button>
							</Grid>
							<Grid
								container
								item
								xs={2}
								className={classes.divContainerdisplay}
							>
								<IconButton
									aria-label="open drawer"
									edge="end"
									onClick={toggleDrawer(true)}
									className={clsx(open && classes.hide)}
								>
									<MenuIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</Hidden>
			<Drawer
				anchor={"right"}
				open={state}
				onClose={toggleDrawer(false)}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={toggleDrawer(false)}>
						{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button key={"inicio"}>
						<ListItemText
							primary="Inicio"
							onClick={toRouter("/")}
						/>
					</ListItem>
					<Divider />
					{/*	<ListItem button key={"promociones"}>
						<ListItemText primary="Promociones" />
						</ListItem>
					<Divider />*/}
					<ListItem button key={"who"}>
						<ListItemText
							primary="¿Quiénes somos?"
							onClick={toRouter("/about-us")}
						/>
					</ListItem>
					<Divider />
					<ListItem button key={"mision_vision"}>
						<ListItemText
							primary="Misión y Visión"
							onClick={toRouter("/mision-vision")}
						/>
					</ListItem>
					<Divider />
					<ListItem
						button
						key={"solutions"}
						onClick={handleClick}
						style={{ background : openSubmenu ? "rgb(217, 246, 220)" : "" }}
					>
						<ListItemText
							primary="Soluciones"
						/>
						{openSubmenu ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Divider />
					<Collapse in={openSubmenu} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItem button key={"nutrition"}>
								<ListItemText
									primary="Nutrición Vegetal"
									onClick={toRouter("/nutricion-vegetal/1")}
								/>
							</ListItem>
							<Divider />
							<ListItem button key={"protection"}>
								<ListItemText
									primary="Protección de Cultivos"
									onClick={toRouter("/proteccion-cultivos/2")}
								/>
							</ListItem>
						</List>
					</Collapse>
					<Divider />
					<ListItem button key={"contacto"}>
						<ListItemText
							primary="Contacto"
							onClick={toRouter("/contact")}
						/>
					</ListItem>
				</List>
			</Drawer>
			<FabTooltip disableFocusListener disableTouchListener title="Mandanos un mensaje" TransitionComponent={Zoom} arrow
				placement="left" open={openFabTooltip} onClose={handleCloseFabTooltip} onOpen={handleOpenFabTooltip}>
				<a className={classes.whatsappFab} href={`https://wa.me/${settings.page.social.whatsapp}`} target="_blank">
					<FaWhatsapp className={classes.iconWhatsAppFab} />
				</a>
			</FabTooltip>
		</div>
	);
};

Header.propTypes = {
	delegations : PropTypes.shape({
		anchorEl     : PropTypes.any,
		handleOpen   : PropTypes.func,
		handleClose  : PropTypes.func,
		anchorEl2    : PropTypes.any,
		handleOpen2  : PropTypes.func,
		handleClose2 : PropTypes.func,
		logOut       : PropTypes.func,
		toRouter     : PropTypes.func,
		state        : PropTypes.bool,
		toggleDrawer : PropTypes.func,
		list         : PropTypes.any,
		Transition 	 : PropTypes.any,
	}).isRequired,
	loggedIn : PropTypes.bool,
};

Header.defaultProps = {
	loggedIn : false,
};

const mapStateToProps = ({ userReducer : { customer } }) => ({ loggedIn : Boolean(customer) });

export default withStateLoaded(mapStateToProps, null)(Header);
