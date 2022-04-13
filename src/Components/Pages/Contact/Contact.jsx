/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable max-len */
import PropTypes from "prop-types";
import {
	Card,
	CardContent,
	Container,
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//import own components
import LayoutPage from "~/Components/Layouts/LayoutPage";
import FaFacebookSquare from "~/Resources/icons/fab/FaFacebookSquare";
import FaWhatsapp from "~/Resources/icons/fab/FaWhatsapp";
import settings from "~/Server/settings.json";

import {
	Button,
	Typography,
} from "~/ToolKit";

import useStyles from "./styles";


const Contact = ({
	delegations: {
		formData,
		handleChange,
		handleSubmitForm,
		Banner,
	},
}) => {

	const contactSchema = yup.object().shape({
		customerName: yup.string().required("Nombre es requerido"),
		email: yup.string().email("El email debe ser valido").required("Email es requerido"),
		telephone: yup.string().required("Teléfono es requerido"),
		product: yup.string().required("Producto es requerido"),
		address: yup.string().required("Domicilio es requerido"),
	});

	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(contactSchema),
	});
	const classes = useStyles();
	return (
		<>
			<LayoutPage title={"Contacto"} container={false} background={Banner}>
				<Container>
					<Grid container>
						<Grid item xs={12} md={7} className={classes.padding}>
							<Typography type="header2" style={{ padding: "1.5rem 0" }}>
								¿Tienes dudas o comentarios?
							</Typography>
							<Card className={classes.root}>
								<CardContent>
									<form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
										<Grid container>
											<Grid item xs={12} md={6}>
												<FormControl fullWidth>
													<TextField
														error={!!errors.customerName}
														inputRef={register}
														required
														name="customerName"
														fullWidth
														variant="outlined"
														id="nombre"
														label="Nombre"
														value={formData?.customerName || ""}
														onChange={handleChange}
														helperText={errors?.customerName?.message}
														className={classes.padding}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={12} md={6}>
												<FormControl fullWidth>
													<TextField
														error={!!errors.email}
														inputRef={register}
														required
														name="email"
														variant="outlined"
														id="nombre"
														label="Email"
														value={formData?.email || ""}
														onChange={handleChange}
														helperText={errors?.email?.message}
														className={classes.padding}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={12} md={6}>
												<FormControl fullWidth>
													<TextField
														error={!!errors.telephone}
														inputRef={register}
														required
														name="telephone"
														variant="outlined"
														id="nombre"
														label="Teléfono"
														value={formData?.telephone || ""}
														onChange={handleChange}
														helperText={errors?.telephone?.message}
														className={classes.padding}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<FormControl fullWidth>
													<TextField
														error={!!errors.product}
														inputRef={register}
														required
														name="product"
														variant="outlined"
														id="nombre"
														label="Producto de interés"
														value={formData?.product || ""}
														onChange={handleChange}
														helperText={errors?.product?.message}
														className={classes.padding}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<FormControl fullWidth>
													<TextField
														error={!!errors.address}
														inputRef={register}
														required
														name="address"
														variant="outlined"
														id="nombre"
														label="Ciudad y País"
														value={formData?.address || ""}
														onChange={handleChange}
														helperText={errors?.address?.message}
														className={classes.padding}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<FormControl fullWidth>
													<TextField
														name="message"
														variant="outlined"
														id="nombre"
														label="Comentarios"
														multiline
														rows={4}
														value={formData?.message || ""}
														onChange={handleChange}
														className={classes.padding}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<FormControl fullWidth component="fieldset">
													<RadioGroup onChange={handleChange} aria-label="customer type" name="customerType">
														<FormControlLabel
															control={<Radio />}
															label="Soy agricultor"
															value="emprendedor"
														/>
														<FormControlLabel
															value="negocio propio"
															control={<Radio />}
															label="Soy distribuidor" />
													</RadioGroup>
												</FormControl>
											</Grid>
										</Grid>
										<Grid container>
											<Grid item xs={12}>
												<Button type="submit" grow color="primary" className={classes.btn}>
													Enviar
												</Button>
											</Grid>
										</Grid>
									</form>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={5} className={classes.padding}>
							<Typography type="header2" style={{ padding: "1.5rem 0" }}>
								Formas de contacto
							</Typography>
							<Card className={classes.root}>
								<CardContent>
									<Typography type="body2" color="primary">
										Teléfonos
									</Typography>
									<Typography type="caption">
										<a href="tel:+3334405552">(33) 34405552</a>
									</Typography>
									{/* <Typography type="caption">
										<a href="tel:+3334405552">(33) 34405552</a>
									</Typography> */}
									<br />
									<Typography type="body2" color="primary">
										Redes Sociales
									</Typography>
									<Grid
										item
										container
										direction="row"
										xs={12}
									>
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
									</Grid>
								</CardContent>
							</Card>
							<Card className={classes.root} style={{ marginTop: "1rem" }}>
								<Typography type="body1" color="primary">
									Oficina Matriz
								</Typography>
								<Typography type="caption">
									Av de los Pirules, 111-A Cd Granja, Zapopan JAL
								</Typography>
								<br />
								<Typography type="caption">
									<a href="tel:+3334405552">(33) 34405552</a>
								</Typography>
								{/* <Typography type="caption">
									<a href="tel:+3331224155">(33) 31224155</a>
								</Typography> */}
								<Grid item xs={12} style={{ width: "100%", overflow: "hidden", height: "368px" }}>
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.5899938091516!2d-103.44988238507311!3d20.68625318618496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428aecb9ab6e777%3A0x614f0ccfaac6cf3f!2sPirules%20111%2C%20Granja%2C%2045010%20Zapopan%2C%20Jal.!5e0!3m2!1ses-419!2smx!4v1649773958936!5m2!1ses-419!2smx"
										width="100%"
										height="500"
										frameBorder="0"
										allowFullScreen=""
										aria-hidden="false"
										tabIndex="0"
										scrolling="no"
										marginHeight="0"
										marginWidth="0"
										style={{ border: "0", marginTop: "-130px" }} />
								</Grid>
							</Card>
							{/* <Card className={classes.root} style={{ marginTop : "1rem" }}>
								<Typography type="body1" color="primary">
									Centro de distribución Zapotiltic
								</Typography>
								<Typography type="caption">
									Km. 2 Carretera Zapotiltic – Mirador, Zapotiltic, Jalisco, C.P.49600.
								</Typography>
								<br />
								<Typography type="caption">
									<a href="tel:+3414144257">(341) 414-4257</a>
								</Typography>
								<Grid item xs={12} style={{ width : "100%", overflow : "hidden", height : "368px" }}>
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15031.113561352817!2d-103.39692413967285!3d19.6367698816545!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f857de9d99cb1%3A0x9b4a5143fe42872e!2sPROGENETIC%20-%20CENTRO%20DE%20DISTRIBUCI%C3%93N%20-%20ZAPOTILTIC!5e0!3m2!1ses-419!2smx!4v1615192416800!5m2!1ses-419!2smx"
										width="100%"
										height="500"
										frameBorder="0"
										allowFullScreen=""
										aria-hidden="false"
										tabIndex="0"
										scrolling="no"
										marginHeight="0"
										marginWidth="0"
										style={{ border : "0", marginTop : "-130px" }}  />
								</Grid>
							</Card> */}

						</Grid>
					</Grid>
				</Container>
			</LayoutPage>
		</>
	);
};


Contact.propTypes = {
	delegations: PropTypes.object.isRequired,
};

export default Contact;
