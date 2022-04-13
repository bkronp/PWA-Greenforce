/* eslint-disable camelcase */
import {
	fetcher,
	authHeader,
} from "~/Util";

const ApiMethods = {
	login : async (username, password, type) => {
		switch (type) {
			case "EMPLOYEE":
			case "ADMIN":
				break;
			default:
				throw "[ApiMethods.login] Invalid user type. expected one of [EMPLOYEE, ADMIN]";
		}

		const requestOptions = {
			method : "POST",
			body   : JSON.stringify({
				user : username,
				password,
				type,
			}),
		};

		return fetcher("/api/auth/login", requestOptions);
	},
	sendContact : async (data)=>{
		try {
			const requestOptions = {
				method : "POST",
				body   : JSON.stringify(data),
			};
			const response = await fetch("/api/emails/contact", requestOptions);
			if (response?.ok) {
				return {
					body   : await response.json(),
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error;
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
	sendQuotation : async (data)=>{
		try {
			const requestOptions = {
				method : "POST",
				body   : JSON.stringify(data),
			};
			const response = await fetch("/api/quotations/create", requestOptions);
			if (response?.ok) {
				return {
					body   : await response.json(),
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error;
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
	getProducts : async (page, qs, token, type = "admin")=>{
		try {
			const requestOptions = {
				method  : "GET",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
			};
			const response = await fetch(`/api/products/page/${page}?${qs}`, requestOptions);

			if (response?.status === 200) {
				return {
					body   : await response.json(),
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error;
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
	getProductDetails : async (product_id, token, type = "admin")=>{
		try {
			const requestOptions = {
				method  : "GET",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
			};
			const response = await fetch(`/api/products/details/${product_id}`, requestOptions);

			if (response?.status === 200) {
				return {
					body   : await response.json(),
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error;
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
	deleteProduct :async(product_id, token, type ="admin")=>{
		try {
			
			const requestOptions = {
				method  : "DELETE",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
			};

			const response = await fetch(`/api/products/delete/${product_id}`, requestOptions);
		
			if (response?.status === 200) {
				return {
					body   : await response.json(),
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error;
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
	getQuotation : async (page, qs, token, type = "admin")=>{
		try {
			const requestOptions = {
				method  : "GET",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
			};
			const response = await fetch(`/api/quotations/page/${page}?${qs}`, requestOptions);

			if (response?.status === 200) {
				return {
					body   : await response.json(),
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error;
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
	getQuotationDetail : async (id, token, type = "admin")=>{
		try {
			const requestOptions = {
				method  : "GET",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
			};
			const response = await fetch(`/api/quotations/details/${id}`, requestOptions);

			if (response?.status === 200) {
				return {
					body   : await response.json(),
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error;
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
	getUsers : async (page, qs, type = "admin") => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : authHeader(type),
			};
			const response = await fetch(`/api/users/page/${page}?${qs}`, requestOptions);
			if (response?.ok) {
				return {
					body   : await response.json(),
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error;
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
	editQuotation : async (data) => {
		try {
			const requestOptions = {
				method : "PATCH",
				body   : JSON.stringify(data),
			};
			const response = await fetch("/api/quotations/edit", requestOptions);
			if (response?.ok) {
				return {
					body   : "editado correctamente",
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error;
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},


};

export default ApiMethods;
