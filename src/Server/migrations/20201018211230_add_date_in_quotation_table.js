/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.raw("ALTER TABLE quotation CHANGE COLUMN `exchange currency` `exchange_currency` ENUM('MNX', 'DLL') NOT NULL DEFAULT 'MNX';");
	await knex.raw("ALTER TABLE quotation ADD COLUMN `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER exchange_currency;");
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
