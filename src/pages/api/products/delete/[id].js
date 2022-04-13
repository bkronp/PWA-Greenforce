import { allow, composeMiddlewares } from "~/Util/ApiHelpers";

import { delProduct } from "~/Server/controllers/products/product_controller";

const DeleteProduct = async (request, response) => {
    const data = await delProduct(request.query.id);
    console.log(data);
    response.status(200).send({message : "product deleted", "label" : "success"});

}

export default composeMiddlewares(allow("DELETE"))(DeleteProduct);