/* eslint-disable max-len */
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("presentation")
		.then(function() {
			// Inserts seed entries
			return knex("presentation").insert([
				{
					id   : 17,
					name : "Basfoliar Buffer Plus",
				},
			]);
		});
};
