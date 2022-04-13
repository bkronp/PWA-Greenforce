/* eslint-disable camelcase */
// Import Dependencies
import { bookshelf } from "~/Server/database/db";

// Import Models
import PresentationModel from "~/Server/database/models/products/presentation";
import CategoryModel from "~/Server/database/models/products/category";
import FeatureModel from "~/Server/database/models/products/feature";
import PatentsModel from "~/Server/database/models/products/patent";
import YieldModel from "~/Server/database/models/products/yield";

import RequestError from "~/Util/CustomErrors/RequestError";

const addPresentation = async (body, transacting = undefined) => {
	const doWork = async (t) => {

		const presentationModel = await new PresentationModel().save(
			{
				name : body.name,
			},
			{
				transacting : t,
			},
		);

		return presentationModel.id;
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

const addFeature = async (body, transacting = undefined) => {
	const doWork = async (t) => {

		const featureModel = await new FeatureModel().save(
			{
				name : body.name,
			},
			{
				transacting : t,
			},
		);

		return featureModel.id;
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

const addCategory = async (body, transacting = undefined) => {
	const doWork = async (t) => {
		const categoryModel = await new CategoryModel().save(
			{
				name : body.name,
			},
			{
				transacting : t,
			},
		);

		return categoryModel.id;
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

const addPatent = async (body, transacting = undefined) => {
	const doWork = async (t) => {
		const patentModel = await new PatentsModel().save(
			{
				name : body.name,
			},
			{
				transacting : t,
			},
		);

		return patentModel.id;
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

const addYield = async (body, transacting = undefined) => {
	const doWork = async (t) => {
		const yieldModel = await new YieldModel().save(
			{
				name : body.name,
			},
			{
				transacting : t,
			},
		);

		return yieldModel.id;
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

const updatePresentation = async ({ id, ...body }, transacting = undefined) => {
	if (!id)
		throw new RequestError({
			status  : 422,
			label   : "MISSING_ID",
			message : "The [id] must be provided",
		});

	const doWork = async (t) => {
		const attributes = {
			name : body.name,
		};

		const options = {
			transacting : t,
		};

		const updOptions = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const presentationModel = await new PresentationModel({ id }).fetch(options).catch(() => {
			throw new RequestError({
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'presentation' with ID [${id}] was not found`,
				info    : { attributes },
			});
		});


		await presentationModel.save(attributes, updOptions);

		try {

			const presentationModelFetch = await new PresentationModel({ id }).fetch(options);
			return presentationModelFetch.attributes;
		} catch (error) {
			throw error && error.status && error.label
				? error
				: {
					status  : 500,
					label   : "DATABASE_ERROR",
					message : "There was a problem with the database",
					error   : error,
				  };
		}
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

const updateFeature = async ({ id, ...body }, transacting = undefined) => {
	if (!id)
		throw new RequestError({
			status  : 422,
			label   : "MISSING_ID",
			message : "The [id] must be provided",
		});

	const doWork = async (t) => {
		const attributes = {
			name : body.name,
		};

		const options = {
			transacting : t,
		};

		const updOptions = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const featureModel = await new FeatureModel({ id }).fetch(options).catch(() => {
			throw new RequestError({
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'feature' with ID [${id}] was not found`,
				info    : { attributes },
			});
		});

		await featureModel.save(attributes, updOptions);

		try {
			const featureModelFetch = await new FeatureModel({ id }).fetch(options);
			return featureModelFetch.attributes;
		} catch (error) {
			throw error && error.status && error.label
				? error
				: {
					status  : 500,
					label   : "DATABASE_ERROR",
					message : "There was a problem with the database",
					error   : error,
				  };
		}
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

const updateCategory = async ({ id, ...body }, transacting = undefined) => {
	if (!id)
		throw new RequestError({
			status  : 422,
			label   : "MISSING_ID",
			message : "The [id] must be provided",
		});

	const doWork = async (t) => {
		const attributes = {
			name : body.name,
		};

		const options = {
			transacting : t,
		};

		const updOptions = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const categoryModel = await new CategoryModel({ id }).fetch(options).catch(() => {
			throw new RequestError({
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'category' with ID [${id}] was not found`,
				info    : { attributes },
			});
		});

		await categoryModel.save(attributes, updOptions);

		try {
			const categoryModelFetch = await new CategoryModel({ id }).fetch(options);
			return categoryModelFetch.attributes;
		} catch (error) {
			throw error && error.status && error.label
				? error
				: {
					status  : 500,
					label   : "DATABASE_ERROR",
					message : "There was a problem with the database",
					error   : error,
				  };
		}
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

const updatePatent = async ({ id, ...body }, transacting = undefined) => {
	if (!id)
		throw new RequestError({
			status  : 422,
			label   : "MISSING_ID",
			message : "The [id] must be provided",
		});

	const doWork = async (t) => {
		const attributes = {
			name : body.name,
		};

		const options = {
			transacting : t,
		};

		const updOptions = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const patentModel = await new PatentsModel({ id }).fetch(options).catch(() => {
			throw new RequestError({
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'patent' with ID [${id}] was not found`,
				info    : { attributes },
			});
		});

		await patentModel.save(attributes, updOptions);

		try {
			const patentModelFetch = await new PatentsModel({ id }).fetch(options);
			return patentModelFetch.attributes;
		} catch (error) {
			throw error && error.status && error.label
				? error
				: {
					status  : 500,
					label   : "DATABASE_ERROR",
					message : "There was a problem with the database",
					error   : error,
				  };
		}
	};

	return transacting ? doWork(transacting) : bookshelf.transaction(doWork);
};

const CatalogueController = {
	addPresentation,
	addFeature,
	addCategory,
	addPatent,
	addYield,
	updatePresentation,
	updateFeature,
	updateCategory,
	updatePatent,
};

export {
	addPresentation,
	addFeature,
	addCategory,
	addPatent,
	addYield,
	updatePresentation,
	updateFeature,
	updateCategory,
	updatePatent,
};

export default CatalogueController;
