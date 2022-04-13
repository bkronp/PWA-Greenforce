/* eslint-disable react-hooks/exhaustive-deps */
import {
	useMemo,
	useCallback,
} from "react";
import PropTypes     from "prop-types";
import { connect }   from "react-redux";
import { useTheme }  from "@material-ui/core";
import { useRouter } from "next/router";

// Import Own Components
import DialogActions            from "~/Components/Dialog/store/actions";
import CreateFeature            from "~/Components/Admin/Products/Add/components/CreateFeature";
import { bindAll }              from "~/Util";
import Features                 from "./Features.jsx";

const handleDelete = (position, setFeatures) => {
	setFeatures(({ features = [], ...prevState }) => {
		const newFeatures = [...features];

		newFeatures.splice(position, 1);

		return {
			...prevState,
			features : newFeatures,
		};
	});
};

const handleSelection = (selectedOption, setFeatures, features = []) => {
	if (selectedOption && typeof selectedOption.id !== "undefined") {
		const alreadyDefined = features.filter(({ id }) => id === selectedOption.id).length > 0;

		if (!alreadyDefined) {
			setFeatures(({ features, ...prevState }) => {
				const newFeatures = [
					...features,
					{
						id    : selectedOption.id || null,
						name  : selectedOption.name || "",
						label : "",
					},
				];

				return {
					...prevState,
					features : newFeatures,
				};
			});
			return true;
		}
	}
};

const handleLabelChange = (position, value = "", setFeatures) => {
	setFeatures(({ features = [], ...prevState }) => {
		const newFeatures = [...features];

		newFeatures.splice(position, 1, {
			...(features[position] || {}),
			label : value,
		});

		return {
			...prevState,
			features : newFeatures,
		};
	});
};

const handleCreateNewFeature = (dialogActions, theme) => {
	dialogActions.openDialog({
		title   : "Crear rasgo nuevo",
		size    : "xs",
		content : CreateFeature,
		cancel  : true,
		ok      : {
			text  : "Aceptar",
			color : theme.palette.primary.main,
		},
	});
};

const FeaturesContainer = ({
	dialogActions,
	featuresData,
	dataFeatures : {
		features,
	},
	setFeatures,
	delegations : {
		setBtn,
	},
}) => {
	const theme  = useTheme();
	const router = useRouter();

	const isAdmin = useMemo(() => router.pathname.includes("/admin"), [router.pathname]);

	const handleDeleteMethod = useCallback(position => {
		setBtn(true);
		handleDelete(position, setFeatures);
	}, []);

	const handleSelectionMethod = useCallback(option => {
		const response = handleSelection(option, setFeatures, features);
		if (response) setBtn(true);
		return response;
	}, [features]);

	const handleLabelChangeMethod = useCallback(
		(position, value) => {
			setBtn(true);
			handleLabelChange(position, value, setFeatures);
		}, []
	);

	const handleCreateNewFeatureMethod = useCallback(() => handleCreateNewFeature(dialogActions, theme), [theme]);

	return (
		<Features
			delegations={{
				features,
				featuresData,
				handleDelete           : handleDeleteMethod,
				handleSelection        : handleSelectionMethod,
				handleLabelChange      : handleLabelChangeMethod,
				handleCreateNewFeature : handleCreateNewFeatureMethod,
				isAdmin,
			}}
		/>
	);
};

FeaturesContainer.propTypes = {
	dialogActions : PropTypes.object.isRequired,
	featuresData  : PropTypes.object.isRequired,
	dataFeatures  : PropTypes.object.isRequired,
	setFeatures   : PropTypes.func.isRequired,
	delegations   : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ DialogActions });

export default connect(null, mapDispatchToProps)(FeaturesContainer);
