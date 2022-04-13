import {
	Grid,
	Paper,
} from "@material-ui/core";

import useStyles from "./styles";

const AccessoriesBar = () => {
	const classes = useStyles();

	const Accessories = [
		"Lavadoras",
		"Molinos",
		"Pailas",
		"Comales",
		"Batidoras",
		"Boleadoras",
		"Enfriadores",
		"Espigueros",
		"Cortadoras",
		"Bandas",
		"Mallas",
		"Maquinas para tamales",
	];

	return (
		<Grid
			direction="row"
			className={classes.root}
			justify="center"
			alignItems="stretch"
			container
		>
			{Accessories.map((accessory, idx) => (
				<Grid key={idx} item xs className={classes.grid}>
					<Paper className={classes.paper}>{accessory}</Paper>
				</Grid>
			))}
		</Grid>
	);
};

export default AccessoriesBar;
