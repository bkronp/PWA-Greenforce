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
import BtnACanceled    from "./BtnACanceled";

const BtnCanceledContainer = ({
	id,
	alertActions,
	delegations : {
		setFlag,
		flag,
	},
}) => {
	const idQuotation = id;

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const update =  useCallback(() => {
		(async () => {
			const result = await Service.api.editQuotation(
				{
					id     : idQuotation,
					status : "CANCELED",
				}
			);
			if (result.status) {
				alertActions.openAlert({
					message  : "Se a cancelado la cotización",
					type     : "success",
					duration : 3000,
				});
			}
			else {
				alertActions.openAlert({
					message  : "Ocurrió un error al cancelar, intenta más tarde",
					type     : "error",
					duration : 3000,
				});
			}
			handleClickOpen();
			setFlag(!flag);
		})();
	}, [alertActions, flag, idQuotation, setFlag]);

	return (
		<BtnACanceled
			delegations={{
				update,
				handleClickOpen,
				handleClose,
				open,
			}}
		/>
	);
};

BtnCanceledContainer.propTypes = {
	id           : PropTypes.number,
	employees    : PropTypes.object,
	title        : PropTypes.string,
	alertActions : PropTypes.any,
	delegations  : PropTypes.object,
};

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded(null, mapDispatchToProps)(BtnCanceledContainer);
