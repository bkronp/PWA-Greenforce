/* eslint-disable max-len */
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("presentation").del()
		.then(function() {
			// Inserts seed entries
			return knex("presentation").insert([
				{
					id   : 1,
					name : "Basacote Plus 3M (16-8-12+2Mg)",
				},
				{
					id   : 2,
					name : "Basacote Plus 6M (16-8-12+2Mg)",
				},
				{
					id   : 3,
					name : "Blaukorn Classic (12-8-16 +3Mg)",
				},
				{
					id   : 4,
					name : "Novatec Premiun (15-3-20 + 3Mg)",
				},
				{
					id   : 5,
					name : "Basfoliar Boro 13%B",
				},
				{
					id   : 6,
					name : "Basfoliar Kelp",
				},
				{
					id   : 7,
					name : "Floranid Twin Permanent (16-7-15 + 2Mg)",
				},
				{
					id   : 8,
					name : "Hakaphos Azul (20-5-5+ME)",
				},
				{
					id   : 9,
					name : "Hakaphos Base (7-12-40+ME)",
				},
				{
					id   : 10,
					name : "Hakaphos Violeta (13-40-13 +ME)",
				},
				{
					id   : 11,
					name : "Novatec Solub 14-48",
				},
				{
					id   : 12,
					name : "Novatec Solub 21",
				},
				{
					id   : 13,
					name : "Novatec Solub 45",
				},
			]);
		});
};
