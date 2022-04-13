/* eslint-disable import/extensions */
/* eslint-disable camelcase */
// Import Dependences
import { bookshelf, knex } from "~/Server/database/db";
import crypto              from "crypto";
import settings            from "~/Server/settings.json";
// Import Models
import QuotationModel            from "~/Server/database/models/quotations/quotation";
import ProductModel              from "~/Server/database/models/products/product";
import QuitationHasProductsModel from "~/Server/database/models/quotations/quotation_has_product";
/* eslint-disable camelcase */
import SigueMailerSdk            from "sigue-mailer-sdk-js";

const sigueMailer = new SigueMailerSdk({
	urlService    : settings.services["sigue-mailer"].server_url,
	authorization : {},
});

const linkProductToQuotation = async (
	{
		product_id,
		quotation_id,
		price,
		quantity,
		details,
	},
	transacting
) => {
	const doWork = async (t) => {
		const options = { transacting : t };
		const attributes = {
			product_id,
			quotation_id,
			price,
			quantity : quantity ? quantity : 1,
			details  : details || undefined,
		};
		await new QuitationHasProductsModel().save(attributes, options);
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Inserts a new product register into the database or register a new change history.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
 * 		customer_name      : string,
 *      customer_email     : string,
 *      customer_telephone : string,
 *      address            : string,
 *      exchange_currency  : string | [MNX, DLL],
 *      product_ids        : []number,
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
 *                                   new record's database ID, otherwise rejects with some error.
*/
const addQuotation = async (body, transacting) => {
	const doWork = async (t) => {
		const attributes = {
			customer_name      : body.customer_name,
			customer_email     : body.customer_email,
			customer_telephone : body.customer_telephone,
			address            : body.address,
			exchange_currency  : body.exchange_currency,
			code               : crypto.randomBytes(4).toString("hex"),
			status             : "REQUESTED",
		};

		const options = {
			transacting : t,
		};

		const quotationModel = await new QuotationModel().save(attributes, options);

		for (const product_id of body.product_ids) {
			await linkProductToQuotation({
				quotation_id : quotationModel.get("id"),
				product_id,
			}, t);
		}

		const Product = await ProductModel.where({ id : body.product_ids[0] }).query(function(builder) {
			builder.columns(
				"product.*",
				function() {
					this.select("p.name")
						.from("presentation AS p")
						.where("p.id", "=", knex.raw("product.presentation_id"))
						.as("presentation");
				},
			);
		})
			.fetch();

		const name			= Product.attributes.name;
		const presentation	= Product.attributes.presentation;

		await sigueMailer.api.emails.sendMail(
			settings.services["sigue-auth"].account_id,
			"quotation",
			{
				recipients : settings.mails.contact.recipients,
				data       : {
					customerName     : body.customer_name,
					email            : body.customer_email,
					telephone        : body.customer_telephone,
					address          : body.address,
					product          : `${name} (${presentation}`,
					exchangeCurrency : body.exchange_currency ? "MXN" : "USD",
					date             : new Date().toLocaleString(),
				},
			}
		);

		return quotationModel.id;
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
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
 *      customer_name      : string,
 *      customer_email     : string,
 *      customer_telephone : string,
 *      address            : string,
 *      exchange_currency  : string | [MNX, DLL],
 *      user_id            : []number,
 *      products           : {
 * 			[quotation_has_product_id] : {
 * 				price    : number,
 *              quantity : number,
 * 			}
 *      }
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<undefined, Error>} Returns a promise which in case of success is fullfilled without
 *                                      any information, if any problem then is rejected with some error.
*/
const updateQuotation = async (body, transacting) => {
	const doWork = async (t) => {
		const attributes = {
			customer_name      : body.customer_name      || undefined,
			customer_email     : body.customer_email     || undefined,
			customer_telephone : body.customer_telephone || undefined,
			address            : body.address            || undefined,
			exchange_currency  : body.exchange_currency  || undefined,
			user_id            : body.user_id            || undefined,
			status             : body.status             || undefined,
			itemized_tax       : body.itemized_tax       || undefined,
			payment_conditions : body.payment_conditions || undefined,
			delivery_date      : body.delivery_date      || undefined,
		};

		const options = {
			transacting : t,
		};

		const updOptions = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const quotationModel = await new QuotationModel({ id : body.id }).fetch(options);
		if (!quotationModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'quotation' with ID [${ body.id }] was not found`,
				info    : { attributes },
			};
		}
		let amount = 0;
		if (body.products) {
			for (const quotationHasProductId in body.products) {
				const quotationHasProductModel =
					await new QuitationHasProductsModel({ id : quotationHasProductId }).fetch(options);
				await quotationHasProductModel.save({
					price : body.products[quotationHasProductId].price,
				}, updOptions);
				amount += body.products[quotationHasProductId].price * body.products[quotationHasProductId].quantity;
			}
		}
		amount = (body.itemized_tax && amount) ? amount * 1.16 : amount;
		attributes.amount = amount || undefined;

		const response = await quotationModel.save(attributes, updOptions);
		return response.id;
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Returns a list of quotations with pagination information from the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 *
 * @param  {number} page - Number of the page to request.
 * @param  {{
 * }} query - Contains information wich modifies the results, that includes filtering, sorting and pagination.
 * @return {Promise.<{
 *     collection : {
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
		const options     = {
			pageSize : query.page_size > 0 && query.page_size <= 100 ? query.page_size : 25,
			page     : query.page > 0 ? query.page : 1,
		};

		const column = query.order_by || "id";
		const order  = query.order    || "DESC";
		const filter = query.filter   || undefined;
		const status = query.status   || undefined;
		const userId = query.user_id  || undefined;

		const quotationCollection = await QuotationModel.query(function(builder) {
			builder.columns(
				"quotation.*",
				function() {
					this.select("u.user_name")
						.from("user AS u")
						.where("u.id", "=", knex.raw("quotation.user_id"))
						.as("user_name");
				},
			);

			// Logica para filtrar busquedas
			if (filter) {
				builder
					.where(function() {
						this.orWhere("name", "LIKE", `%${ filter }%`)
							.orWhere("code", "LIKE", `%${ filter }%`)
							.orWhere("customer_name", "LIKE", `%${ filter }%`)
							.orWhere("customer_email", "LIKE", `%${ filter }%`)
							.orWhere("address", "LIKE", `%${ filter }%`)
							.orWhere("date", "LIKE", `%${ filter }%`)
							.orWhereIn("user_id", function() {
								this.select("u.name")
									.from("user AS u")
									.where("u.user_name", "LIKE", `%${ filter }%`)
									.orWhere("u.email", "LIKE", `%${ filter }%`);
							});
					});
			}

			if (status) {
				builder.where("status", status);
			}

			if (userId) {
				builder.where("user_id", userId);
			}

			builder.orderBy(column, order);
		}).fetchPage(options);

		const collection = quotationCollection.models.map(quotationModel => quotationModel.attributes);

		return {
			collection : collection,
			pagination : quotationCollection.pagination,
		};

	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
};

const quotationDetails = async (quotationId) => {
	try {
		const options = {
			withRelated : [
				"products",
			],
		};

		const quotationModel = await new QuotationModel({ id : quotationId })
			.query(function(builder) {
				builder.columns(
					"quotation.*",
					function() {
						this.select("u.user_name")
							.from("user AS u")
							.where("u.id", "=", knex.raw("quotation.user_id"))
							.as("user_name");
					},
				);
			}).fetch(options);

		const data    = quotationModel.attributes;
		data.date     = data.date.valueOf();
		data.subtotal = data.itemized_tax ? ((data.amount / 116) * 100) : data.amount;
		data.total    = data.amount;
		data.taxes    = data.itemized_tax ? ((data.amount / 116) * 16) : null;

		data.products = quotationModel.related("products").models
			.map(productRelatedModel => ({
				...productRelatedModel.attributes,
				image :
					`${settings.settings.server_url}/api/images/products/md/${productRelatedModel.attributes.file_id}`,
				tax  : data.itemized_tax ? ((productRelatedModel.attributes.price / 100) * 16) : null,
				name : `${productRelatedModel.attributes.name} ${productRelatedModel.attributes.presentation}`,
			}));

		return data;

	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
};

const ProductController = {
	addQuotation,
	updateQuotation,
	quotationDetails,
	getPage,
};

export {
	addQuotation,
	updateQuotation,
	quotationDetails,
	getPage,
};

export default ProductController;
