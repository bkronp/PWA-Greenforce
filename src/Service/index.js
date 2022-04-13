import generalMethods from "./generalMethods";

const handleError = fn => async (...argsForFn) => {
	try {
		return fn(...argsForFn);
	} catch (err) {
		console.error("[Service.api] An exception has occurred. ", err);

		return false;
	}
};

const mapObjValuesRec = (obj, mapFn) => Object
	.entries(obj)
	.reduce((acc, [key, value]) => {
		const mappedValue = typeof value === "object" && !Array.isArray(value)
			? mapObjValuesRec(value, mapFn)
			: mapFn(value);

		return {
			...acc,
			[key] : mappedValue,
		};
	}, {});

// Inside Service.api, map all methods and objects' methods to handleError
const Service = {
	api : mapObjValuesRec({
		...generalMethods,
	}, handleError),
};

export default Service;
