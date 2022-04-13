/* eslint-disable camelcase */
// Import Dependencies
import { bookshelf, knex } from "~/Server/database/db";
import { PythonShell }     from "python-shell";
import { v4 as uuidv4 }    from "uuid";
import mkdirp              from "mkdirp";
import _                   from "lodash";

// Import Models
import FileModel                        from "~/Server/database/models/info/file";
import PresentationModel                from "~/Server/database/models/products/presentation";
import ProductModel                     from "~/Server/database/models/products/product";
import ProductHasFileModel              from "~/Server/database/models/products/product_has_file";
import ProductHasFeatureModel           from "~/Server/database/models/products/product_has_feature";
import YieldPresentationHasProductModel from "~/Server/database/models/products/yield_presentation_has_product";
import ProductHasPatentModel            from "~/Server/database/models/products/product_has_patent";
import CategoryModel                    from "~/Server/database/models/products/category";
import FeatureModel                     from "~/Server/database/models/products/feature";
import PatentsModel                     from "~/Server/database/models/products/patent";
import YieldModel                       from "~/Server/database/models/products/yield";
import YieldPresentationModel           from "~/Server/database/models/products/yield_presentation";
import ProductRelatedModel              from "~/Server/database/models/products/product_related";

import ImageController from "~/Server/controllers/image/image_controller";

import RequestError from "~/Util/CustomErrors/RequestError";

const EXEC_PATH = process.cwd().replace(/[\\]+/gi, "/");
const DEFAULT_PRODUCT_IMAGE_PATH = `${EXEC_PATH}/src/Resources/img/Producto`;
const DEFAULT_IMAGE_NAME = "product_not_found.png";
const IMAGE_SIZES = ["xs", "sm", "md", "lg"];
const IMAGE_REIZE_SIZES = {
	xs : 72,
	sm : 144,
	md : 384,
	lg : 512,
};

/**
 * Resizing an image and store image resizing in the new path location
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {string} fileName
 * @param {string} inputPath
 * @param {string} outputPath
 * @param {number} sizeValue
 */
const resizeImage = async (fileName, inputPath, outputPath, sizeValue) => {
	try {
		const options = {
			mode       : "text",
			scriptPath : `${EXEC_PATH}/src/Server/scripts/python`,
			args       : [`${inputPath}/${fileName}`, outputPath, sizeValue],
		};

		mkdirp.sync(outputPath);

		PythonShell.run("image_resizing.py", options, function(err, results) {
			if (err) {
				throw { ...err };
			}
			return;
		});
	} catch (error) {
		throw { ...error };
	}
};

/**
 * Stores an image in the file system before call function for resizing a original image
 * and saves the full path in the database's product register by the given ID.
 *
 * @author  Cesar Augusto Herrera de la Torre.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {number} productId - Product database's ID.
 * @param  {string|Base64} imageBase64 - Source image in base64 string format.
 * @param  {?Transaction} transacting -  Indicates in which transaction this operation will run,
 * @return {Promise.<undefined, Error>} On success fulfills a Promise without any information,
 *                                      otherwise rejects with some error.
 */
const addImage = async (
	imageBase64,
	randomUuid,
	productId,
	imageNumber,
	transacting,
) => {
	const doWork = async (t, attributes) => {
		const options = {
			transacting : t,
		};

		const fileModel = await new FileModel().save(attributes, options);
		return fileModel.id;
	};

	try {
		const base64String = imageBase64.split(",");
		const extension = base64String[0].substring(11, base64String[0].indexOf(";")).toLowerCase();
		const image = base64String[1];

		const fileName = `${productId}.${extension}`;
		const fileDir = `${EXEC_PATH}/src/Server/storage/images/products/${randomUuid}/${productId}/${imageNumber}`;
		const path = `/src/Server/storage/images/products/${randomUuid}/${productId}/${imageNumber}/${fileName}`;

		mkdirp.sync(fileDir);

		const filePath = `${fileDir}/${fileName}`;

		await ImageController.saveFromBase64(filePath, image);

		for (const [sizeKey, sizeValue] of Object.entries(IMAGE_REIZE_SIZES)) {
			const destPath =
				`${EXEC_PATH}/src/Server/storage/images/products/${randomUuid}/${productId}/${imageNumber}/${sizeKey}`;
			await resizeImage(fileName, fileDir, destPath, sizeValue);
		}

		const attributes = {
			path,
			ext : extension,
		};

		return transacting ? doWork(transacting, attributes) : bookshelf.transaction(doWork);
	} catch (error) {
		console.log("--->", error);
		throw {
			status  : 500,
			label   : "FILE_SYSTEM_ERROR",
			message : "There was a problem in the server's file system.",
			error   : error,
		};
	}
};

