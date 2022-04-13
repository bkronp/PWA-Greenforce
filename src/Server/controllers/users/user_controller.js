/* eslint-disable no-undef */
/* eslint-disable camelcase */
import  bcrypt          from "bcryptjs";
import { bookshelf }    from "../../database/db";
import { PythonShell }  from "python-shell";
import mkdirp           from "mkdirp";
import { v4 as uuidv4 } from "uuid";

/* Import Models */
import UserModel           from "../../database/models/users/user";
// import ProviderModel       from "../../database/models/providers/provider";
import FileModel           from "../../database/models/info/file";

/* Import Controllers */
/*import CustomerController from "../customers/customer_controller";
import EmployeeController from "./employee_controller";
import ProviderController from "../providers/provider_controller";
*/
import ImageController from "../image/image_controller";

// const USER_TYPES = {
// 	ADMIN    : "ADMIN",
// 	PROVIDER : "PROVIDER",
// 	CUSTOMER : "CUSTOMER",
// 	EMPLOYEE : "EMPLOYEE",
// };

const EXEC_PATH               = process.cwd().replace(/[\\]+/ig, "/");
const DEFAULT_USER_IMAGE_PATH = `${EXEC_PATH}/src/Resources`;
const DEFAULT_IMAGE_NAME      = "default-profile-picture2.png";

