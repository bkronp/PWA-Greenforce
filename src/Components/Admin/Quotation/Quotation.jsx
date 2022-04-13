/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable camelcase */
import { useMemo }   from "react";
import PropTypes     from "prop-types";
import {
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableFooter,
	TablePagination,
	Tabs,
	Tab,
	Divider,
	Table,
	Paper,
	Grid,
	Chip,
	IconButton,
} from "@material-ui/core";
//import { useRouter } from "next/router";

// Import Own Compoents
import AdminPageTitle from "~/Components/Admin/AdminPageTitle";
import {
	Button,
	Typography,
} from "~/ToolKit";
import {
	FaFilePDF,
	FaFileEdit,
} from "~/Resources/icons/fal";
import BtnAssign     from "~/Components/Admin/Quotation/BtnAssign";
import BtnCanceled  from "~/Components/Admin/Quotation/BtnCanceled";
import useStyles     from "./styles";

const Quotation = ({
	delegations : {
		goToAddProduct,
		handleChange,
		label,
		color,
		handleChangePage,
		handleChangeRowsPerPage,
		tableData : {
			rowsData,
			pagination,
		},
		page,
		tabValue,
		rowsPerPage,
		columns,
		employee,
		setFlag,
		flag,
	},
}) => {
	//const router  = useRouter();
	const classes = useStyles();

	const tabs = useMemo(() => [
		{
			label : "Nuevas Cotizaciones",
		},
		{
			label : "Asiganadas",
		},
		{
			label : "Atendidas",
		},
		{
			label : "Canceladas",
		},
		{
			label : "Todas",
		},
	], []);

	return (
		<>
			<AdminPageTitle
				title="Cotizaciones"
				button={(
					<Button
						className={classes.btn}
						color="primary"
					>
						{"Agregar cotización"}
					</Button>
				)}
			/>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="stretch"
			>
				<Grid xs={12}>
					<Paper>
						<Tabs
							value={tabs}
							onChange={handleChange}
							indicatorColor={"primary"}
							aria-label="Table tabs"
							className={classes.tabs}
							classes={{
								indicator : classes.indicator,
							}}
						>
							{ tabs.map(({ label }, index) => (
								<Tab
									key={label + index}
									label={label}
									className={classes.tabs}
								/>
							)) }
						</Tabs>
						<Divider />
						<Table className={classes.table} aria-label="caption table">
							{(Array.isArray(rowsData) && rowsData.length > 0) && ( <>
								<TableHead>
									<TableRow>
										{
											columns.map(item =>
												<TableCell key={item.field}>{item.title}</TableCell>
											)
										}
									</TableRow>
								</TableHead>
								<TableBody>
									{rowsData.map((row, index) => (
										<TableRow key={row.id}
										>
											<TableCell component="th" scope="row">
												<Typography type="caption">
													{row.code}
												</Typography>
											</TableCell>
											<TableCell component="th" scope="row">
												<Typography type="caption">
													{row.date}
												</Typography>
											</TableCell>
											<TableCell component="th" scope="row">
												<Typography type="caption">
													{row.customer_name}
												</Typography>
											</TableCell>
											<TableCell component="th" scope="row">
												<Typography type="caption">
													{row.address}
												</Typography>
											</TableCell>
											<TableCell component="th" scope="row">
												<Typography type="caption">
													{row.user_name || "Aun no se ha asignado"}
												</Typography>
											</TableCell>
											<TableCell component="th" scope="row">
												{ tabValue === 0 &&
													<span className={classes.btn}>
														<BtnAssign
															id={row.id}
															employees={employee}
															title="Asignar"
															delegations={{
																setFlag,
																flag,
															}}
														/>
													</span>}
												{ tabValue === 1 &&
													<span className={classes.btn}>
														<BtnAssign
															id={row.id}
															employees={employee}
															title="Reasignar"
															delegations={{
																setFlag,
																flag,
															}}
														/>
													</span>}
												{ tabValue !== 2 && tabValue !== 3 && tabValue !== 4 &&
													<span className={classes.btn}>
														<BtnCanceled
															id={row.id}
															delegations={{
																setFlag,
																flag,
															}}
														/>
													</span>}
												<Button
													color="primary"
													size="small"
													className={classes.btn}
												>
													Detalles
												</Button>
												{ tabValue === 4 &&
													<Chip
														size="small"
														label={label(row.status)}
														style={{ background : color(row.status) }}
													/>}
												<IconButton
													aria-label="pdf"
													color="primary"
												>
													<a
														target="_blank"
														href={`/api/quotations/pdf/${row.id}?simple_pdf=true`}
													>
														<FaFileEdit />
													</a>
												</IconButton>
												<IconButton
													aria-label="pdf"
													color="primary"
												>
													<a target="_blank" href={`/api/quotations/pdf/${row.id}`}>
														<FaFilePDF />
													</a>
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											rowsPerPageOptions={[5, 10, 25, 50, 100]}
											count={pagination.rowCount}
											page={page}
											onChangePage={handleChangePage}
											rowsPerPage={rowsPerPage}
											onChangeRowsPerPage={handleChangeRowsPerPage}
										/>
									</TableRow>
								</TableFooter>
							</>)}
						</Table>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

Quotation.propTypes = {
	delegations : PropTypes.object.isRequired,
};

Quotation.defaultProps = {
	collection : [],
	pagination : {},
};

export default Quotation;
