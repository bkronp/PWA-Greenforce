import PropTypes from "prop-types";
import {
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Table,
	Paper,
	Grid,
	TableContainer,
	TextField,
} from "@material-ui/core";
//import { useRouter } from "next/router";

// Import Own Compoents
import {
	Button,
	Typography,
	NativeInput,
} from "~/ToolKit";
import {
	FaEdit,
	FaPlus,
	FaTimes,
} from "~/Resources/icons/fal";

import { FaSearch } from "~/Resources/icons/fas";
import { Delete } from "@material-ui/icons";
import useStyles from "./styles";

const ConfigurationPane = ({
	config,
	delegations: {
		catalogues,
		filterCatalogue,
		toggleEditMode,
		handleEditChange,
		cancelEditMode,
		saveEditions,
		deleteItem,
		saveNewItem,
		handleNewItemChange,
	},
}) => {
	const classes = useStyles();

	return (
		<Paper style={{ minHeight: "630px" }}>
			<Typography
				type="header2"
				className={classes.title}
			>
				{config.title}
			</Typography>
			<Table className={classes.table} aria-label="caption table">
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="flex-start"
					className={classes.padding}
				>
					<Grid item xs={11} md={9}>
						<NativeInput
							id="admin-add-catalogue"
							placeholder={config.addPlaceHolder}
							className={classes.input}
							onChange={({ target: { value } }) => handleNewItemChange(config.name, value)}
						/>
					</Grid>
					<Grid item xs={1}>
						<Button
							size="small"
							color="primary"
							className={classes.btnPlus}
							onClick={() => saveNewItem(config.name)}
							disabled={!config.newItem}
						>
							<FaPlus />
						</Button>
					</Grid>
				</Grid>
			</Table>
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
							id="admin-searchbar"
							placeholder={config.searchPlaceHolder}
							startAdornment={FaSearch}
							className={classes.input}
							onChange={filterCatalogue(config.name)}
						/>
					</Grid>
				</Grid>
			</Table>
			<TableContainer className={classes.container}>
				<Table className={classes.table} aria-label="caption table" stickyHeader>
					<TableHead>
						<TableRow>
							{
								config.columns.map(item =>
									<TableCell key={item.field} style={{ width: item.width }}>{item.title}</TableCell>
								)
							}
						</TableRow>
					</TableHead>
					<TableBody>
						{(Array.isArray(config.catalogue) && config.catalogue.length > 0) ?
							config.catalogue.map((row, index) => (
								<TableRow key={row.id}>
									{
										config.columns.map(column =>
											column.field !== "actions" ? (
												<TableCell key={column.field}>
													<Typography type="caption"
														className={row.edit ? classes.hide : null}>
														<div dangerouslySetInnerHTML={
															{ __html: row[column.field] }
														} />
													</Typography>
													<TextField label={column.title} variant="outlined"
														fullWidth required value={row[column.field]}
														onChange={({ target: { value } }) =>
															handleEditChange(config.name, index, column.field, value)}
														className={!row.edit ? classes.hide : null} />
												</TableCell>)
												: (
													<TableCell component="th" scope="row" key={column.field}>
														<Button
															color="secondary"
															size="small"
															className=
															{`${classes.btn}, ${row.edit ? classes.hide : null}`}
															onClick={() => toggleEditMode(config.name, index, true)}
														>
															<FaEdit /> {" "}
															Editar
														</Button>
														<Button
															color="primary"
															size="small"
															className=
															{`${classes.btn}, ${!row.edit ? classes.hide : null}`}
															onClick={() => saveEditions(config.name, index)}
														>
															<FaEdit /> {" "}
															Guardar
														</Button>
														<Button
															style={{ backgroundColor: "#ff7800", margin: "10px" }}
															size="small"
															className=
															{`${classes.btn}, ${!row.edit ? classes.hide : null}`}
															onClick={() => cancelEditMode(config.name, index)}
														>
															<FaTimes /> {" "}
															Cancelar
														</Button>
														{/* <Button
															size="small"
															style={{ backgroundColor: "red", margin: "10px" }}
															className=
															// {`${classes.btn}, ${classes.hide}`}
															{`${classes.btn}, ${row.edit ? classes.hide : null}`}
															onClick={() => deleteItem(config.name, index)}

														>
															<Delete /> {" "}
															Eliminar
														</Button> */}
													</TableCell>
												)
										)
									}
								</TableRow>
							)) : (
								<TableRow>
									<TableCell component="th" scope="row"
										colSpan={config.columns.length} align="center">
										<Typography type="caption">
											{config.missing}
										</Typography>
									</TableCell>
								</TableRow>
							)}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

ConfigurationPane.propTypes = {
	config: PropTypes.object.isRequired,
	delegations: PropTypes.object.isRequired,
};



export default ConfigurationPane;
