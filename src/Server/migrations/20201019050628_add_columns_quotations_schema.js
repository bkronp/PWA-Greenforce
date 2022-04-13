/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.raw("ALTER TABLE quotation ADD COLUMN `delivery_date` TIMESTAMP NULL AFTER `date`;");
	await knex.raw("ALTER TABLE quotation ADD COLUMN `payment_conditions` TINYTEXT NULL AFTER `delivery_date`;");
	await knex.raw("ALTER TABLE quote_has_product ADD COLUMN `quantity` INT UNSIGNED NULL AFTER `quote_price`;");
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