// Tamaños que se manejaran al subir una imagen para usuarios
const IMAGE_SIZES = {
	"xs" : 72,
	"sm" : 144,
	"md" : 384,
	"lg" : 512,
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
async function resizeImage(fileName, inputPath, outputPath, sizeValue) {
	try {
		const options  = {
			mode       : "text",
			scriptPath : `${ EXEC_PATH }/src/Server/scripts/python`,
			args       : [`${ inputPath }/${ fileName }`, outputPath, sizeValue],
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
}

/**
 * Stores an image in the file system before call function for resizing a original image
 * and saves the full path in the database's product register by the given ID.
 *
 * @author  Cesar Augusto Herrera de la Torre.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {number} userId - User database's ID.
 * @param  {string|Base64} imageBase64 - Source image in base64 string format.
 * @param  {?Transaction} transacting -  Indictes in which transaction this opration will run,
 * @return {Promise.<undefined, Error>} On success fulfills a Promise without any information,
 *                                      otherwise rejects with some error.
 */
async function addImage(userId, imageBase64, transacting = undefined) {
	async function doWork(t, attributes) {
		const options = {
			transacting : t,
		};

		const fileModel = await new FileModel().save(attributes, options);
		return fileModel.id;
	}

	try {
		const base64String = imageBase64.split(",");
		const extension    = base64String[0].substring(11, base64String[0].indexOf(";")).toLowerCase();
		const image        = base64String[1];
		const randomUuid   = uuidv4();

		const fileName = `${ userId }.${ extension }`;
		const fileDir  = `${ EXEC_PATH }/src/Server/storage/images/users/${randomUuid}/${userId}`;

		mkdirp.sync(fileDir);

		const filePath = `${ fileDir }/${ fileName }`;
		const path     = `src/Server/storage/images/users/${randomUuid}/${userId}/${ fileName }`;

		await ImageController.saveFromBase64(filePath, image);

		for (const [sizeKey, sizeValue] of Object.entries(IMAGE_SIZES)) {
			const destPath =
				`${ EXEC_PATH }/src/Server/storage/images/users/${randomUuid}/${userId}/${sizeKey}`;
			await resizeImage(fileName, fileDir, destPath, sizeValue);
		}

		const attributes = {
			path,
			ext : extension,
		};

		return transacting
			? doWork(transacting, attributes)
			: bookshelf.transaction(doWork);
	} catch (error) {
		throw {
			status  : 500,
			label   : "FILE_SYSTEM_ERROR",
			message : "There was a problem in the server's file system.",
			error   : error,
		};
	}
}

/**
 *
 * @param {string} password
 */
async function hashPassword(password) {
	const salt        = bcrypt.genSaltSync(16);
	const newPassword = bcrypt.hashSync(password, salt);

	return newPassword;
}

async function verifyPassword(userPassoword, dbPassword) {
	/* return a boolean value */
	return bcrypt.compareSync(userPassoword, dbPassword);
}

/**
 * Inserts a new Membership register into the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
	*     user_name : string,
	*     password : string,
	*     email    : string,
	*     type     : string,
	*     status   : ?string,
	*     provider : ?object,
	*     customer : ?object,
	*     employee : ?object,
	*     image    : ?string|base64,
	* }} body - Constains the necesary information to create the new register.
	* @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
	*                                   new record's database ID, otherwise rejects with some error.
*/
async function register(body, transacting = undefined) {
	async function doWork(t) {
		const attributes = {
			user_name : body.user_name,
			password  : body.password,
			email     : body.email,
			type      : body.type,
			status    : body.status ? body.status : "ACTIVE",
		};

		const options = {
			transacting : t,
		};

		attributes.password = await hashPassword(attributes.password);

		let userModel = await new UserModel().save(attributes, options);

		// const profile_id = await (async () => {
		// 	switch (body.type) {
		// 		case USER_TYPES.CUSTOMER: {
		// 			body.customer.user_id = userModel.id;
		// 			const { id } = await CustomerController.create(body.customer, t);
		// 			return id;
		// 		}
		// 		case USER_TYPES.ADMIN:
		// 		case USER_TYPES.EMPLOYEE: {
		// 			body.employee.user_id = userModel.id;
		// 			const { id } = await EmployeeController.create(body.employee, t);
		// 			return id;
		// 		}
		// 		case USER_TYPES.PROVIDER: {
		// 			body.provider.user_id = userModel.id;
		// 			const { id } = await ProviderController.create(body.provider, t);
		// 			return id;
		// 		}
		// 		default:
		// 			return;
		// 	}
		// })();

		if (body.image) {
			const imageId = await addImage(userModel.id, body.image, t);
			const updOptions = {
				transacting : t,
				method      : "update",
				patch       : true,
			};

			userModel = await userModel.save({
				file_id : imageId,
			}, updOptions);
		}

		return { id : userModel.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Return filePath in the correct format
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {string} filePath
 * @param {number} userId
 * @param {string} extencionImage
 * @param {string} size
 */
async function parseImagePath(filePath, userId, extencionImage, size) {
	let pathFile = filePath.split("/");
	pathFile.pop();
	pathFile = `${pathFile.join("/")}/${size}/${userId}.${extencionImage}`;

	return pathFile;
}

/**
 * Gets from the database a price list register according to the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {{
 *     id   : number,
 *     size : string,
 * }} body - Constains the necesary information to get image path.
 * @return {Promise.<{
 *     imagePath : string,
 * }, Error>} Returns a promise, in case of success is fullfilled with the found record attributes,
*            otherwise rejects image_not_found path.
*/
async function getImageUser(body) {
	try {
		const options = {
			withRelated : ["file"],
		};
		const userModel = await new UserModel({ id : body.id }).fetch(options);
		const fileModel = await userModel.related("file");
		const extencion = fileModel.attributes.ext;

		if (!fileModel.attributes.path) {
			throw { message : "No file model search" };
		}

		let imagePath = body.size
			? await parseImagePath(fileModel.attributes.path, body.id, extencion, body.size)
			: fileModel.attributes.path.replace(/[\\]+/ig, "/");
		imagePath = `${EXEC_PATH}/${imagePath}`;
		return imagePath;

	} catch (error) {
		// In case of error return a default image path for the users
		// const imagePath =  body.size
		// 	? `${DEFAULT_USER_IMAGE_PATH}/${body.size}/${DEFAULT_IMAGE_NAME}`
		// 	: `${DEFAULT_USER_IMAGE_PATH}/${DEFAULT_IMAGE_NAME}`;
		const imagePath = `${DEFAULT_USER_IMAGE_PATH}/${DEFAULT_IMAGE_NAME}`;
		return imagePath;
	}
}

/**
 * Updates a specific User register which already
 * exists into the database by the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {{
 *     id          : number,
 *     user_name    : ?string,
 *     email       : ?string,
 *     password    : ?string,
 *     old_pasword : ?string,
 *     image       : ?string|base64,
 * }} body - Contains the information to save into the database.
 * @return {Promise.<undefined, Error>} Returns a promise which in case of success is fullfilled without
 *                                      any information, if any problem then is rejected with some error.
*/
async function update(body, transacting = undefined) {
	async function doWork(t) {
		const attributes = {
			user_name : body.user_name || undefined,
			email     : body.email    || undefined,
			password  : body.password || undefined,
		};

		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const userModel = await new UserModel({ id : body.id }).fetch(options);

		if (!userModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'user' with ID [${ body.id }] was not found`,
				info    : { attributes },
			};
		}

		const varifyOldPassword =
			attributes.password ? await verifyPassword(body.old_password, userModel.attributes.password) : undefined;

		if (attributes.password && !varifyOldPassword) {
			throw {
				status  : 401,
				label   : "UNAUTHORIZED",
				message : "No se puede cambiar la contraseña, tu contraseña actual no coincide",
				info    : { ...attributes },
			};
		}
		attributes.password = attributes.password ? await hashPassword(attributes.password) : undefined;

		if (body.image) {
			attributes.file_id = await addImage(body.id, body.image, t);
		}

		await userModel.save(attributes, options);

		return  { id : body.id  };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Updates a specific User register which already
 * exists into the database by the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {{
 *     id          : number,
 *     user_name    : ?string,
 *     email       : ?string,
 *     password    : ?string,
 *     old_pasword : ?string,
 *     image       : ?string|base64,
 * }} body - Contains the information to save into the database.
 * @return {Promise.<undefined, Error>} Returns a promise which in case of success is fullfilled without
 *                                      any information, if any problem then is rejected with some error.
*/
async function deleteUser(userId, transacting = undefined) {
	async function doWork(t) {
		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const userModel = await new UserModel({ id : userId }).fetch(options);

		if (!userModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'user' with ID [${ userId }] was not found`,
				info    : { attributes },
			};
		}

		if (userModel.get("type") === "PROVIDER") {
			const providerModel = await new ProviderModel({ user_id : userModel.get("id") }).fetch(options);
			const historyPaymentModel = await new HistoryPaymentModel({
				provider_id : providerModel.get("id"),
				status      : "ACTIVE",
			}).fetch({
				transacting : t,
				require     : false,
			});
			if (historyPaymentModel) {
				await historyPaymentModel.save({ status : "INACTIVE" }, options);
			}
		}

		await userModel.save({ delete : 1 }, options);

		return  { user : userModel.attributes };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Returns a list of employees with pagination information from the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 *
 * @param  {number} page - Number of the page to request.
 * @param  {{
 *     page      : number,
 *     filter    : ?string,
 *     order_by  : ?string,
 *     order     : ?string,
 *     page_size : ?number,
 * }} query - Contains information wich modifies the results, that includes filtering, sorting and pagination.
 * @return {Promise.<{
 *     collection : {
 *         id        : number,
 *         user_name : number,
 *         email     : string,
 *         type      : string,
 *         status    : string,
 *     }[],
 *     pagination : {
 *         rowCount  : number,
 *         pageCount : number,
 *         page      : number,
 *         pageSize  : number
 *     }
 * }, Error>} On success returns a Promise fullfilled with an object which contains a list of
 *            employees and the pagination information, otherwise rejects with Error.
*/
async function getPage(query) {
	try {
		const options = {
			pageSize : query.page_size > 0 && query.page_size <= 100 ? query.page_size : 25,
			page     : query.page > 0 ? query.page : 1,
		};

		const type   = query.type || undefined;
		const status = query.status || undefined;

		const column = query.order_by || "id";
		const order  = query.order || "DESC";

		const userCollection = await UserModel.query(function(builder) {
			builder.columns(
				"user.id",
				"user.user_name",
				"user.email",
				"user.type",
				"user.status",
			);

			if (query.filter) {
				builder
					.where(function() {
						this.orWhere("user_name", "LIKE", `%${ query.filter }%`)
							.orWhere("email", "LIKE", `%${ query.filter }%`);
					});
			}

			if (query.type) {
				builder.where("type", type);
			}

			if (query.status) {
				builder.where("status", status);
			}

			builder.orderBy(column, order);
		}).fetchPage(options);

		const collection = userCollection.models.map(UserModel => UserModel.attributes);

		return {
			collection : collection,
			pagination : userCollection.pagination,
		};

	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
}

module.exports = {
	register,
	verifyPassword,
	getImageUser,
	update,
	deleteUser,
	getPage,
};
