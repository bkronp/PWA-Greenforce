import { useCallback, useState } from "react";
import { connect }               from "react-redux";
import PropTypes                 from "prop-types";
// import own components

import Contact 		from "./Contact";
import Service 		from "~/Service";
import Banner		from "~/Resources/banners/bannerContacto.png";
import { bindAll } 	from "~/Util";
import AlertActions from "~/Components/Alert/store/actions";

const ContactContainer = ({
	alertActions,
}) => {

	const [formData, setFormData] = useState({
		customerName : null,
		email        : null,
		telephone    : null,
		yield        : null,
		product      : null,
		address      : null,
		message      : null,
		customerType : null,
	});

	const updateFormData = useCallback(newData => setFormData(prevData => ({ ...prevData, ...newData })), []);

	const handleChange = useCallback(({ target : { name, value } }) => updateFormData({
		[name] : value,
	}), [updateFormData]);

	const handleSubmitForm = useCallback(async (data) => {
		const success = await Service.api.sendContact(formData);
		if (success) {
			setFormData({
				customerName : null,
				email        : null,
				telephone    : null,
				yield        : null,
				product      : null,
				address      : null,
				message      : null,
				customerType : null,
			});
			alertActions.openAlert({
				message  : "¡Gracias por contactarnos, nos pondremos en contacto",
				type     : "success",
				duration : 3e3,
			});
		} else {
			alertActions.openAlert({
				message  : "Ocurrió un error al enviar el cotacto.",
				type     : "error",
				duration : 3e3,
			});
		}
	}, [formData, alertActions]);

	return (
		<Contact delegations={{ formData, handleChange, handleSubmitForm, Banner }} />
	);
};

ContactContainer.propTypes = {
	alertActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ AlertActions });

export default connect(null, mapDispatchToProps)(ContactContainer);
