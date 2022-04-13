/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import {
	useMemo,
	useState,
	useEffect,
	useCallback,
} from "react";
import { useRouter } from "next/router";
import _             from "lodash";
//
import ProductDetails from "./ProductDetails";

import banner01 from "~/Resources/banners/banner.nutricion.vegetal.png";
import banner02 from "~/Resources/banners/banner.proteccion.de.cultivos.png";

const ProductDetailContainer = () => {
	const router = useRouter();
	const [params, setParams] = useState({
		categoryId : null,
		productId  : null,
	});

	const banner = {
		1 : banner01,
		2 : banner02,
	};

	const categories = useMemo(() => [
		{
			id   : 1,
			name : "nutricion-vegetal",
		},
		{
			id   : 2,
			name : "proteccion-de-cultivos",
		},
	], []);

	const [tabValue, setTabValue]       = useState(0);
	const [dataProduct, setDataProduct] = useState({
		title       : "",
		subtitle    : "",
		description : "",
		feactures   : "",
		images      : [],
	});

	const downloadDataSheet = (src) => {
		window.open(`/api/images/products/${src}`, "_blank");
	};

	const tabs = useMemo(() => [
		{
			label : "Composición garantizada",
		},
	], []);

	const handleChange =  useCallback((event, newValue) => {
		setTabValue(newValue);
	}, []);


	useEffect(() => {
		(async () => {
			const { id, category } = router.query;

			const categoryId = _.filter(categories, (ctg) =>
				ctg.name === category,
			)[0]?.id;
			setParams({
				categoryId : categoryId,
				productId  : id,
			});
		})();
	}, [categories, router]);

	return (
		<>
			{ params.productId != null &&
				<ProductDetails
					delegations={{
						tabs,
						tabValue,
						dataProduct,
						handleChange,
						downloadDataSheet,
						params,
						banner,
					}}
				/>}
		</>
	);
};
export default ProductDetailContainer;
