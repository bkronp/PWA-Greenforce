/* eslint-disable max-len */
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("feature").del()
		.then(function() {
			// Inserts seed entries
			return knex("feature").insert([
				{
					id   : 1,
					name : "Nitrógeno total (N)",
				},
				{
					id   : 2,
					name : "Nitrógeno nítrico (NO<sub>3</sub>)",
				},
				{
					id   : 3,
					name : "Nitrógeno amoniacal (NH<sub>4</sub>)",
				},
				{
					id   : 4,
					name : "Fósforo (P<sub>2</sub>O<sub>5</sub>",
				},
				{
					id   : 5,
					name : "Potasio (K<sub>2</sub>O) soluble en agua",
				},
				{
					id   : 6,
					name : "Magnesio (MgO)",
				},
				{
					id   : 7,
					name : "Azufre (S)",
				},
				{
					id   : 8,
					name : "Boro (B)",
				},
				{
					id   : 9,
					name : "Cobre (Cu)",
				},
				{
					id   : 10,
					name : "Hierro (Fe)",
				},
				{
					id   : 11,
					name : "Manganeso (Mn)",
				},
				{
					id   : 12,
					name : "Molibdeno (Mo)",
				},
				{
					id   : 13,
					name : "Zinc (Zn)",
				},
				{
					id   : 14,
					name : "Aminoácidos",
				},
				{
					id   : 15,
					name : "Aminoácidos totales",
				},
				{
					id   : 16,
					name : "Aminoácidos libres",
				},
				{
					id   : 17,
					name : "Ácido fosfórico",
				},
				{
					id   : 18,
					name : "Alcohol Graso Etoxilado",
				},
				{
					id   : 19,
					name : "Dimetil Polixiloxano",
				},
				{
					id   : 20,
					name : "Diluyentes",
				},
				{
					id   : 21,
					name : "Calcio (Ca)",
				},
				{
					id   : 22,
					name : "Auxinas",
				},
				{
					id   : 23,
					name : "Citoquinas",
				},
				{
					id   : 24,
					name : "Nitrógeno",
				},
				{
					id   : 25,
					name : "Oxido de Magnesio (MgO)",
				},
				{
					id   : 26,
					name : "Cobalto (Co)",
				},
				{
					id   : 27,
					name : "Nitrógeno Ureico (Isodur y Crotodur)",
				},
				{
					id   : 28,
					name : "Calcio (CaO)",
				},
				{
					id   : 29,
					name : "DMPP (3,4-DMPP)",
				},
			]);
		});
};
