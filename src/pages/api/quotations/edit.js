/* eslint-disable camelcase */
import {
	allow,
	// auth_validation,
	composeMiddlewares,
} from "~/Util/ApiHelpers";

import { updateQuotation } from "~/Server/controllers/quotations/quotation_controller";

const Edit = async (request, response) => {
	try {
		// eslint-disable-next-line no-console
		// request.body.user_type = request.decoded?.data?.type;
		const data = await updateQuotation(request.body);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("PATCH"),
	// auth_validation(["PROVIDER", "ADMIN", "EMPLOYEE", "CUSTOMER"])
)(Edit);
