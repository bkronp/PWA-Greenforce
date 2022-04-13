/* eslint-disable camelcase */
import jwt      from "jsonwebtoken";
import moment   from "moment";
import settings from "../settings";

const createToken = function(contents) {
	const payload = { ...contents };

	payload.created_at   = Date.now();
	payload.renovated_at = null;
	payload.expiration   = moment().add(settings.security.token_life).valueOf();

	return jwt.sign(
		{
			data : payload,
		},
		settings.security.jwt_key,
		{
			expiresIn : settings.security.token_life,
		}
	);
};

module.exports = {
	createToken,
};
