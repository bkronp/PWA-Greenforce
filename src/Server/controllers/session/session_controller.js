/* eslint-disable camelcase */

// Import Serivces
import TokenService from "../../services/token_service";

// Import Model
import UserModel from "../../database/models/users/user";

// Import Controllers
import UserController from "../../controllers/users/user_controller";

/**
 * Looks for a valid user in the database or the super user in the administrator table and returns a token session.
 * The token payload contains the following information:
 *     {
 *         user : {
 *             id       : number,
 *             user_name : string,
 *             email    : string,
 *         } object,
 *         customer : {
 *             id : number
 *             first_name : string,
 *             last_name : string,
 *         }
 *     } *
 * @author  Cesar A Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {{
 *     user     : string[user_name | email],
 *     password : string,
 *     t ype     : string[ADMIN, PROVIDER, CUSTOMER, EMPLOYEE],
 * }} body - Contains the necessary information to do the login.
 * @return {Promise<{token : string}, Error>} On success fulfills a Promise with the generated token for the session,
 *                                            otherwise rejects with an error.
 */
async function login(body) {
	try {
		const userModel = await UserModel
			.query(function(builder) {
				builder
					.where(function() {
						this.orWhere("user_name", body.user)
							.orWhere("email", body.user);
					})
					.where("type", body.type)
					.where("delete", false);
			})
			.fetch();

		if (await UserController.verifyPassword(body.password, userModel.attributes.password)) {

			const contents = {
				id        : userModel.attributes.id,
				user_name : userModel.attributes.user_name,
				email     : userModel.attributes.email,
				type      : userModel.attributes.type,
			};

			const token = TokenService.createToken(contents);

			return { token };
		} else {
			throw {
				status  : 400,
				label   : "LOGIN_ERROR",
				message : "Error al loguear",
				error   : "Contraseña incorrecta",
			};
		}
	} catch (err) {
		if (err.message === "EmptyResponse") {
			err.message = "El usuario no existe";
		}
		throw err && err.status && err.label ? err : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was an error with the database",
			error   : err,
		};
	}
}

module.exports = {
	login,
};
