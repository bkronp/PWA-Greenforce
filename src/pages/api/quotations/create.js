/* eslint-disable camelcase */
/* eslint-disable no-console */
import {
	allow,
	//auth_validation,
	composeMiddlewares,
} from "~/Util/ApiHelpers";
import { addQuotation } from "~/Server/controllers/quotations/quotation_controller";

const Create = async (request, response) => {
	try {
		const data = await addQuotation(request.body);
		response.status(200).send(data);
	} catch (error) {
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("POST"),
)(Create);
