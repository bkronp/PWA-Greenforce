/* eslint-disable camelcase */
import { allow, composeMiddlewares } from "~/Util/ApiHelpers";

import { quotationDetails } from "~/Server/controllers/quotations/quotation_controller";

const QuotationsDetails = async (request, response) => {
	try {
		const data = await quotationDetails(request.query);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(allow("GET"))(QuotationsDetails);
