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
import Quotation       from "./Quotation.jsx";


const QuotationContainer = ({ alertActions, token }) => {
	const router = useRouter();

	const [page, setPage]               = useState(0);
	const [tabValue, setTabValue]       = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [tableData, setTableData]     = useState(10);
	const [filter, setFilter]           = useState("");
	const [employee, setEmployee]       = useState({});
	const [flag, setFlag]               = useState(false);

	const handleChange = useCallback((event, newValue) => {
		setTabValue(newValue);
		setPage(0);
	}, []);
	const handleChangeInput = useCallback(({ target : { value } }) => {
		setFilter(value);
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

	const goToAddProduct = useCallback(() => router.push("/admin/quotation"), [router]);

	const label = useCallback((label) => {
		switch (label.toString()) {
			case "REQUESTED" :
				return "Nuevo";
			case "CANCELED" :
				return "Cancelado";
			case "FINISHED" :
				return "Finalizado";
			case "RUNNING" :
				return "En proceso";
		}}, []);

	const color = useCallback((label) => {
		switch (label.toString()) {
			case "REQUESTED" :
				return "#55cc69";
			case "CANCELED" :
				return "#cc5555";
			case "FINISHED" :
				return "#5690bf";
			case "RUNNING" :
				return "#41c1d6";
		}}, []);

	useEffect(() => {
		(async () => {
			let qs = "";
			switch (tabValue) {
				case 0:
					qs = `page_size=${rowsPerPage}&status=REQUESTED`;
					break;
				case 1:
					qs = `page_size=${rowsPerPage}&status=RUNNING`;
					break;
				case 3:
					qs = `page_size=${rowsPerPage}&status=CANCELED`;
					break;
				case 2:
					qs = `page_size=${rowsPerPage}&status=FINISHED`;
					break;
				case 4:
					qs = `page_size=${rowsPerPage}`;
					break;
				default:
					qs = `page_size=${rowsPerPage}`;
					break;
			}

			const response = await Service.api.getQuotation(
				page + 1,
				qs,
				token,
			);
			setTableData({
				...tableData,
				rowsData   : response.body?.collection,
				pagination : response.body?.pagination,
				message    : response.body?.collection?.length > 0 ? "" : "Aún no hay registros",
			});
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, tabValue, rowsPerPage, flag]);

	useEffect(() => {
		(async () => {
			const { body : { collection } } = await Service.api.getUsers(
				1,
				"page_size=99&type=employee");
			const employees = (collection.reduce((acc, employee) => ([
				...acc,
				{
					id   : employee.id,
					name : employee.user_name,
				},
			]), []));
			setEmployee(employees);
		})();
	}, []);


	const columns = useMemo(() => [
		{
			title : "Código",
			field : "code",
		},
		{
			title : "Fecha",
			date  : "name",
		},
		{
			title : "Nombre del cliente",
			field : "customer_name",
		},
		{
			title : "Dirección",
			field : "presentation",
		},
		{
			title : "Asignada a",
			field : "user_name",
		},
		{
			title : "Acciones",
			field : "actions",
		},
	], []);

	return (
		<Quotation
			delegations={{
				goToAddProduct,
				handleChange,
				handleChangeInput,
				handleChangePage,
				handleChangeRowsPerPage,
				activePage,
				label,
				color,
				setFlag,
				flag,
				tableData,
				page,
				tabValue,
				rowsPerPage,
				filter,
				columns,
				employee,
			}}
		/>
	);
};


QuotationContainer.propTypes = {
	alertActions : PropTypes.object,
	token        : PropTypes.any,
};

const mapStateToProps = ({ userReducer : { admin } }) => ({
	token : admin?.token || null,
});

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(QuotationContainer);
