import PropTypes from "prop-types";

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@material-ui/core";

import {
	Button,
	Select2,
	Typography,
} from "~/ToolKit";

const BtnAssign = ({
	delegations : {
		update,
		handleSelect,
		handleClickOpen,
		handleClose,
		open,
		employee,
		employeeSelect,
		title,
	},
}) => (
	<>
		<Button
			color="secondary"
			size="small"
			onClick={handleClickOpen}
		>
			{title}
		</Button>
		<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
			<DialogTitle id="customized-dialog-title" onClose={handleClose}>
				Asignar empleado
			</DialogTitle>
			<DialogContent dividers>
				<Select2
					label={
						<Typography>
							Selecciona un empleado
						</Typography>
					}
					id="assignar"
					name="assignar"
					options={employee}
					onChange={handleSelect}
					valueSelect={employeeSelect}
				/>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleClose} color="secondary">
					Cancelar
				</Button>
				<Button autoFocus onClick={update} color="primary">
					Asignar
				</Button>
			</DialogActions>
		</Dialog>
	</>
);

BtnAssign.propTypes = {
	delegations : PropTypes.object,
};

export default BtnAssign;
