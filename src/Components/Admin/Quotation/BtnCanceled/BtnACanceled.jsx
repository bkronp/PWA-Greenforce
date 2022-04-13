import PropTypes from "prop-types";

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@material-ui/core";

import {
	Button,
} from "~/ToolKit";

const BtnCanceled = ({
	delegations : {
		update,
		handleClickOpen,
		handleClose,
		open,
	},
}) => (
	<>
		<Button
			color="dark"
			size="small"
			onClick={handleClickOpen}
		>
			Cancelar
		</Button>
		<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
			<DialogTitle id="customized-dialog-title" onClose={handleClose}>
				Cancelar cotización
			</DialogTitle>
			<DialogContent dividers>
				¿Esta seguro de que desea cancelar esta cotización?
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleClose} color="secondary">
					No
				</Button>
				<Button autoFocus onClick={update} color="primary">
					Si, Continuar
				</Button>
			</DialogActions>
		</Dialog>
	</>
);

BtnCanceled.propTypes = {
	delegations : PropTypes.object,
};

export default BtnCanceled;
