/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.table("product", function(t) {
		t.string("youtube_link");
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
