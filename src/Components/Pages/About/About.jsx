/* eslint-disable import/extensions */
/* eslint-disable max-len */
import {
	Grid,
	Container,
} from "@material-ui/core";
import PropTypes from "prop-types";

import LayoutPage           from "~/Components/Layouts/LayoutPage";
import Parallax             from "~/Components/Parallax";
// import mision               from "~/Resources/img/berries_2.jpg";
import vision               from "~/Resources/img/sugar_cane.jpg";
import useStyles            from "./styles";
import {
	Typography,
} from "~/ToolKit";

const ProductDetail = ({
	delegations : {
		open,
		Transition,
		handleClickOpen,
		handleClose,
		toRouter,
		Banner,
	},
}) => {
	const classes = useStyles();

	return (
		<LayoutPage container={false} background={Banner}>
			<Container style={{ padding : "3rem 0 2rem 0" }}>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="stretch"
				>
					<Typography type="title" fontWeight="500" gutterBottom={false}>
						Sobre Nosotros
					</Typography>
					<Grid item xs={12} className={classes.padding}>
						<div className={classes.paper} style={{ textAlign : "justify" }}>
							<Typography type="header2" fontWeight="500">
								PROGENETIC nace hace más de 50 años y se consolida como una de las empresas
								más innovadoras mediante la comercialización de semillas híbridas de maíz,
								sorgo y agroquímicos de última tecnología y un alto potencial de rendimiento.
							</Typography>
						</div>
					</Grid>
				</Grid>
				<a href="#section1" className={classes.scrollButton}><span />Ver más</a>
			</Container>
			<Parallax
				id={"section1"}
				subtitle={`Hoy día PROGENETIC comercializa un portafolio completo de productos enfocados en ofrecer soluciones
				completas para producción, nutrición y cuidado de cultivos.
				Preocupados por un entorno cambiante en el sector primario, en donde la producción de alimentos se 
				vuelve una actividad cada vez más retadora, PROGENETIC ha logrado consolidar relaciones comerciales con las 
				empresas transnacionales más importantes en el sector logrando así, dotar a sus clientes de insumos agrícolas 
				de la más alta calidad, sustentables e innovadores.`}
				height="100vh"
				background={vision}
				backgroundSize={"cover"}
				paradax={"fixed"}
				color={false}
				shadow={true}
				cursiveTitle={false}
				cursiveSubtitle={false}
			/>
		</LayoutPage>
	);
};

ProductDetail.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default ProductDetail;
