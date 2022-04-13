/* eslint-disable camelcase */
/* eslint-disable no-console */
import {
	allow,
	//auth_validation,
	composeMiddlewares,
} from "~/Util/ApiHelpers";
import { addCategory } from "~/Server/controllers/catalogues/catalogue_controller";

export const config = {
	api : {
		bodyParser : {
			sizeLimit : "50mb",
		},
	},
};

const Create = async (request, response) => {
	try {
		request.body.user_type = request.decoded?.data?.type;
		const data = await addCategory(request.body);
		response.status(200).send(data);
	} catch (error) {
		console.error(error);
		response.status(error.status ? error.status : 500).send(error ? error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("POST"),
	// auth_validation(["PROVIDER", "ADMIN", "EMPLOYEE"]),
)(Create);
