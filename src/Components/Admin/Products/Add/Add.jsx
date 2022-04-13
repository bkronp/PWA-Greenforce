import PropTypes from "prop-types";
import {
	Grid,
	FormControl,
	Paper,
	TextareaAutosize,
} from "@material-ui/core";

// Import Own Components
import {
	Typography,
	Input,
	Select2,
	ButtonWithoutStyles as Clicker,
	MultiSelect,
	Button,
} from "~/ToolKit";

import { FaSale }   from "~/Resources/icons/fal";
import AddImage     from "./components/AddImage";
import ProductImage from "./components/ProductImage";
import Features     from "./components/Features";

import useStyles    from "./styles";

const Add = ({
	delegations : {
		data,
		catalogues,
		dataImg,
		handleChange,
		handleSelect,
		handleOnOffer,
		handleMultiSelect,
		setFeatures,
		dataFeatures,
		setDataImg,
		btn,
		handleSubmit,
		handleChangeDataSheet,
	},
}) => {
	const classes = useStyles();

	return (
		<Grid
			container
			justify="center"
			item
			xs={12}
		>
			<Paper variant="outlined" className={classes.paperPadding}>
				<FormControl className={classes.formControl}>
					<Grid
						container
						direction="row"
						justify="flex-start"
						alignItems="center"
					>
						<Grid
							item
							xs={12}
							md={6}
						>
							<Input
								label={
									<Typography>
										* Nombre del producto
									</Typography>
								}
								id="name"
								variant="outlined"
								name="name"
								value={data.name}
								onChange={handleChange("name")}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							container
							justify="center"
							alignContent="center"
						>
							<Clicker onClick={handleOnOffer}>
								{ data.on_offer ? "Quitar oferta " : "Marcar en oferta " }
								<FaSale styles={{ height : "1rem !important" }} />
							</Clicker>
						</Grid>
						<Grid
							item
							xs={12}
						>
							* Descripción
							<TextareaAutosize
								id="outlined-secondary"
								variant="outlined"
								color="secondary"
								onChange={handleChange("description")}
								value={data?.description}
								style={{
									width        : "100%",
									minHeight    : "5rem",
									borderRadius : "6px",
								}}
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<Select2
								label={
									<Typography>
										* Categoría
									</Typography>
								}
								id="category"
								name="category"
								options={catalogues?.categories}
								onChange={handleSelect("category")}
								valueSelect={data?.category}
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<Select2
								label={
									<Typography>
										Presentación
									</Typography>
								}
								id="presentation"
								name="presentation"
								options={catalogues?.presentations}
								onChange={handleSelect("presentation")}
								valueSelect={data?.presentation}
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<Select2
								label={
									<Typography>
										Que Produce
									</Typography>
								}
								id="yields"
								name="yields"
								options={catalogues?.yields}
								onChange={handleSelect("yields")}
								valueSelect={data?.yields}
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<MultiSelect
								label="Tipo de producción"
								id="producción"
								name="producción"
								options={catalogues?.yield_presentations}
								valueSelect={data?.yield_presentations}
								onChange={handleMultiSelect("yield_presentations")}
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<MultiSelect
								label="Patentes"
								id="producción"
								name="producción"
								options={catalogues?.patents}
								valueSelect={data?.patents}
								onChange={handleMultiSelect("patents")}
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<MultiSelect
								label="Productos relacionados u Accesorios"
								id="products_related"
								name="products_related"
								options={catalogues?.products_related}
								valueSelect={data?.products_related}
								onChange={handleMultiSelect("products_related")}
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<div className={classes.images}>
								{ dataImg?.images?.length < 5 && (
									<AddImage delegations={{
										dataImg,
										setDataImg,
									}} />
								)}
								{ dataImg?.images?.map(({ src }, id) => (
									<ProductImage
										src={src}
										key={id}
										position={id}
										delegations={{
											dataImg,
											setDataImg,
										}}
									/>
								)) }

							</div>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<Input
								label={
									<Typography>
										* Youtube Link
									</Typography>
								}
								id="youtube_link"
								variant="outlined"
								name="youtube_link"
								value={data.youtube_link}
								onChange={handleChange("youtube_link")}
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<Input
								label={
									<Typography>
										Ficha Técnica
									</Typography>
								}
								id="datasheet"
								variant="outlined"
								name="datasheet"
								type="file"
								accept="application/pdf"
								onChange={handleChangeDataSheet("datasheet")}
							/>
						</Grid>
						<Grid xs={12}>
							<Features
								featuresData={catalogues?.features}
								dataFeatures={dataFeatures}
								setFeatures={setFeatures}
							/>
						</Grid>
						<Grid>
							<Button
								type="submit"
								color="primary"
								grow
								//disabled={!btn}
								className={classes.button}
								onClick={handleSubmit}
							>
								Guardar
							</Button>
						</Grid>
					</Grid>
				</FormControl>
			</Paper>
		</Grid>
	);
};

Add.propTypes = {
	delegations : PropTypes.object,
};

export default Add;
