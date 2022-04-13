/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-target-blank */
import { useCallback } from "react";
import { useRouter }   from "next/router";
import {
	Grid,
	List,
	ListItemText,
	Hidden,
} from "@material-ui/core";
import TwitterIcon 		from "@material-ui/icons/Twitter";
// Import Own Components
import {
	Typography,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit/";

import ssl              from "~/Resources/ssl.png";
import GrayLogo         from "~/Resources/img/gray_logo.png";
import FaFacebookSquare from "~/Resources/icons/fab/FaFacebookSquare";
import FaWhatsapp       from "~/Resources/icons/fab/FaWhatsapp";
import FaEnvelope       from "~/Resources/icons/fal/FaEnvelope";
import useStyles        from "./styles";
import settings         from "~/Server/settings.json";

const Footer = () => {
	const classes = useStyles();
	const router  = useRouter();

	const toRouter = useCallback(url =>() => {
		router.push(url);
	}, [router]);

	return (
		<>
			<div className={classes.footer}>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					alignContent="center"
					style={{ padding : "1rem" }}
				>
					<Hidden mdDown>
						<Grid
							container
							item
							sm={2}
							direction="row"
						>
							<Grid
								item
								xs={12}
								container
								justify="center"
							>
								<img
									className={classes.figureLeft}
									src={GrayLogo}
									alt="Progenetic Logo"
								/>
							</Grid>
						</Grid>
					</Hidden>
					<Grid
						container
						item
						direction="row"
						justify="center"
						md={12}
						lg={8}
					>
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
						>
							<Typography
								color="white"
								type="header3"
								style={{ padding : "1px 6px" }}
							>
								Links de interés
							</Typography>
							<Hidden smDown>
								<List>
									<Clicker onClick={toRouter("/about-us")}>
										<ListItemText
											secondary="¿Quiénes somos?"
										/>
									</Clicker>
									<br />
									<Clicker onClick={toRouter("/mision-vision")}>
										<ListItemText
											secondary="Misión y Visión"
										/>
									</Clicker>
								</List>
							</Hidden>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
						>
							<Typography
								color="white"
								type="header3"
								style={{ padding : "1px 6px" }}
								onClick={toRouter("/nutricion-vegetal/1")}
							>
								COMPO EXPERT</Typography>
							{/* <Hidden smDown>
								<List component="div">
									<ListItem button className={classes.listLinks}
										onClick={toRouter("/nutricion-vegetal/1#3")}>
										<ListItemText
											primary="Fertilizantes de Liberación Controlada"
										/>
									</ListItem>
									<ListItem button className={classes.listLinks}
										onClick={toRouter("/nutricion-vegetal/1#4")}>
										<ListItemText
											primary="Fertilizantes Granulados y Estabilizados"
										/>
									</ListItem>
									<ListItem button className={classes.listLinks}
										onClick={toRouter("/nutricion-vegetal/1#5")}>
										<ListItemText
											primary="Fertilizantes Líquidos, Foliares y Bioestimulantes"
										/>
									</ListItem>
									<ListItem button className={classes.listLinks}
										onClick={toRouter("/nutricion-vegetal/1#6")}>
										<ListItemText
											primary="Fertilizantes para Áreas Verdes y Campos Deportivos"
										/>
									</ListItem>
									<ListItem button className={classes.listLinks}
										onClick={toRouter("/nutricion-vegetal/1#7")}>
										<ListItemText
											primary="Fertilizantes Solubles"
										/>
									</ListItem>
									<ListItem button className={classes.listLinks}
										onClick={toRouter("/nutricion-vegetal/1#8")}>
										<ListItemText
											primary="Fertilizantes Solubles Estabilizados"
										/>
									</ListItem>
								</List>
							</Hidden> */}
							<Typography
								color="white"
								type="header3"
								style={{ padding : "1px 6px" }}
								onClick={toRouter("/proteccion-cultivos/2")}
							>
								PROVIVI</Typography>
							{/* <List>
								<Clicker onClick={toRouter("/proteccion-cultivos/2")}>
									<ListItemText
										secondary=""
									/>
								</Clicker>
							</List> */}
						</Grid>
						<Grid
							item
							xs={12}
							md={4}
							container
						>
							<Grid
								item
								xs={12}
								sm={6}
								md={12}
							>
								<Typography
									color="white"
									type="header3"
									style={{ padding : "1px 6px" }}
								>
									Contacto</Typography>
								<br />
								{settings.page.social.facebook ?
									(<a href={settings.page.social.facebook} target="_blank">
										<FaFacebookSquare className={`${classes.icon}`} />
									</a>) : null}
								{settings.page.social.twitter ?
									(<a href={settings.page.social.twitter} target="_blank">
										<TwitterIcon className={`${classes.icon}`} />
									</a>) : null}
								{settings.page.social.whatsapp ?
									(<a href={`https://wa.me/${settings.page.social.whatsapp}`} target="_blank">
										<FaWhatsapp className={`${classes.icon}`} />
									</a>) : null}
								<a href="/contact" target="">
									<FaEnvelope className={classes.icon} />
								</a>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								md={12}
							>
								<Typography
									color="white"
									type="header3"
									style={{ padding : "1px 6px" }}
								>
									Contamos con certificación SSL</Typography>
								<br />
								<img src={ssl} />
							</Grid>
						</Grid>
					</Grid>
					<Hidden mdDown>
						<Grid
							container
							item
							sm={2}
							direction="row"
						>
							<Grid
								item
								xs={12}
								container
								justify="center"
							>
								{/* <img
									className={classes.figureRigth}
									src={diosaFertilidad}
									alt="Diosa fertilidad"
								/> */}
							</Grid>
						</Grid>
					</Hidden>
				</Grid>
			</div>
			<div className={classes.footer2}>
				<Grid
					container
					item
					sm={12}
					justify="center"
				>
					<Typography
						color="white"
						style={{ padding : "1px 6px" }}
						type="header4"
					>
						Todos los derechos reservados.
					</Typography>
					<Typography
						color="white"
						style={{ padding : "1px 6px" }}
						type="header4"
					>
						&nbsp; Progenetic® 2021.
					</Typography>
				</Grid>
			</div>
			<style jsx global>{`
				.MuiTypography-colorTextSecondary {
					color: rgb(255 255 255)!important;
				}
			`}</style>
		</>
	);
};

export default Footer;
