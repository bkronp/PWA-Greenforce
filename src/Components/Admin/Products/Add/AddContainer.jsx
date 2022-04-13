/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import {
	useState,
	useCallback,
	useEffect,
} from "react";
import PropTypes   from "prop-types";
import { connect } from "react-redux";
import { bindAll } from "~/Util";
import { useRouter } from "next/router";

// Import own Components
import Add from "./Add.jsx";
import {
	Base64,
} from "~/Util";
import AlertActions from "~/Components/Alert/store/actions";

const AddContainer = ({
	alertActions,
}) => {
	const router = useRouter();

	const [catalogues, setCatalogues] =  useState({
		categories          : [],
		features            : [],
		patents             : [],
		presentations       : [],
		yield_presentations : [],
		yields              : [],
		products_related    : [],
	});

	const [data, setData]  = useState({
		name             : "",
		description      : "",
		youtube_link     : "",
		on_offer         : false,
		presentation     : {},
		datasheet        : "",
		category         : {},
		yilds            : {},
		patents          : [],
		products_related : [],
	});

	const [dataImg, setDataImg] = useState({
		images : [],
	});

	const [dataFeatures, setFeatures] = useState({
		features : [],
	});

	const [yieldPresentations, setYieldPresentations] = useState([]);

	const [btn, setBtn] = useState(true);

	const getData = useCallback(() => {
		(async () => {
			try {
				const requestOptions = {
					method : "GET",
				};
				const response       = await fetch("/api/products/catalogues", requestOptions);
				let products_related = await fetch("/api/products/page/1=page_size=500");
				products_related     = await products_related.json();

				products_related = products_related.collection.reduce((accum, product) => [...accum, {
					id   : product.id,
					name : `${product.name} ${product.presentation}`,
				}], []);

				if (response?.ok) {
					const {
						categories,
						features,
						patents,
						presentations,
						yield_presentations,
						yields,
					} = await response.json();
					setYieldPresentations(yield_presentations);
					setCatalogues(
						{
							categories,
							features,
							patents,
							presentations,
							yields,
							yield_presentations : [],
							products_related    : products_related,
						}
					);
				}
				else
					throw response;
			} catch (error) {
				//console.log(error);
			}
		})();
	}, []);
	const handleMultiSelect = useCallback(name => (evnt, newInputValue) => {
		setData({
			...data,
			[name] : [
				...newInputValue,
			],
		});
	}, [data]);

	const handleChange = useCallback(name => ({ target : { value } }) => {
		setData({
			...data,
			[name] : value,
		});
	}, [data]);

	const handleOnOffer = useCallback(() => {
		setData({
			...data,
			on_offer : !data.on_offer,
		});
	}, [data]);

	const handleSelect = useCallback(name => (evnt, newInputValue) => {
		if (name === "yields") {
			setCatalogues({
				...catalogues,
				yield_presentations :
					yieldPresentations.reduce(
						(accum, yieldP) => yieldP.yield_id === newInputValue.id
							? [...accum, yieldP]
							: accum,
						[]),
			});
		}

		setData({
			...data,
			[name] : newInputValue != null ? newInputValue : null,
		});
	}, [data, yieldPresentations, catalogues]);

	const handleChangeDataSheet = useCallback(
		(name) => ({ target: { files } }) => {
			const file = files[0];
			if (file.type !== "application/pdf") {
				alertActions.openAlert({
					message  : "La ficha técnica debe ser un PDF",
					type     : "warning",
					duration : 3e3,
				});
				return;
			}
			if (!btn) setBtn(true);
			Base64.imageToBase64(file, imageInBase64 => {
				setData({ ...data, datasheet : imageInBase64 });
			});
		}, [data]
	);

	const handleSubmit = async () => {
		setBtn(false);

		const newImages = [];

		for (const { src } of dataImg.images) {
			newImages.push(src);
		}

		const submittingData = {
			name        : data.name,
			description : data.description,
			category_id : data.category.id,
			datasheet   : data.datasheet,
			images      : newImages,
			features    : dataFeatures.features.reduce((acc, { id, label }) => ({
				...acc,
				[id] : label,
			}), {}),
			presentation_id : data.presentation?.id || null,
			youtube_link    : data.youtube_link || undefined,
		};

		submittingData.yields = data.yield_presentations
			? data.yield_presentations.reduce((accum, yieldPresentation) => [...accum, yieldPresentation.id], [])
			: undefined;

		submittingData.patents = data.patents
			? data.patents.reduce((accum, patent) => [...accum, patent.id], [])
			: undefined;

		submittingData.products_related = data.products_related
			? data.products_related.reduce((accum, product) => [...accum, product.id], [])
			: undefined;

		const logWarning = message => {
			alertActions.openAlert({
				message,
				type     : "warning",
				duration : 2000,
			});

			setBtn(true);
		};

		if (!submittingData.name) {
			return logWarning("Necesitas agregar un nombre para el producto.");
		}

		if (!submittingData.description) {
			return logWarning("Necesitas agregar la descripción del producto");
		}

		if (typeof submittingData.category_id !== "number") {
			return logWarning("Selecciona una categoría.");
		}

		if ((submittingData?.image_ids?.length + submittingData?.images?.length) <= 0) {
			return logWarning("Tienes que agregar al menos una imagen para el producto.");
		}

		if (Object.keys(submittingData.features).length <= 0) {
			return logWarning("Selecciona una caracteristica del producto.");
		}

		if (!submittingData.datasheet) {
			return logWarning("Selecciona una ficha técnica");
		}

		const requestOptions = {
			method : "POST",
			body   : JSON.stringify({
				...submittingData,
			}),
		};

		const success = await fetch("/api/products/create", requestOptions);

		if (success.ok) {
			alertActions.openAlert({
				message  : "¡El producto se agregó con éxito!",
				type     : "success",
				duration : 3e3,
			});
			router.push("/admin/products"), [router];
		} else {
			alertActions.openAlert({
				message  : "Ocurrió un error al subir el producto.",
				type     : "error",
				duration : 3e3,
			});
		}
	};

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<Add
			delegations={{
				data,
				catalogues,
				dataImg,
				handleChange,
				handleSelect,
				handleChangeDataSheet,
				handleOnOffer,
				handleMultiSelect,
				dataFeatures,
				setFeatures,
				setDataImg,
				btn,
				handleSubmit,
			}}
		/>
	);
};

AddContainer.propTypes = {
	alertActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ AlertActions });

export default connect(null, mapDispatchToProps)(AddContainer);
