/* eslint-disable max-len */
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("category").del()
		.then(function() {
			// Inserts seed entries
			return knex("category").insert([
				{
					id   : 1,
					name : "Nutrición Vegetal",
				},
				{
					id   : 2,
					name : "Protección de Cultivos",
				},
				{
					id   : 3,
					name : "Fertilizantes de Liberación Controlada (Basacote)",
				},
				{
					id   : 4,
					name : "Fertilizantes Granulados y Estabilizados",
				},
				{
					id   : 5,
					name : "Fertilizantes Líquidos, Foliares y Bioestimulantes",
				},
				{
					id   : 6,
					name : "Fertilizantes para Áreas Verdes y Campos Deportivos (Floranid)",
				},
				{
					id   : 7,
					name : "Fertilizantes Solubles",
				},
				{
					id   : 8,
					name : "Fertilizantes Solubles Estabilizados (Novatec)",
				},
			]);
		});
};