/**
 * Stores a PDF in the file system
 * and saves the full path in the database's product register by the given ID.
 *
 * @author  Cesar Augusto Herrera de la Torre.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {number} productId - Product database's ID.
 * @param  {string|Base64} pdfBase64 - Source pdf in base64 string format.
 * @param  {?Transaction} transacting -  Indicates in which transaction this operation will run,
 * @return {Promise.<undefined, Error>} On success fulfills a Promise without any information,
 *                                      otherwise rejects with some error.
 */
const addDataSheet = async (
	datasheetBase64,
	randomUuid,
	productName,
	transacting,
) => {
	const doWork = async (t, attributes) => {
		const options = {
			transacting : t,
		};

		const fileModel = await new FileModel().save(attributes, options);
		return fileModel.id;
	};

	try {
		const base64String = datasheetBase64.split(",");
		const extension = base64String[0].substring(17, base64String[0].indexOf(";")).toLowerCase();
		const datasheet = base64String[1];

		const fileName = `${productName}.${extension}`;
		const fileDir = `${EXEC_PATH}/src/Server/storage/datasheets/${randomUuid}`;
		const path = `/src/Server/storage/datasheets/${randomUuid}/${fileName}`;

		mkdirp.sync(fileDir);

		const filePath = `${fileDir}/${fileName}`;

		await ImageController.saveFromBase64(filePath, datasheet);

		const attributes = {
			path,
			ext : extension,
		};

		return transacting ? doWork(transacting, attributes) : bookshelf.transaction(doWork);
	} catch (error) {
		throw {
			status  : 500,
			label   : "FILE_SYSTEM_ERROR",
			message : "There was a problem in the server's file system.",
			error   : error,
		};
	}
};


/**
 * Adds a list of File to some product details by the given product details ID.
 * The position of each branch is considered in the database.
 *
 * @param  {number} productId - product details's database ID.
 * @param  {number[]} fileIds - Contains the list of Files to insert.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
const linkFilesToProduct = async (productId, fileIds, transacting = null) => {
	const doWork = async (t) => {
		const options = { transacting : t };

		for (const fileId of fileIds) {
			const attributes = {
				product_id : productId,
				file_id    : fileId,
			};
			await new ProductHasFileModel().save(attributes, options);
		}

		return;
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

/**
 * Adds a list of feature to some product details by the given product details ID.
 * The position of each branch is considered in the database.
 *
 * @param  {number} productId - product details's database ID.
 * @param  {{
 *    [feature_id] : label | string,
 * }} features - Contains the list of features to insert.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
const linkFeaturesToProduct = async (productId, features, transacting = null) => {
	const doWork = async (t) => {
		const options = { transacting : t };

		for (const [featureId, name] of Object.entries(features)) {
			const attributes = {
				product_id : productId,
				feature_id : featureId,
				name,
			};
			await new ProductHasFeatureModel().save(attributes, options);
		}
		return;
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

const linkYieldPresentationToProduct = async (
	{ product_id, yield_presentation_id },
	transacting,
) => {
	const doWork = async (t) => {
		const options = { transacting : t };
		const attributes = {
			product_id,
			yield_presentation_id,
		};
		await new YieldPresentationHasProductModel().save(attributes, options);
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

const linkPatentToProduct = async ({ product_id, patent_id }, transacting) => {
	const doWork = async (t) => {
		const options = { transacting : t };
		const attributes = {
			product_id,
			patent_id,
		};
		await new ProductHasPatentModel().save(attributes, options);
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

const linkProductRelatedToProduct = async ({ product_id, product_related_id }, transacting) => {
	const doWork = async (t) => {
		const options = { transacting : t };
		const attributes = {
			product_id,
			product_related_id,
		};
		await new ProductRelatedModel().save(attributes, options);
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

/**
 * Deletes all the feature/product links from the database by the given product ID.
 *
 * @param  {number} productId - product details's database ID.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilling it with no information if success,
 *                                      in case af any error rejects with some error.
 */
