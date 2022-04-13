/* eslint-disable max-len */
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("yield").del()
		.then(function() {
			// Inserts seed entries
			return knex("yield").insert([
				{
					id   : 1,
					name : "Ejemplo",
				},
			]);
		});
};
