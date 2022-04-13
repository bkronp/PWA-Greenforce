import PropTypes     from "prop-types";
import AdminPageTitle from "~/Components/Admin/AdminPageTitle";

const Users = ({ delegations }) => (
	<>
		<AdminPageTitle
			title="Usuarios"
		/>

	</>
);

Users.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default Users;
