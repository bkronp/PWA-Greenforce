/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.table("product", function(t) {
		t.integer("datasheet_file_id").unsigned().nullable();
		t.index("datasheet_file_id", "fk_product_datasheet_file_idx");
		t.foreign("datasheet_file_id", "fk_product_datasheet_file_idx")
			.references("file.id")
			.onDelete("NO ACTION")
			.onUpdate("CASCADE");
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
