/* eslint-disable camelcase */
import { useMemo } from "react";
import PropTypes from "prop-types";
import {
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableFooter,
	TablePagination,
	TableContainer,
	Tabs,
	Tab,
	Divider,
	Table,
	Paper,
	Grid,
	Avatar,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import AlertActions from "~/Components/Alert/store/actions";
// import { useRouter } from "next/router";

// Import Own Compoents
import AdminPageTitle from "~/Components/Admin/AdminPageTitle";
import {
	Button,
	NativeInput,
	Typography,
} from "~/ToolKit";

import { FaSearch } from "~/Resources/icons/fas";

import useStyles from "./styles";

const Products = ({
	delegations: {
		goToAddProduct,
		goToEditProduct,
		goToDelete,
		handleChange,
		handleChangeInput,
		handleChangePage,
		handleChangeRowsPerPage,
		activePage,
		tableData: {
			rowsData,
			pagination,
		},
		page,
		tabValue,
		rowsPerPage,
		filter,
		columns,
	},
}) => {
	// const router  = useRouter();
	const classes = useStyles();

	const tabs = useMemo(() => [
		{
			label: "Todos",
		},
		{
			label: "En oferta",
		},
	], []);

	return (
		<>
			<AdminPageTitle
				title="Productos"
				button={(
					<Button
						onClick={goToAddProduct}
						className={classes.btn}
						color="primary"
					>
						{"Agregar producto"}
					</Button>
				)}
			/>
			<TableContainer component={Paper} className={classes.marginY}>
				<Table className={classes.table} aria-label="caption table">
					<Tabs
						value={tabs}
						onChange={handleChange}
						indicatorColor={"secondary"}
						aria-label="Table tabs"
						className={classes.tabs}
						classes={{
							indicator: classes.indicator,
						}}
					>
						{tabs.map(({ label }, index) => (
							<Tab
								key={label + index}
								label={label}
								className={classes.tabs}
							/>
						))}
					</Tabs>
					<Divider />
				</Table>
				{tabValue == 0 &&
					<Table className={classes.table} aria-label="caption table">
						<Grid
							container
							direction="row"
							justify="center"
							alignItems="flex-start"
							className={classes.padding}
						>
							<Grid item xs={12} md={7}>
								<NativeInput
									id="admin-products-searchbar"
									placeholder="Filtrar Productos"
									startAdornment={FaSearch}
									className={classes.input}
									onChange={handleChangeInput}
								/>
							</Grid>
						</Grid>
					</Table>}
				<Table className={classes.table} aria-label="caption table">
					{(Array.isArray(rowsData) && rowsData.length > 0) && (<>
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
								<TableRow key={index}>
									<TableCell component="th" scope="row">
										<Typography type="caption">
											{row.id}
										</Typography>
									</TableCell>
									<TableCell component="th" scope="row">
										<Avatar src={row.image} alt="" />
									</TableCell>
									<TableCell component="th" scope="row">
										<Typography type="caption">
											{row.name}
										</Typography>
									</TableCell>
									<TableCell component="th" scope="row">
										<Typography type="caption">
											{row.presentation}
										</Typography>
									</TableCell>
									<TableCell component="th" scope="row">
										<Button
											onClick={goToEditProduct(row.id)}
											color="primary"
											startIcon={<Edit className={classes.centerIco} />}
										>
											
										</Button>

										<Button
											onClick={() => goToDelete(row.id)}
											className={classes.deleteBtn}
											startIcon={<Delete className={classes.centerIco} />}
										>
											
										</Button>
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
			</TableContainer>

		</>
	);
};

Products.propTypes = {
	delegations: PropTypes.object.isRequired,
};

Products.defaultProps = {
	collection: [],
	pagination: {},
};

export default Products;
