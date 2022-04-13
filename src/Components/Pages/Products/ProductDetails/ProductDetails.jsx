/* eslint-disable max-len */
import { useCallback } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
	Grid,
	Tabs,
	Tab,
	Paper,
	Divider,
	Card,
	CardContent,
	CardActions,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
} from "@material-ui/core";

import Quotation from "~/Components/Quotation";
import LayoutPage from "~/Components/Layouts/LayoutPage";
import GalleryCarousel from "~/Components/GalleryCarousel";
import {
	Typography,
	Button
} from "~/ToolKit";
import { SWR } from "~/Util";
import useStyles from "./styles";
import { slug } from "~/Util/ApiHelpers";

const ProductDetail = ({
	delegations: {
		tabs,
		tabValue,
		params,
		handleChange,
		downloadDataSheet,
		banner,
	},
}) => {
	const classes = useStyles();
	const router = useRouter();

	const toRouter = useCallback(url => () => {
		router.push(url);
	}, [router]);

	return (<>
		<SWR
			url={`/api/products/details/${params.productId}`}
		>
			{(data) => (
				<LayoutPage
					subtitle=""
					background={banner[params.categoryId]}
				>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="stretch"
					>
						<Grid
							item
							xs={12}
							style={{ padding: "1rem" }}
						>
							<div className={classes.titleContainer}>
								<Typography color="primary" type="title">
									{data.name}
								</Typography>
							</div>
							<Typography type="header3">
								{data.category}
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							md={7}
							lg={8}
							alignContent="center"
							alignItems="center"
							style={{ padding: "1rem" }}
						>
							<Paper className={classes.gallery}>
								<GalleryCarousel images={data.images} />
							</Paper>
						</Grid>
						<Grid
							item
							xs={12}
							md={5}
							lg={4}
							style={{ padding: "1rem" }}
						>
							<Card className={classes.paper}>
								<CardContent className={classes.CardContent}>
									<Typography type="header3">
										{data.presentation}
									</Typography>
									{data.on_offer === 1 &&
										<Typography type="caption" color="secondary">
											Este producto esta en oferta
										</Typography>}
									<Divider style={{ margin: "1rem 0" }} />
									<pre type="body2" style={{ whiteSpace: "pre-wrap" }}>
										{data.description}
									</pre>
									<div /><br />
									{data.patents?.length > 0 && <>
										<Typography type="body2">
											Patentes :
										</Typography>
										<ul>
											{data.patents.map(item =>
												<li key={item.id}>
													<Typography type="caption">
														{item.name}
													</Typography>
												</li>
											)}
										</ul>
									</>}
								</CardContent>
								<CardActions>
									<Grid
										direction="column"
										justify="center"
										alignItems="center"
										spacing={2}>
										{/* <Quotation product={data} /> */}
										<Grid
											container
											item
											xs={12}
											justify="center"
											alignItems="center"
										>
											<Grid item >
												<Button
													className={classes.btnProducto}
													color="primary"
													onClick={() => downloadDataSheet(data.datasheet_file_id)}
												>
													Descargar ficha técnica
												</Button>
											</Grid>
										</Grid>
									</Grid>
								</CardActions>
							</Card>
						</Grid>
						<Grid
							item
							xs={12}
							style={{ padding: "1rem" }}
						>
							<Paper className={classes.paper}>
								<Tabs
									value={tabValue}
									onChange={handleChange}
									indicatorColor={"primary"}
									aria-label="Table tabs"
									className={classes.tabs}
									classes={{
										indicator: classes.indicator,
									}}
								>
									{tabs.map(({ label }, index) => (
										<Tab
											key={index}
											label={label}
											className={classes.tab}
										/>
									))}
								</Tabs>
								<Divider />
								{tabValue === 0 &&
									<Grid>
										<TableContainer className={classes.tableContainer}>
											<Table className={classes.table} aria-label="customized table">
												{data.features?.length > 0 &&
													<TableBody>
														{data.features.map((feature) => (
															<TableRow key={feature.name}>
																<TableCell
																	component="th"
																	scope="row"
																	className={classes.tableCell}>
																	<div dangerouslySetInnerHTML={
																		{ __html: feature.name }
																	} />
																</TableCell>
																<TableCell
																	component="th"
																	scope="row"
																	className={classes.tableCell}>
																	{/* dangerouslySetInnerHTML={
																	{ __html : feature.label }
																} */}
																	{feature.label}
																</TableCell>
															</TableRow>
														))}
													</TableBody>}
											</Table>
										</TableContainer>
									</Grid>}
							</Paper>
						</Grid>
						{data.products_related.length > 0 && (
							<>
								<Grid
									item
									xs={12}
									style={{ padding: "1rem" }}
								>
									<Typography type="header2">
										Complementos Adicionales
									</Typography>
									<Grid
										item
										xs={12}
										container
										direction="row"
									>
										{data.products_related.map((productRelated) => (
											<Grid
												item
												xs={12}
												sm={6}
												md={4}
												key={productRelated.id}
												className={classes.productRelatedContainer}
											>
												<Paper
													className={classes.papperProductRelated}
													onClick={toRouter(`/products/${slug(productRelated.category)}/${slug(productRelated.name)}/${productRelated.product_related_id}`)}
												>
													<Grid
														container
														justify="space-around"
														direction="row"
														className={classes.productRelated}
													>
														<Grid item>
															<img
																src={productRelated.image}
																alt={productRelated.name}
																className={classes.imageProductRelated}
															/>
														</Grid>
														<Grid>
															<Typography
																className={classes.typografyProductRelated}
																type="header5"
															>
																{`${productRelated.name} ${productRelated.presentation || ""}`}
															</Typography>
														</Grid>
													</Grid>
												</Paper>
											</Grid>
										))}
									</Grid>
								</Grid>
							</>
						)}
					</Grid>
				</LayoutPage>
			)}
		</SWR>
	</>
	);
};

ProductDetail.propTypes = {
	delegations: PropTypes.shape({
		tabs: PropTypes.array.isRequired,
		tabValue: PropTypes.number.isRequired,
		params: PropTypes.object.isRequired,
		responsivePropsOrders: PropTypes.object.isRequired,
		handleChange: PropTypes.func.isRequired,
		downloadDataSheet: PropTypes.func.isRequired,
		banner: PropTypes.object.isRequired,
	}).isRequired,
};

export default ProductDetail;
