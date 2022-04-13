/* eslint-disable camelcase */
import {
	useState,
	useCallback,
} from "react";
import PropTypes from "prop-types";

import { bindAll }     from "~/Util";
import Service         from "~/Service";
import withStateLoaded from "~/Store/withStateLoaded";
import AlertActions    from "~/Components/Alert/store/actions";
import BtnAssign       from "./BtnAssign";

const BtnAssignContainer = ({
	id,
	employees,
	title,
	alertActions,
	delegations : {
		setFlag,
		flag,
	},
}) => {
	const idQuotation = id;
	const employee    = employees;

	const [employeeSelect, setEmployeeSelect] = useState(null);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleSelect = useCallback((event, newValue) => {
		setEmployeeSelect(newValue);
	}, []);

	const update =  useCallback(() => {
		(async () => {
			const result = await Service.api.editQuotation(
				{
					id      : idQuotation,
					user_id : employeeSelect.id,
					status  : "RUNNING",
				}
			);
			if (result.status) {
				alertActions.openAlert({
					message  : "Cambios guardado correctamente",
					type     : "success",
					duration : 3000,
				});
			}
			else {
				alertActions.openAlert({
					message  : "Ocurrió un error al guardar, intenta más tarde",
					type     : "error",
					duration : 3000,
				});
			}
			setEmployeeSelect(null);
			setFlag(!flag);
			setOpen(false);
		})();
	}, [alertActions, employeeSelect, flag, idQuotation, setFlag]);

	return (
		<BtnAssign
			delegations={{
				update,
				handleSelect,
				handleClickOpen,
				handleClose,
				open,
				employee,
				employeeSelect,
				title,
			}}
		/>
	);
};

BtnAssignContainer.propTypes = {
	id           : PropTypes.number,
	employees    : PropTypes.object,
	title        : PropTypes.string,
	alertActions : PropTypes.any,
	delegations  : PropTypes.object,
};

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded(null, mapDispatchToProps)(BtnAssignContainer);
