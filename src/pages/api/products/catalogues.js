/* eslint-disable camelcase */
import { allow, composeMiddlewares } from "~/Util/ApiHelpers";

import { getAllCatalogues } from "~/Server/controllers/products/product_controller";

const Catalogues = async (request, response) => {
	try {
		const data = await getAllCatalogues(request.query);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(allow("GET"))(Catalogues);
