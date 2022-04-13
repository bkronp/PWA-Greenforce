/* eslint-disable camelcase */
// Import a settings config for admin user
const { admin } = require("../settings.json");
const bcrypt    = require("bcryptjs");

async function hashPassword(password) {
	const salt        = bcrypt.genSaltSync(16);
	const newPassword = bcrypt.hashSync(password, salt);

	return newPassword;
}

exports.seed = async function(knex) {
	const firstUser = {
		user_name : admin.user_name,
		password  : admin.password,
		email     : admin.email,
		type      : "ADMIN",
		status    : "ACTIVE",
	};

	firstUser.password = await hashPassword(firstUser.password);

	// Deletes ALL existing entries
	await knex("user").insert([firstUser]);
};
