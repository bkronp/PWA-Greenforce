/* eslint-disable react-hooks/exhaustive-deps */
import {
	useEffect,
	useCallback,
	useState,
	useMemo,
} from "react";
import { useRouter } from "next/router";
import PropTypes     from "prop-types";

// Import Own Components
import { bindAll }     from "~/Util";
import Service         from "~/Service";
import withStateLoaded from "~/Store/withStateLoaded";
import AlertActions    from "~/Components/Alert/store/actions";
import Products        from "./Products.jsx";
import Swal from "sweetalert2";



const ProductsContainer = ({ alertActions, token }) => {
	const router = useRouter();
	let timer;

	const [page, setPage]               = useState(0);
	const [tabValue, setTabValue]       = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [tableData, setTableData]     = useState(10);
	const [filter, setFilter]           = useState("");
	const [product, setProduct] 		= useState([]);

	const handleChange = useCallback((event, newValue) => {
		setTabValue(newValue);
		setPage(0);
	}, []);
	const handleChangeInput = useCallback(({ target : { value } }) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			setFilter(value);
		  }, 300);
	}, []);

	const handleChangePage = useCallback((event, newPage) => {
		setPage(newPage);
	}, []);

	const handleChangeRowsPerPage = useCallback((event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}, []);

	const activePage = useCallback((event, value) => {
		setPage(value);
	}, []);

	const goToAddProduct = useCallback(() => router.push("/admin/products/add"), [router]);

	const goToEditProduct = useCallback(productId => () => {
		router.push(`/admin/products/edit/${productId}`);
	}, [router]);

	const goToDelete = useCallback (async (productId) => {

		Swal.fire({
			title: 'Se eliminara el producto',
			text: "No se puede deshacer la operación",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText : 'Cancelar',
			confirmButtonText: 'Si, borrarlo'
		  }).then(async (result) => {
			if (result.isConfirmed) {
				const response = await Service.api.deleteProduct(productId);
				if(response.label == 'success'){
					Swal.fire(
					  'Eliminado!',
					  'El producto se borro',
					  'success'
					);
					router.push("/admin"), [router];
				}else {
					alertActions.openAlert({
						message  : "¡El producto se elimino con éxito!",
						type     : "success",
						duration : 3e3,
					});
					router.push("/admin"), [router];
				}

			}

		  })
	});

	useEffect(() => {
		(async () => {
			const response = tabValue === 0 ?
				await Service.api.getProducts(
					page + 1,
					`page_size=${rowsPerPage}
					&filter=${filter}`,
					token)
				:
				await Service.api.getProducts(
					page + 1,
					`&page_size=${rowsPerPage}
					&filter=${filter}
					&only_offered=true
					`,
					token);
			setTableData({
				...tableData,
				rowsData   : response.body?.collection,
				pagination : response.body?.pagination,
				message    : response.body?.collection?.length > 0 ? "" : "Aún no hay registros",
			});
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, tabValue, rowsPerPage, filter]);


	const columns = useMemo(() => [
		{
			title : "id",
			field : "id",
		},
		{
			title : "imagen",
			field : "img",
		},
		{
			title : "Nombre",
			field : "name",
		},
		{
			title : "Presentación",
			field : "presentation",
		},
		{
			title : "Acciones",
			field : "actions",
		},
	], []);

	return (
		<Products
			delegations={{
				goToAddProduct,
				goToEditProduct,
				goToDelete,
				handleChange,
				handleChangeInput,
				handleChangePage,
				handleChangeRowsPerPage,
				activePage,
				tableData,
				page,
				tabValue,
				rowsPerPage,
				filter,
				columns,
			}}
		/>
	);
};


ProductsContainer.propTypes = {
	alertActions : PropTypes.object,
	token        : PropTypes.any,
};

const mapStateToProps = ({ userReducer : { admin } }) => ({
	token : admin?.token || null,
});

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(ProductsContainer);
