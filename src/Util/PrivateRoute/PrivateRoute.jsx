/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";

// Import Own Components
import withStateLoaded from "~/Store/withStateLoaded";

const PrivateRoute = ({
	redirectTo,
	type,
	children,
	customer,
	admin,
	employee,
	provider,
}) => {
	const router = useRouter();

	useEffect(() => {
		const loggedInForType = (() => {
			switch (type.toLowerCase()) {
				case "customer":
					return customer;
				case "provider":
					return provider;
				case "employee":
					return employee;
				case "admin":
				default:
					return admin;

			}
		})();

		if (!loggedInForType) {
			router.push(redirectTo);
		}
	}, [
		admin,
		customer,
		provider,
		employee,
		redirectTo,
		type,
	]);

	return children;
};

PrivateRoute.propTypes = {
	redirectTo : PropTypes.string,
	loggedIn   : PropTypes.bool,
	children   : PropTypes.node.isRequired,
	type       : PropTypes.string,
};

PrivateRoute.defaultProps = {
	redirectTo : "/",
	loggedIn   : false,
	typeUser   : "",
};

const mapStateToProps = ({ userReducer : {
	customer,
	admin,
	provider,
	employee,
} }) => ({
	customer,
	admin,
	provider,
	employee,
});

export default withStateLoaded(mapStateToProps, null)(PrivateRoute);
