/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useEffect,
	useCallback,
	useState,
} from "react";
import PropTypes     from "prop-types";

// Import Own Components
import { bindAll }     from "~/Util";
// import Service         from "~/Service";
import withStateLoaded from "~/Store/withStateLoaded";
import AlertActions    from "~/Components/Alert/store/actions";
import Configuration       from "./Configuration.jsx";


const ConfigurationContainer = ({ alertActions }) => {

	const [catalogues, setCatalogues] =  useState({
		categories          : [],
		features            : [],
		patents             : [],
		presentations       : [],
		yield_presentations : [],
		yields              : [],
		products_related    : [],
	});

	const [configs, setConfigs] = useState({});

	const logWarning = message => {
		alertActions.openAlert({
			message,
			type     : "warning",
			duration : 2000,
		});
	};


	const filterCatalogue = name => ({ target :{ value } }) => {
		setConfigs((prevState) => ({
			...prevState,
			[name] : {
				...prevState[name],
				catalogue : catalogues[name].filter( i => i.name.toUpperCase().includes(value.toUpperCase())),
			},
		}));
	};

	const toggleEditMode = (name, idx, mode) => {
		setConfigs((prevState) => ({
			...prevState,
			[name] : {
				...prevState[name],
				catalogue : prevState[name].catalogue.map((i, idy) => idy === idx ? { ...i, edit : mode } : i),
			},
		}));
	};

	const handleEditChange = (name, idx, field, value) => {
		setConfigs((prevState) => ({
			...prevState,
			[name] : {
				...prevState[name],
				catalogue : prevState[name].catalogue.map((i, idy) => idy === idx ? { ...i, [field] : value } : i),
			},
		}));
	};

	const cancelEditMode = (name, idx) => {
		setConfigs((prevState) => ({
			...prevState,
			[name] : {
				...prevState[name],
				catalogue : prevState[name].catalogue.map((i, idy) => idy === idx ?  catalogues[name][idx] : i),
			},
		}));
	};

	const handleNewItemChange = (name, value) => {
		setConfigs((prevState) => ({
			...prevState,
			[name] : {
				...prevState[name],
				newItem : value,
			},
		}));
	};

	const saveEditions = async (name, idx) => {
		if (!configs[name].catalogue[idx].name) {
			return logWarning(configs[name].noNameError);
		}

		const requestOptions = {
			method : "PATCH",
			body   : JSON.stringify({
				id   : configs[name].catalogue[idx].id,
				name : configs[name].catalogue[idx].name,
			}),
		};

		const success = await fetch(`/api/catalogues/${name}/edit`, requestOptions);

		if (success.ok) {
			alertActions.openAlert({
				message  : configs[name].successMessage,
				type     : "success",
				duration : 3e3,
			});
			toggleEditMode(name, idx, false);
			getData();
		} else {
			alertActions.openAlert({
				message  : configs[name].errorMessage,
				type     : "error",
				duration : 3e3,
			});
		}
	};

	const deleteItem = (name, idx) => {
		console.log(configs[name].catalogue[idx]);
		
	};
	

	const saveNewItem = async (name) => {
		if (!configs[name].newItem) {
			return logWarning(configs[name].noNameError);
		}

		const requestOptions = {
			method : "POST",
			body   : JSON.stringify({
				name : configs[name].newItem,
			}),
		};

		const success = await fetch(`/api/catalogues/${name}/create`, requestOptions);

		if (success.ok) {
			alertActions.openAlert({
				message  : configs[name].successMessage,
				type     : "success",
				duration : 3e3,
			});
			getData();
		} else {
			alertActions.openAlert({
				message  : configs[name].errorMessage,
				type     : "error",
				duration : 3e3,
			});
		}
	};

	const getData = useCallback(() => {
		(async () => {
			try {
				const requestOptions = {
					method : "GET",
				};
				const response       = await fetch("/api/products/catalogues", requestOptions);

				if (response?.ok) {
					const {
						categories,
						features,
						patents,
						presentations,
						yields,
					} = await response.json();

					setCatalogues(
						{
							categories    : categories.map(i=> ({ ...i, edit : false })).reverse(),
							features      : features.map(i=> ({ ...i, edit : false })).reverse(),
							patents       : patents.map(i=> ({ ...i, edit : false })).reverse(),
							presentations : presentations.map(i=> ({ ...i, edit : false })).reverse(),
							yields        : yields.map(i=> ({ ...i, edit : false })).reverse(),
						}
					);

					setConfigs({
						presentations : {
							title             : "Presentaciones",
							name              : "presentations",
							hide              : false,
							addPlaceHolder    : "Agregar nueva presentación",
							searchPlaceHolder : "Filtrar presentaciones",
							columns           : [
								{
									title : "Nombre",
									field : "name",
									width : "65%",
								},
								{
									title : "Acciones",
									field : "actions",
									width : "35%",
								},
							],
							catalogue      : presentations.map(i=> ({ ...i, edit : false })).reverse(),
							missing        : "No hay presentaciones guardadas",
							newItem       	: "",
							successMessage : "Se ha guardado la presentación correctamente",
							errorMessage   : "Ha sucedido un error al guardar la presentación",
							noNameError    : "Es necesario escribir un nombre de presentación",
						},
						categories : {
							title             : "Categorías",
							name              : "categories",
							hide              : true,
							addPlaceHolder    : "Agregar nueva categoría",
							searchPlaceHolder : "Filtrar categorías",
							columns           : [
								{
									title : "Nombre",
									field : "name",
									width : "65%",
								},
								{
									title : "Acciones",
									field : "actions",
									width : "35%",
								},
							],
							catalogue      : categories.map(i=> ({ ...i, edit : false })).reverse(),
							missing        : "No hay categorías guardadas",
							newItem       	: "",
							successMessage : "Se ha guardado la categoría correctamente",
							errorMessage   : "Ha sucedido un error al guardar la categoría",
							noNameError    : "Es necesario escribir un nombre de categoría",
						},
						features : {
							title             : "Características",
							name              : "features",
							hide              : false,
							addPlaceHolder    : "Agregar nueva característica",
							searchPlaceHolder : "Filtrar características",
							columns           : [
								{
									title : "Nombre",
									field : "name",
									width : "65%",
								},
								{
									title : "Acciones",
									field : "actions",
									width : "35%",
								},
							],
							catalogue      : features.map(i=> ({ ...i, edit : false })).reverse(),
							missing        : "No hay características guardadas",
							newItem       	: "",
							successMessage : "Se ha guardado la característica correctamente",
							errorMessage   : "Ha sucedido un error al guardar la característica",
							noNameError    : "Es necesario escribir un nombre de característica",
						},
						patents : {
							title             : "Patentes",
							name              : "patents",
							hide              : true,
							addPlaceHolder    : "Agregar nueva patente",
							searchPlaceHolder : "Filtrar patentes",
							columns           : [
								{
									title : "Nombre",
									field : "name",
									width : "65%",
								},
								{
									title : "Acciones",
									field : "actions",
									width : "35%",
								},
							],
							catalogue      : patents.map(i=> ({ ...i, edit : false })).reverse(),
							missing        : "No hay patentes guardadas",
							newItem       	: "",
							successMessage : "Se ha guardado la patente correctamente",
							errorMessage   : "Ha sucedido un error al guardar la patente",
							noNameError    : "Es necesario escribir un nombre de patente",
						},
					});
					catalogues;
				}
				else
					throw response;
			} catch (error) {
				//console.log(error);
			}
		})();
	}, []);

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<Configuration
			configs={configs}
			delegations ={{
				filterCatalogue,
				toggleEditMode,
				handleEditChange,
				cancelEditMode,
				saveEditions,
				deleteItem,
				saveNewItem,
				handleNewItemChange,
			}}
		/>
	);
};


ConfigurationContainer.propTypes = {
	alertActions : PropTypes.object,
	token        : PropTypes.any,
};

const mapDispatchToProps = bindAll({
	alertActions : AlertActions,
});

export default withStateLoaded(null, mapDispatchToProps)(ConfigurationContainer);
