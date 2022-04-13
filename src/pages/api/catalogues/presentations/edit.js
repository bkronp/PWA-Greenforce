/* eslint-disable camelcase */
/* eslint-disable no-console */
import {
	allow,
	//auth_validation,
	composeMiddlewares,
} from "~/Util/ApiHelpers";
import { updatePresentation } from "~/Server/controllers/catalogues/catalogue_controller";

export const config = {
	api : {
		bodyParser : {
			sizeLimit : "50mb",
		},
	},
};

const Edit = async (req, res) => {
	req.body.user_type = req.decoded?.data?.type;

	await updatePresentation(req.body)
		.then((data) => res.status(200).send(data))
		.catch((error) => {
			res.status(error.status ? error.status : 500).send(error);
		});
};

export default composeMiddlewares(
	allow("PATCH"),
	// auth_validation(["PROVIDER", "ADMIN", "EMPLOYEE"]),
)(Edit);
