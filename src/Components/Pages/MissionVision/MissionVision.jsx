/* eslint-disable import/extensions */
/* eslint-disable max-len */
import PropTypes from "prop-types";
import {
	Grid,
	Container,
} from "@material-ui/core";

import {
	Typography,
} from "~/ToolKit";

import useStyles from "./styles";
import Styles from '../../../css/style.module.css';
import LayoutPage from "~/Components/Layouts/LayoutPage";
import Parallax from "~/Components/Parallax";
import mission from "~/Resources/img/berries.jpg";
import vision from "~/Resources/img/avocados_multi.jpg";


const MissionVision = ({
	delegations: {
		toRouter,
	},
}) => {
	const classes = useStyles();

	return (<LayoutPage container={false}>
		<Container style={{ padding: "3rem 0 3rem 0" }}>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="stretch"
			>
				<Typography type="title" fontWeight="500">
					Misión y Visión
				</Typography>
			</Grid>
			<a href="#mission" className={classes.scrollButton}><span />Misión</a>
		</Container>
		<Parallax
			id="mission"
			alignment="bottom"
			repeat="no-repeat"
			background={mission}
			backgroundSize="100%"
			height="250px"
			shadow={true}
		/>
		<Container style={{ padding: "3rem 0 2rem 0" }}>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="stretch"
			>
				<Typography type="title" fontWeight="500" gutterBottom={false}>
					Misión
				</Typography>
				<Grid item xs={12} className={classes.padding}>
					<div className={classes.paper} style={{ textAlign: "justify" }}>
						<Typography type="header2" fontWeight="500">
							Brindar a nuestros clientes asesoría, servicios y productos de alta calidad y eficiencia para desarrollar una agricultura sustentable
							a través de la aportación de nutrientes que mejoran la vida del suelo y de las plantas incrementando su productividad y rentabilidad
							sin dañar el medio ambiente y protegiendo a las personas, logrando así, una mejor calidad de vida y equilibrio entre la tierra, agricultores
							y los consumidores de todo el mundo.
						</Typography>
					</div>
				</Grid>
			</Grid>
			<a href="#vision" className={classes.scrollButton}><span />Visión</a>
		</Container>
		<Parallax
			id="vision"
			alignment="bottom"
			repeat="no-repeat"
			background={vision}
			backgroundSize="100%"
			height="250px"
			shadow={true}
		/>
		<Container style={{ padding: "3rem 0 2rem 0" }}>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="stretch"
			>
				<Typography type="title" fontWeight="500" gutterBottom={false}>
					Visión
				</Typography>
				<Grid item xs={12} className={classes.padding}>
					<div className={classes.paper} style={{ textAlign: "justify" }}>
						<Typography type="header2" fontWeight="500">
							Ser una empresa líder en la comercialización y distribución de productos orgánicos y ecológicos con alto valor tecnológico en la zona
							Occidente del país, contribuyendo a la producción de alimentos con calidad, generando una mayor rentabilidad para cada uno de los
							integrantes de la cadena agrícola logrando así superar las expecttivas del campo mexicano así como de una sociedad que demanda una
							mejor calidad y expectativa de vida.
						</Typography>
					</div>
				</Grid>
			</Grid>
			<a href="#valores" className={classes.scrollButton}><span />Valores</a>
		</Container>
		<Parallax
			id="valores"
			alignment="bottom"
			repeat="no-repeat"
			background={mission}
			backgroundSize="100%"
			height="250px"
			shadow={true}
		/>
		<Container style={{ padding: "3rem 0 2rem 0" }}>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="stretch"
			>
				<Typography type="title" fontWeight="500" gutterBottom={false}>
					Valores
				</Typography>
				<Grid item xs={12} className={classes.padding}>
					<div className={classes.paper} style={{ textAlign: "justify" }}>
						<Typography type="header2" fontWeight="500">
							<section class="timeline-section">
								<div className={Styles.timeline_items}>
									<div className={Styles.timeline_item}>
										<div className={Styles.timeline_dot}></div>
										<div className={Styles.timeline_content}>
											<h3>Honestidad</h3>
										</div>
									</div>
									<div className={Styles.timeline_item}>
										<div className={Styles.timeline_dot}></div>
										<div className={Styles.timeline_content}>
											<h3>Integridad</h3>
										</div>
									</div>
									<div className={Styles.timeline_item}>
										<div className={Styles.timeline_dot}></div>
										<div className={Styles.timeline_content}>
											<h3>Responsabilidad</h3>
										</div>
									</div>
									<div className={Styles.timeline_item}>
										<div className={Styles.timeline_dot}></div>
										<div className={Styles.timeline_content}>
											<h3>Pasión</h3>
										</div>
									</div>
									<div className={Styles.timeline_item}>
										<div className={Styles.timeline_dot}></div>
										<div className={Styles.timeline_content}>
											<h3>Compromiso</h3>
										</div>
									</div>
									<div className={Styles.timeline_item}>
										<div className={Styles.timeline_dot}></div>
										<div className={Styles.timeline_content}>
											<h3>Respeto</h3>
										</div>
									</div>
									<div className={Styles.timeline_item}>
										<div className={Styles.timeline_dot}></div>
										<div className={Styles.timeline_content}>
											<h3>Gratitud</h3>
										</div>
									</div>
									<div className={Styles.timeline_item}>
										<div className={Styles.timeline_dot}></div>
										<div className={Styles.timeline_content}>
											<h3>Lealtad</h3>
										</div>
									</div>
									<div className={Styles.timeline_item}>
										<div className={Styles.timeline_dot}></div>
										<div className={Styles.timeline_content}>
											<h3>Superación</h3>
										</div>
									</div>
									<div className={Styles.timeline_item}>
										<div className={Styles.timeline_dot}></div>
										<div className={Styles.timeline_content}>
											<h3>Empatía</h3>
										</div>
									</div>
								</div>
							</section>

						</Typography>
					</div>
				</Grid>
			</Grid>
		</Container>

	</LayoutPage >
	);
};

MissionVision.propTypes = {
	delegations: PropTypes.object.isRequired,
};

export default MissionVision;
