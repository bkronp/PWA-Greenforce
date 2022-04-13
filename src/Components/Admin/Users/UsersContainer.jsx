import PropTypes     from "prop-types";

// Import Own Components
import { bindAll }     from "~/Util";
// import Service         from "~/Service";
import withStateLoaded from "~/Store/withStateLoaded";
import AlertActions    from "~/Components/Alert/store/actions";


import Users from "./Users";

const UsersContainer = ({ alertActions }) => (
	<div className="users-container">
		<Users delegations={{ a : 1 }} />
	</div>
);

UsersContainer.propTypes = {
	alertActions : PropTypes.object,
	token        : PropTypes.any,
};

const mapDispatchToProps = bindAll({
	alertActions : AlertActions,
});

export default withStateLoaded(null, mapDispatchToProps)(UsersContainer);
