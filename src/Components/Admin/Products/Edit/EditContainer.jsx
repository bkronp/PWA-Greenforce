/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindAll } from "~/Util";
import { useRouter } from "next/router";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
// Import own Components
import Edit from "./Edit.jsx";
import {
	Base64,
} from "~/Util";
import AlertActions from "~/Components/Alert/store/actions";
import ApiMethods from "~/Service/generalMethods";
import useStyles from "./styles";

const EditContainer = ({ alertActions }) => {
	const router = useRouter();
	const classes = useStyles();

	const [catalogues, setCatalogues] = useState({
		categories          : [],
		features            : [],
		patents             : [],
		presentations       : [],
		yield_presentations : [],
		yields              : [],
		products_related    : [],
	});

	const [data, setData] = useState({
		name             : "",
		description      : "",
		youtube_link     : "",
		datasheet        : "",
		on_offer         : 0,
		presentation     : {},
		category         : {},
		yields           : {},
		patents          : [],
		products_related : [],
	});

	const [dataImg, setDataImg] = useState({
		images : [],
	});

	const [imagesRecord, setImagesRecord] = useState([]);

	const [dataFeatures, setFeatures] = useState({
		features : [],
	});

	const [yieldPresentations, setYieldPresentations] = useState([]);

	const [btn, setBtn] = useState(false);

	const [productId, setProductId] = useState(null);

	const [fetchedAllData, setFetchedAllData] = useState(false);

	useEffect(() => {
		(async () => {
			const { id } = router.query;
			setProductId(id);
		})();
	}, [router]);


	const getData = useCallback(() => {
		(async () => {
			try {
				const requestOptions = {
					method : "GET",
				};
				const response = await fetch("/api/products/catalogues", requestOptions);
				let products_related = await fetch("/api/products/page/1=page_size=500");
				products_related = await products_related.json();

				products_related = products_related.collection.reduce(
					(accum, product) => [
						...accum,
						{
							id                 : product.id,
							name               : `${product.name} ${product.presentation}`,
							product_related_id : product.products_related_id,
						},
					],
					[],
				);

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
					setCatalogues({
						categories,
						features,
						patents,
						presentations,
						yields              : yields?.map((i) => ({ id : i.id, name : i.name })) || yields,
						yield_presentations : [],
						products_related    : products_related,
					});
				} else throw response;

				let product_data;
				if (router.query.id) {
					product_data = await ApiMethods.getProductDetails(productId || router.query.id);
				} else {
					const product_id = window?.location.pathname.split("/").slice(-1)[0];
					setProductId(product_id);
					product_data = await ApiMethods.getProductDetails(product_id);
				}

				if (product_data.status) {
					const { body } = product_data;
					setData({
						name                : body.name,
						description         : body.description,
						youtube_link        : body.youtube_link,
						on_offer            : body.on_offer,
						presentation        : { id : body.presentation_id, name : body.presentation },
						category            : { id : body.category_id, name : body.category },
						yield_presentations : body.yield_presentations,
						yields              : {
							id   : body.yield_presentations[0]?.yield_id,
							name : body.yield_presentations[0]?.yield_name,
						},
						datasheet        : body.datasheet,
						// yields: body.yield_presentations,
						patents          : body.patents,
						products_related : body.products_related.map((productRelated) => ({
							id                 : productRelated.id,
							name               : productRelated.name,
							product_related_id : productRelated.product_related_id,
						})),
					});

					setFeatures({ features : body.features });
					setDataImg({ images : body.images.map((i)=>({ src : i.md })) });
					setImagesRecord(body.images_ids);


				} else throw product_data;

				setFetchedAllData(true);
			} catch (error) {
				//console.log(error);
			}
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleMultiSelect = useCallback(
		(name) => (_, newInputValue) => {
			if (!btn) setBtn(true);
			setData({
				...data,
				[name] : [...newInputValue],
			});
		},
		[data],
	);

	const handleChange = useCallback(
		(name) => ({ target: { value } }) => {
			if (!btn) setBtn(true);
			setData({
				...data,
				[name] : value,
			});
		},
		[data],
	);

	const handleChangeDataSheet = useCallback(
		(name) => ({ target: { files } }) => {
			const file = files[0];
			if (file.type !== "application/pdf") {
				alertActions.openAlert({
					message  : "La ficha técnica debe ser un PDF.",
					type     : "warning",
					duration : 3e3,
				});
				return;
			}
			if (!btn) setBtn(true);
			Base64.imageToBase64(file, imageInBase64 => {
				setData({ ...data, datasheet : imageInBase64 });
			});
		}, [data],
	);

	const handleOnOffer = useCallback(() => {
		if (!btn) setBtn(true);
		setData({
			...data,
			on_offer : !data.on_offer,
		});
	}, [data]);

	const handleSelect = useCallback(
		(name) => (_, newInputValue) => {
			if (!btn) setBtn(true);
			if (name === "yields") {
				setCatalogues({
					...catalogues,
					yield_presentations : yieldPresentations.reduce(
						(accum, yieldP) => (yieldP.yield_id === newInputValue.id ? [...accum, yieldP] : accum),
						[],
					),
				});
			}

			setData({
				...data,
				[name] : newInputValue != null ? newInputValue : null,
			});
		},
		[data, yieldPresentations, catalogues],
	);

	const handleSubmit = async () => {
		setBtn(false);

		const submittingData = {
			id          : productId,
			name        : data.name,
			description : data.description,
			on_offer    : data.on_offer,
			datasheet   : data.datasheet,
			category_id : data.category.id,
			images      : imagesRecord,
			features    : dataFeatures.features.reduce(
				(acc, { id, label }) => ({
					...acc,
					[id] : label,
				}),
				{},
			),
			presentation_id : data.presentation?.id || null,
			youtube_link    : data.youtube_link || undefined,
		};

		submittingData.yields = data.yield_presentations
			? data.yield_presentations.reduce(
				(accum, yieldPresentation) => [...accum, yieldPresentation.id],
				[],
			  )
			: undefined;

		submittingData.patents = data.patents
			? data.patents.reduce((accum, patent) => [...accum, patent.id], [])
			: undefined;

		submittingData.products_related = data.products_related
			? data.products_related.reduce((accum, product) => [...accum, product.product_related_id], [])
			: undefined;

		const logWarning = (message) => {
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

		if (submittingData?.images <= 0) {
			return logWarning("Tienes que agregar al menos una imagen para el producto.");
		}

		if (Object.keys(submittingData.features).length <= 0) {
			return logWarning("Selecciona una característica del producto.");
		}

		const requestOptions = {
			method : "PATCH",
			body   : JSON.stringify({
				...submittingData,
			}),
		};

		const success = await fetch("/api/products/edit", requestOptions);

		if (success.ok) {
			alertActions.openAlert({
				message  : "¡El producto se editó con éxito!",
				type     : "success",
				duration : 3e3,
			});
			router.push("/admin/products"), [router];
		} else {
			alertActions.openAlert({
				message  : "Ocurrió un error al guardar el producto.",
				type     : "error",
				duration : 3e3,
			});
		}
	};

	const handleCancel = useCallback(() => router.push("/admin/products"), [router]);

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<>{fetchedAllData ? (<Edit
			delegations={{
				data,
				catalogues,
				dataImg,
				imagesRecord,
				dataFeatures,
				handleChange,
				handleSelect,
				handleChangeDataSheet,
				handleOnOffer,
				handleMultiSelect,
				setFeatures,
				setDataImg,
				setImagesRecord,
				btn,
				setBtn,
				handleSubmit,
				handleCancel,
			}}
		/>) : (
			<Backdrop className={classes.backdrop} open>
				<CircularProgress color="inherit" />
			</Backdrop>
		)}
		</>
	);
};

EditContainer.propTypes = {
	alertActions : PropTypes.object.isRequired,
	product_id   : PropTypes.number.isRequired,
};

const mapDispatchToProps = bindAll({ AlertActions });

export default connect(null, mapDispatchToProps)(EditContainer);