const delFeaturesToProduct = async (productId, transacting = null) => {
	const doWork = async (t) => {
		const options = {
			transacting : t,
			require     : false,
		};

		await ProductHasFeatureModel.where("product_id", "=", productId).destroy(options);
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

/**
 * Deletes all the file/product links from the database by the given product ID.
 *
 * @param  {number} productId - product details's database ID.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilling it with no information if success,
 *                                      in case af any error rejects with some error.
 */
const delFilesToProduct = async (productId, transacting = null) => {
	const doWork = async (t) => {
		const options = {
			transacting : t,
			require     : false,
		};

		await ProductHasFileModel.where("product_id", "=", productId).destroy(options);
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

/**
 * Deletes all the yield_presentations/product links from the database by the given product ID.
 *
 * @param  {number} productId - product details's database ID.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilling it with no information if success,
 *                                      in case af any error rejects with some error.
 */
const delYieldPresentationsToProduct = async (productId, transacting = null) => {
	const doWork = async (t) => {
		const options = {
			transacting : t,
			require     : false,
		};

		await YieldPresentationHasProductModel.where("product_id", "=", productId).destroy(options);
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

/**
 * Deletes all the patents/product links from the database by the given product ID.
 *
 * @param  {number} productId - product details's database ID.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilling it with no information if success,
 *                                      in case af any error rejects with some error.
 */
const delPatentsToProduct = async (productId, transacting = null) => {
	const doWork = async (t) => {
		const options = {
			transacting : t,
			require     : false,
		};

		await ProductHasPatentModel.where("product_id", "=", productId).destroy(options);
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

/**
 * Deletes all the related_products/product links from the database by the given product ID.
 *
 * @param  {number} productId - product details's database ID.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilling it with no information if success,
 *                                      in case af any error rejects with some error.
 */
const delProductsRelatedToProduct = async (productId, transacting = null) => {
	const doWork = async (t) => {
		const options = {
			transacting : t,
			require     : false,
		};

		await ProductRelatedModel.where("product_id", "=", productId).destroy(options);
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

/**
 * Updates all the feature/product links of a specific product by its given ID.
 *
 * @param  {number} productId - product is database ID.
 * @param  {{
 *     [feature_id] : label | string,
 * }} features - Contains the new list of feature ids to link.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
const updateFeaturesLinkToProduct = async (productId, features, transacting = null) => {
	const doWork = async (t) => {
		await delFeaturesToProduct(productId, t);
		return linkFeaturesToProduct(productId, features, t);
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

/**
 * Updates all the file/product links of a specific product by its given ID.
 *
 * @param  {number} productId - product is database ID.
 * @param  {number[]} file_ids - Contains the new list of file ids to link.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
const updateFilesLinkToProduct = async (productId, file_ids, transacting = null) => {
	const doWork = async (t) => {
		await delFilesToProduct(productId, t);
		return linkFilesToProduct(productId, file_ids, t);
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

/**
 * Updates all the yield_presentations/product links of a specific product by its given ID.
 *
 * @param  {number} productId - product is database ID.
 * @param  {number[]} yield_presentations_ids - Contains the new list of yield_presentations ids to link.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
const updateYieldPresentationsLinkToProduct = async (
	productId,
	yield_presentations_ids,
	transacting = null,
) => {
	const doWork = async (t) => {
		await delYieldPresentationsToProduct(productId, t);
		if (yield_presentations_ids.length > 0) {
			for (const yield_presentation_id of yield_presentations_ids) {
				await linkYieldPresentationToProduct(
					{
						product_id : productId,
						yield_presentation_id,
					},
					t,
				);
			}
		}
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

/**
 * Updates all the patents/product links of a specific product by its given ID.
 *
 * @param  {number} productId - product is database ID.
 * @param  {number[]} patents_ids - Contains the new list of yield_presentations ids to link.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
const updatePatentsLinkToProduct = async (productId, patents_ids, transacting = null) => {
	const doWork = async (t) => {
		await delPatentsToProduct(productId, t);
		if (patents_ids.length > 0) {
			for (const patent_id of patents_ids) {
				await linkPatentToProduct(
					{
						product_id : productId,
						patent_id,
					},
					t,
				);
			}
		}
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

/**
 * Updates all the product_related/product links of a specific product by its given ID.
 *
 * @param  {number} productId - product is database ID.
 * @param  {number[]} patents_ids - Contains the new list of yield_presentations ids to link.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
const updateProductsRelatedLinkToProduct = async (productId, related_products_ids, transacting = null) => {
	const doWork = async (t) => {
		await delProductsRelatedToProduct(productId, t);
		if (related_products_ids.length > 0) {
			for (const product_related_id of related_products_ids) {
				await linkProductRelatedToProduct(
					{
						product_id : productId,
						product_related_id,
					},
					t,
				);
			}
		}
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};
/**
 * Inserts a new product register into the database or register a new change history.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
 *     name            : string,
 *     description     : string,
 *     category_id     : number,
 *     presentation_id : ?number,
 *     on_offer        : ?number,
 *     features        : {
 *         [feature_id] : [description],
 *     } object,
 *     yields  : ?[] number | yield_presentation_id's,
 *     patents : ?[] number | yield_presentation_id's,
 *     images  : ?string | base64[],
 * }} body - Contains the necessary information to create the new register.
 * @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
 *                                   new record's database ID, otherwise rejects with some error.
 */
const addProduct = async (body, transacting = undefined) => {
	const doWork = async (t) => {
		const attributes = {
			name            : body.name,
			description     : body.description,
			category_id     : body.category_id,
			presentation_id : body.presentation_id || undefined,
			on_offer        : body.on_offer || undefined,
			youtube_link    : body.youtube_link || undefined,
		};

		const options = {
			transacting : t,
		};

		let fileIds = [];


		if (body?.datasheet) {
			const randomUuid = uuidv4();
			const datasheetId = await addDataSheet(body.datasheet, randomUuid, body.name, t);
			attributes.datasheet_file_id = datasheetId;
		}

		const productModel = await new ProductModel().save(attributes, options);

		await linkFeaturesToProduct(productModel.id, body?.features, t);

		if (body?.yields?.length > 0) {
			for (const yield_presentation_id of body.yields) {
				await linkYieldPresentationToProduct(
					{
						product_id : productModel.id,
						yield_presentation_id,
					},
					t,
				);
			}
		}

		if (body?.patents?.length > 0) {
			for (const patent_id of body.patents) {
				await linkPatentToProduct(
					{
						product_id : productModel.id,
						patent_id,
					},
					t,
				);
			}
		}

		if (body?.products_related?.length > 0) {
			for (const productRelatedId of body.products_related) {
				await linkProductRelatedToProduct(
					{
						product_id         : productModel.id,
						product_related_id : productRelatedId,
					},
					t,
				);
			}
		}

		if (body?.images) {
			const randomUuid = uuidv4();
			for (let key in body.images) {
				key = parseInt(key);
				const imageId = await addImage(body.images[key], randomUuid, productModel.id, key + 1, t);
				fileIds.push(imageId);
			}
		}

		fileIds = body.image_ids ? [...fileIds, ...body.image_ids] : fileIds;

		if (fileIds.length > 0) {
			await linkFilesToProduct(productModel.id, fileIds, t);
		}

		return productModel.id;
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

/**
 * Updates a specific Product Details register which already
 * exists into the database by the given ID.
 *
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {number} id,
 * @param {{
 *     name               : ?string,
 *     description        : ?string,
 *     category_id        : ?number,
 *     features           : ?object,
 *     user_type          : string,
 *     file_ids           : ?number[].
 *     on_offer        	  : ?number,
 * 	   features           : ?{
 *         [feature_id] : [description],
 *     } object,
 *     yields  : ?[] number | yield_presentation_id's,
 *     patents : ?[] number | yield_presentation_id's,
 *     images  : ?string | base64[],
 * }} body - Contains the necessary information to create the new register.
 * @return {Promise.<undefined, Error>} Returns a promise which in case of success is fullfilled without
 *                                      any information, if any problem then is rejected with some error.
 */
const updateProductDetails = async ({ id, ...body }, transacting = undefined) => {
	if (!id)
		throw new RequestError({
			status  : 422,
			label   : "MISSING_ID",
			message : "The [id] must be provided",
		});

	const doWork = async (t) => {
		const attributes = {
			name            : body.name,
			description     : body.description,
			on_offer        : body.on_offer,
			category_id     : body.category_id,
			presentation_id : body.presentation_id,
			youtube_link    : body.youtube_link,
		};

		const options = {
			transacting : t,
		};

		const updOptions = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const productModel = await new ProductModel({ id }).fetch(options).catch(() => {
			throw new RequestError({
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'product' with ID [${id}] was not found`,
				info    : { attributes },
			});
		});

		if (body?.patents) {
			await updatePatentsLinkToProduct(id, body.patents, t);
		}

		if (body?.yields) {
			await updateYieldPresentationsLinkToProduct(id, body.yields, t);
		}

		if (body?.features) {
			await updateFeaturesLinkToProduct(id, body.features, t);
		}

		// TODO: Fix update images

		let imagesIds = [];
		let newImages = [];

		if (typeof body?.datasheet == "string") {
			const randomUuid = uuidv4();
			const datasheetId = await addDataSheet(body.datasheet, randomUuid, body.name, t);
			attributes.datasheet_file_id = datasheetId;
		}


		if (body?.images) {
			imagesIds = body.images.filter((img) => !isNaN(img));
			newImages = body.images.filter((img) => isNaN(img));

			const randomUuid = uuidv4();
			for (let key in newImages) {
				key = parseInt(key);
				const imageId = await addImage(newImages[key], randomUuid, productModel.id, key + 1, t);
				imagesIds.push(imageId);
			}
			await updateFilesLinkToProduct(id, imagesIds, t);
		}

		if (body?.products_related) {
			await updateProductsRelatedLinkToProduct(id, body.products_related, t);
		}

		await productModel.save(attributes, updOptions);

		return await getProductDetails({ id : productModel.id });
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

/**
 * Returns a list of products details with pagination information from the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 *
 * @param  {number} page - Number of the page to request.
 * @param  {{
 *     page                    : number,
 *     filter                  : ?string,
 *     order_by                : ?string,
 *     order                   : ?string,
 *     page_size               : ?number,
 *     total_offers            : ?string|bolean,
 *     cheaper_product         : ?string|bolean,
 *     frezee                  : ?string|bolean,
 *     pending_changes         : ?string|bolean,
 *     date_start              : ?string,
 *     date_end                : ?string,
 *     min_price               : ?number,
 *     max_price               : ?number,
 *     only_offered            : ?string|bolean,
 *     image_size              : ?string|bolean,
 *     image_array             : ?string|bolean,
 *     volume_discount         : ?string|bolean,
 *     state_id                : ?number,
 *     provider_id             : ?number,
 *     product_provider_status : ?string,
 *     user_liked_product      : ?number,
 * }} query - Contains information wich modifies the results, that includes filtering, sorting and pagination.
 * @return {Promise.<{
 *     collection : {
 *         id              : number,
 *         category_id     : number,
 *         name            : string
 *         description     : string
 *         created_at      : string,
 *         category        : string,
 *         pending_changes : number,
 *         cheaper_product : number,
 *         images          : []object,
 *     }[],
 *     pagination : {
 *         rowCount  : number,
 *         pageCount : number,
 *         page      : number,
 *         pageSize  : number
 *     }
 * }, Error>} On success returns a Promise fullfilled with an object which contains a list of
 *            providers and the pagination information, otherwise rejects with Error.
 */
const getPage = async (query) => {
	try {
		const options = {
			pageSize    : query.page_size > 0 && query.page_size <= 100 ? query.page_size : 50,
			page        : query.page > 0 ? query.page : 1,
			withRelated : ["files", "features"],
		};

		const column = query.order_by || "id";
		const order = query.order || "ASC";

		const onlyOffered = query.only_offered ? true : false;
		const filter = query.filter || undefined;
		const categoryId = query.category_id || undefined;
		const imageArray = query.image_array || undefined;

		const productCollection = await ProductModel.query(function(builder) {
			builder.columns(
				"product.*",
				function() {
					this.select("c.name")
						.from("category AS c")
						.where("c.id", "=", knex.raw("product.category_id"))
						.as("category");
				},
				function() {
					this.select("p.name")
						.from("presentation AS p")
						.where("p.id", "=", knex.raw("product.presentation_id"))
						.as("presentation");
				},
			);

			// Logica para filtrar busquedas
			if (filter) {
				builder.where(function() {
					this.orWhere("name", "LIKE", `%${filter}%`)
						.orWhere("description", "LIKE", `%${filter}%`)
						.orWhereIn("category_id", function() {
							this.select("c.id").from("category AS c").orWhere("c.name", "LIKE", `%${filter}%`);
						})
						.orWhereIn("presentation_id", function() {
							this.select("p.id")
								.from("presentation AS p")
								.orWhere("p.name", "LIKE", `%${filter}%`);
						})
						.orWhereIn("id", function() {
							this.select("phf.id")
								.from("product_has_feature AS phf")
								.orWhere("phf.name", "LIKE", `%${filter}%`);
						});
				});
			}
			if (categoryId) {
				builder.where("category_id", categoryId);
			}

			if (onlyOffered) {
				builder.where("on_offer", true);
			}

			builder.orderBy(column, order);
		}).fetchPage(options);

		const collection = productCollection.models.map((productModel) => {
			if (imageArray) {
				const images = productModel.related("files").models.map((fileModel) =>
					IMAGE_SIZES.reduce(
						(accum, size) => ({
							...accum,
							[size] : `/api/images/products/${size}/${fileModel.attributes.id}`,
						}),
						{ original : `/api/images/products/${fileModel.attributes.id}` },
					),
				);
				productModel.attributes.images = images;
			} else {
				const image = productModel
					.related("files")
					.models.reduce(
						(accum, fileModel) => (accum = `/api/images/products/${fileModel.attributes.id}`),
						"",
					);
				productModel.attributes.image = image;
			}

			if (onlyOffered) {
				productModel.attributes.features = productModel
					.related("features")
					.models.map((featureModel) => featureModel.attributes);
			}

			return productModel.attributes;
		});

		return {
			collection : collection,
			pagination : productCollection.pagination,
		};
	} catch (error) {
		throw error && error.status && error.label
			? error
			: {
				status  : 500,
				label   : "DATABASE_ERROR",
				message : "There was a problem with the database",
				error   : error,
			};
	}
};

/**
 * Gets from the database a product details register according to the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {number} productId - Database ID of the product details.
 * @return {Promise.<{
 *     id                    : number,
 * } , Error>} Returns a promise, in case of success is fullfilled with the found record attributes,
 *            otherwise rejects with some error.
 *
 */
const getProductDetails = async ({ id: productId }) => {
	try {
		const options = {
			withRelated : ["files", "features", "patents", "yield_presentations", "products_related"],
		};

		const productModel = await new ProductModel({ id : productId })
			.query(function(builder) {
				builder.columns(
					"product.*",
					function() {
						this.select("c.name")
							.from("category AS c")
							.where("c.id", "=", knex.raw("product.category_id"))
							.as("category");
					},
					function() {
						this.select("p.name")
							.from("presentation AS p")
							.where("p.id", "=", knex.raw("product.presentation_id"))
							.as("presentation");
					},
				);
			})
			.fetch(options);
		const data = productModel.attributes;
		data.images_ids = [];
		data.images = productModel.related("files").models.map((fileModel) =>
			IMAGE_SIZES.reduce(
				(accum, size) => {
					data.images_ids.push(fileModel.get("id"));
					return {
						...accum,
						[size] : `/api/images/products/${size}/${fileModel.get("id")}`,
					};
				},
				{ original : `/api/images/products/${fileModel.get("id")}` },
			),
		);

		data.images_ids = _.uniq(data.images_ids);

		data.features = productModel
			.related("features")
			.models.map((featureModel) => featureModel.attributes);
		data.patents = productModel
			.related("patents")
			.models.map((patentModel) => patentModel.attributes);
		data.yield_presentations = productModel
			.related("yield_presentations")
			.models.map((yieldPresentationModel) => yieldPresentationModel.attributes);
		data.products_related = productModel
			.related("products_related")
			.models.map((productRelatedModel) => ({
				...productRelatedModel.attributes,
				image : `/api/images/products/md/${productRelatedModel.attributes.file_id}`,
			}));

		const datasheet = await productModel.related("datasheet").fetch().catch(() => ({ attributes : null }));
		data.datasheet = datasheet.attributes;

		return data;
	} catch (error) {
		throw error && error.status && error.label
			? error
			: {
				status  : 500,
				label   : "DATABASE_ERROR",
				message : "There was a problem with the database",
				error   : error,
			};
	}
};

const getAllCatalogues = async () => {
	const presentationsCollection = await PresentationModel.fetchAll();
	const categoriesCollection = await CategoryModel.fetchAll();
	const featuresCollection = await FeatureModel.fetchAll();
	const patentsCollection = await PatentsModel.fetchAll();
	const yieldsCollection = await YieldModel.fetchAll();
	const yieldPresentationsCollection = await YieldPresentationModel.fetchAll();

	const response = {};

	response.presentations = presentationsCollection.models.map(
		(presentationModel) => presentationModel.attributes,
	);

	response.categories = categoriesCollection.models.map(
		(categoryModel) => categoryModel.attributes,
	);

	response.features = featuresCollection.models.map((featureModel) => featureModel.attributes);

	response.patents = patentsCollection.models.map((patentModel) => patentModel.attributes);

	response.yields = yieldsCollection.models.map((yieldModel) => yieldModel.attributes);

	response.yield_presentations = yieldPresentationsCollection.models.map(
		(yieldModel) => yieldModel.attributes,
	);

	return response;
};

/**
 * Return filePath in the correct format
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {string} filePath
 * @param {string} size
 */
const parseImagePath = async (filePath, size) => {
	let pathFile = filePath.split("/");
	const fileName = pathFile.pop();
	pathFile = `${pathFile.join("/")}/${size}/${fileName}`;

	return pathFile;
};

/**
 * Gets from the database a price list register according to the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {{
 *     file_id : number,
 *     size    : string,
 * }} body - Constains the necesary information to get image path.
 * @return {Promise.<{
 *     imagePath : string,
 * }, Error>} Returns a promise, in case of success is fullfilled with the found record attributes,
 *            otherwise rejects image_not_found path.
 */
const getImageProduct = async (body) => {
	try {
		const fileModel = await new FileModel({ id : body.file_id }).fetch();

		let imagePath = body.size
			? await parseImagePath(fileModel.attributes.path, body.size)
			: fileModel.attributes.path.replace(/[\\]+/gi, "/");

		imagePath = `${EXEC_PATH}/${imagePath}`;
		return imagePath;
	} catch (error) {
		// In case of error return a default image path for the products
		const imagePath = body.size
			? `${DEFAULT_PRODUCT_IMAGE_PATH}/${body.size}/${DEFAULT_IMAGE_NAME}`
			: `${DEFAULT_PRODUCT_IMAGE_PATH}/${DEFAULT_IMAGE_NAME}`;
		return imagePath;
	}


};

/**
* Deletes all the patents/product links from the database by the given product ID.
*
* @param  {number} productId - product details's database ID.
* @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
*                                      otherwise begins its own transaction.
* @return {Promise.<undefined, Error>} Returns a Promise fulfilling it with no information if success,
*                                      in case af any error rejects with some error.
*/
const delProduct = async (productId, transacting = null) => {
	try {
		return await new ProductModel({id: productId}).destroy({require:false});
	} catch (error) {
		console.log("--->", error);
		throw {
			status  : 500,
			label   : "FILE_SYSTEM_ERROR",
			message : "There was a problem in the server's file system.",
			error   : error,
		};
	}
};

const ProductController = {
	addProduct,
	updateProductDetails,
	getImageProduct,
	getProductDetails,
	getPage,
	delProduct,
};

export {
	addProduct,
	updateProductDetails,
	getAllCatalogues,
	getImageProduct,
	getProductDetails,
	getPage,
	delProduct
};

export default ProductController;
