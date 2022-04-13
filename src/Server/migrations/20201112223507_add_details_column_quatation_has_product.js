/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.table("quotation_has_product", function(t) {
		t.text("details");
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
