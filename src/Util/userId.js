import Store from "~/Store";

const userId = (type) => {
	try {
		const id = Store.getState().userReducer?.userData[type]?.id;

		return id;
	} catch (err) {
		console.error("[userId] An exception has occurred. ", err);
	}
};

export default userId;
