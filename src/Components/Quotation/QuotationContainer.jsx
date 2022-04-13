/* eslint-disable camelcase */
import { useCallback, useState } from "react";
import { connect }               from "react-redux";
import { useTheme }              from "@material-ui/core/styles";
import useMediaQuery             from "@material-ui/core/useMediaQuery";
import PropTypes                 from "prop-types";

// import own components
import Quotation    from "./Quotation";
import Service 		from "~/Service";
import { bindAll } 	from "~/Util";
import AlertActions from "~/Components/Alert/store/actions";


const QuotationContainer = ({
	alertActions,
	product,
}) => {

	const [formData, setFormData] = useState({
		customer_name      : null,
		customer_email     : null,
		customer_telephone : null,
		exchage_currency   : true,
		product_ids        : [product.id],
		address            : null,
		message            : null,
	});

	const handleChange = useCallback(({ target : { name, value } }) => setFormData({
		...formData,
		[name] : value,
	}), [formData]);

	const handleSubmitForm = useCallback(async (data) => {
		const success = await Service.api.sendQuotation(formData);
		if (success) {
			if (success) {
				setFormData({
					...formData,
					customer_name      : null,
					customer_email     : null,
					customer_telephone : null,
					address            : null,
					message            : null,
				});
				alertActions.openAlert({
					message  : "Te enviaremos un correo con tu cotización",
					type     : "success",
					duration : 3e3,
				});
			} else {
				alertActions.openAlert({
					message  : "Ocurrió un error al enviar la cotización.",
					type     : "error",
					duration : 3e3,
				});
			}
		}
		setOpen(false);
	}, [formData, alertActions]);

	const theme      = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

	const [open, setOpen] = useState(false);

	const handleClickOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleClickClose = () => {
		setOpen(false);
	};

	const handleChangEexchageCurrency = (event) => {
		setFormData({ ...formData, exchage_currency : event.target.checked });
	};

	return (
		<Quotation delegations={{
			formData,
			product,
			fullScreen,
			open,
			handleClickOpen,
			handleClickClose,
			handleChange,
			handleSubmitForm,
			handleChangEexchageCurrency,
		}} />
	);
};

QuotationContainer.propTypes = {
	alertActions : PropTypes.object.isRequired,
	product      : PropTypes.any,
};

const mapDispatchToProps = bindAll({ AlertActions });

export default connect(null, mapDispatchToProps)(QuotationContainer);
