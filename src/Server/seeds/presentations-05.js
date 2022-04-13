/* eslint-disable max-len */
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("presentation")
		.then(function() {
			// Inserts seed entries
			return knex("presentation").insert([
				{
					id   : 14,
					name : "Zitrilon 7",
				},
				{
					id   : 15,
					name : "Fetrilon Combi 2",
				},
				{
					id   : 16,
					name : "Hydrospeed® CaB Max",
				},
			]);
		});
};
