/* eslint-disable camelcase */
/* eslint-disable no-console */
import {
	allow,
	// auth_validation,
	composeMiddlewares,
} from "~/Util/ApiHelpers";
import { updateProductDetails } from "~/Server/controllers/products/product_controller";

export const config = {
	api : {
		bodyParser : {
			sizeLimit : "50mb",
		},
	},
};

const Edit = async (req, res) => {
	req.body.user_type = req.decoded?.data?.type;

	await updateProductDetails(req.body)
		.then((data) => res.status(200).send(data))
		.catch((error) => {
			res.status(error.status ? error.status : 500).send(error);
		});
};

export default composeMiddlewares(
	allow("PATCH"),
	// auth_validation(["PROVIDER", "ADMIN", "EMPLOYEE"]),
)(Edit);
