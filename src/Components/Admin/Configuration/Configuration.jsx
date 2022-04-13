import PropTypes     from "prop-types";
import {
	Grid,
} from "@material-ui/core";

// Import Own Components
import AdminPageTitle from "~/Components/Admin/AdminPageTitle";

import ConfigurationPane from "./ConfigurationPane";

const Configuration = ({
	configs,
	delegations,
}) => (
	<>
		<AdminPageTitle
			title="Configuraciones"
		/>
		<Grid
			container
			justify="center"
			spacing={2}
		>
			{Object.values(configs).map((config => !config.hide && (
				<Grid item md={6} xs={12} key={config.title}>
					<ConfigurationPane
						config={config}
						delegations ={delegations} />
				</Grid>
			)))}
		</Grid>
	</>
);

Configuration.propTypes = {
	configs     : PropTypes.object.isRequired,
	delegations : PropTypes.object.isRequired,
};

export default Configuration;
