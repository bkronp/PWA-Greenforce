/* eslint-disable max-len */
/* eslint-disable camelcase */
import {
	Grid,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogActions,
	Divider,
	Card,
	CardMedia,
	FormControl,
	Container,
	TextField,
	AppBar,
	Toolbar,
	IconButton,
	Switch,
} from "@material-ui/core";
import PropTypes       from "prop-types";
import Fade            from "react-reveal/Fade";
import { useForm }     from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup        from "yup";

// Import Own Components
// eslint-disable-next-line no-unused-vars
import {
	Button,
	Typography,
} from "~/ToolKit";
import useStyles from "./styles";


const Quotation = ({
	delegations : {
		formData,
		product,
		fullScreen,
		open,
		handleClickOpen,
		handleClickClose,
		handleChange,
		handleSubmitForm,
		handleChangEexchageCurrency,
	},
}) => {
	const classes = useStyles();

	const contactSchema = yup.object().shape({
		customer_name      : yup.string().required("Nombre es requerido"),
		customer_email     : yup.string().email("El email debe ser valido").required("Email es requerido"),
		customer_telephone : yup.string().required("Teléfono es requerido"),
		address            : yup.string().required("Domicilio es requerido"),
	  });

	const { register, handleSubmit, errors } = useForm({
		mode     : "onBlur",
		resolver : yupResolver(contactSchema),
	});
	return (
		<>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
			>
				<Grid item>
					<Button
						className={classes.btnProducto}
						color="primary"
						onClick={handleClickOpen}
					>
						Solicita cotización
					</Button>
				</Grid>
			</Grid>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClickClose}
				aria-labelledby="responsive-dialog-title"
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClickClose} aria-label="close">
							X
						</IconButton>
						<Typography
							type="header2"
							color="white"
							fontWeight="400"
						>
							Cotización: {product?.name} ({product?.presentation})
						</Typography>
					</Toolbar>
				</AppBar>
				<Divider />
				<DialogContent>
					<Container>
						<DialogContentText>
							<Grid container>
								<Grid item xs={12} sm={6} md={5} style={{ padding : "1rem" }}>
									<Card style={{ marginRight : "1rem", width : "300px" }}>
										<CardMedia
											component="img"
											alt=""
											image={product?.images[0].md}
											title=""
											style={{ objectFit : "cover" }}
										/>
									</Card>
								</Grid>
								<Grid item xs={12} sm={6} md={7} style={{ padding : "1rem" }}>
									<Typography
										type="header3"
										fontWeight="600"
										style={{ paddingBottom : "1rem" }}
									>
										{product?.category}
									</Typography>
									{product?.features != undefined && product?.features.length > 0 &&
										product?.features.map((item) =>
											<div key={item.id} style={{ display : "flex" }}>
												<div>
													<Typography type="caption" fontWeight="600">
														<div
															dangerouslySetInnerHTML={
																{ __html : `${item.name}:` }
															} />
													</Typography>
												</div>
												<Fade>
													<Typography type="caption">
														&nbsp;&nbsp;{item.label}
													</Typography>
												</Fade>
											</div>
										)}
								</Grid>
								<Grid item xs={12} style={{ padding : "2rem 0.5rem" }}>
									<Typography type="header3">
										Ingresa tus datos para poder recibir información
									</Typography>
								</Grid>
							</Grid>
							<form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
								<Grid container>
									<Grid item xs={12} md={6}>
										<FormControl fullWidth>
											<TextField
												error={!! errors.customer_name}
												inputRef={register}
												required
												name="customer_name"
												variant="outlined"
												id="customer_name"
												label="Nombre"
												type="email"
												value={formData?.customer_name || ""}
												onChange={handleChange}
												helperText= {errors?.customer_name?.message}
												className={classes.padding}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={12} md={6}>
										<FormControl fullWidth>
											<TextField
												error={!! errors.email}
												inputRef={register}
												required
												name="customer_email"
												variant="outlined"
												id="customer_email"
												label="Email"
												type="email"
												value={formData?.customer_email || ""}
												onChange={handleChange}
												helperText= {errors?.customer_email?.message}
												className={classes.padding}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={12} md={6}>
										<FormControl fullWidth>
											<TextField
												error={!! errors.telephone}
												inputRef={register}
												required
												name="customer_telephone"
												variant="outlined"
												id="customer_telephone"
												label="Teléfono"
												value={formData?.customer_telephone || ""}
												onChange={handleChange}
												helperText= {errors?.customer_telephone?.message}
												className={classes.padding}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={12} md={6}>
										<FormControl fullWidth>
											<TextField
												error={!! errors.address}
												inputRef={register}
												required
												name="address"
												variant="outlined"
												id="nombre"
												label="Región donde se ubica tu cultivo"
												placeholder="Ejemplo: Zamora, Michoacán"
												value={formData?.address || ""}
												onChange={handleChange}
												helperText= {errors?.address?.message}
												className={classes.padding}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={12} md={6} className={classes.padding}>
										<Typography>Cotización en: </Typography>
										<Typography component="div">
											<Grid component="label" container alignItems="center" spacing={1}>
												<Grid item>DLL</Grid>
												<Grid item>
													<Switch
														focusVisibleClassName={classes.focusVisible}
														disableRipple
														className={{
															root       : classes.root2,
															switchBase : classes.switchBase,
															thumb      : classes.thumb,
															track      : classes.track,
															checked    : classes.checked,
														}}
														onChange={handleChangEexchageCurrency}
														name="checked"
														checked={formData.exchage_currency}
													/>
												</Grid>
												<Grid item>MNX</Grid>
											</Grid>
										</Typography>
									</Grid>
								</Grid>
							</form>
						</DialogContentText>
					</Container>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button
						onClick={handleClickClose}
						variant="outlined"
						color="white"
						grow=""
						className=""
						textColor=""
					>
						Cerrar
					</Button>
					<Grid container>
						<Grid item xs={12}>
							<Button
								type="submit"
								color="primary"
								className={classes.btn}
								onClick={handleSubmitForm}
							>
								Enviar
							</Button>
						</Grid>
					</Grid>
				</DialogActions>
				<style jsx global>{`
					.MuiSwitch-thumb {
						width: 20px;
						height: 20px;
						box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
						border-radius: 50%;
						background-color: currentColor;
						margin-bottom: 0.6rem;
					}
				`}
				</style>
			</Dialog>
		</>
	);
};

Quotation.propTypes = {
	delegations : PropTypes.object.isRequired,
};

Quotation.defaultProps = {

};

export default Quotation;
