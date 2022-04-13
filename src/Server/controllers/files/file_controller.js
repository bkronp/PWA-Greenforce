const settings = require("../../settings");
/* eslint-disable camelcase */
import SigueMailerSdk from "sigue-mailer-sdk-js";

// Import Models
import FileModel from "~/Server/database/models/info/file";

const sigueMailer = new SigueMailerSdk({
	urlService    : settings.services["sigue-mailer"].server_url,
	authorization : {},
});

const EXEC_PATH = process.cwd().replace(/[\\]+/ig, "/");

const getFile = async (fileId) => {
	try {
		const fileModel = await new FileModel({ id : fileId })
			.query(function(builder) {
				builder.columns(
					"file.*",
				);
			}).fetch();

		const file = fileModel.attributes;

		return file;

	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
};

/**
 * Gets from the database a price list register according to the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param fileId - Constains the necesary information to get image path.
 * @return {Promise.<{
 *     imagePath : string,
 * }, Error>} Returns a promise, in case of success is fullfilled with the found record attributes,
*            otherwise rejects image_not_found path.
*/
const downloadFile = async (fileId) => {
	try {
		const fileModel = await new FileModel({ id : fileId }).fetch();

		let imagePath = fileModel.attributes.path.replace(/[\\]+/ig, "/");

		imagePath = `${EXEC_PATH}/${imagePath}`;
		return imagePath;

	} catch (error) {
		// In case of error return a default image path for the products
		return error;
	}
};

const sendContactForm = async (body) => {
	const response = await sigueMailer.api.emails.sendMail(
		settings.services["sigue-auth"].account_id,
		"contact",
		{
			recipients : settings.mails.contact.recipients,
			data       : {
				customerName : body.customerName,
				email        : body.email,
				telephone    : body.telephone,
				address      : body.address,
				customerType : body.customerType,
				yield        : body.yield,
				product      : body.product,
				message      : body.message || "",
			},
		}
	);

	return response;
};

module.exports = {
	getFile,
	downloadFile,
	sendContactForm,
};
