/* eslint-disable no-unused-vars */

import {
	useState,
	useEffect,
	forwardRef,
} from "react";
import { useRouter } from "next/router";
import _             from "lodash";
import {
	Dialog,
	Slide,
	AppBar,
	Toolbar,
	IconButton,
	Divider,
	Typography,
	DialogContent,
} from "@material-ui/core";
import CloseIcon 		from "@material-ui/icons/Close";
//
import banner01 		from "~/Resources/banners/banner.nutricion.vegetal.png";
import banner02 		from "~/Resources/banners/banner.proteccion.de.cultivos.png";
import proviviLogo		from "~/Resources/img/ProviviLogo.png";
import compoExpertLogo	from "~/Resources/img/CompoExpertLogo.png";
import Products 		from "./Products";
import ProviviCarousel 		from "./ProvivCarousel";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const ProductsContainer = () => {
	const router = useRouter();
	const [categories, setCategories] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [scrollTo, setScrollTo]	= useState(null);
	const [params, setParams] = useState({
		categoryId : null,
		productId  : null,
	});
	const [dataProduct, setDataProduct] = useState([]);

	const handleClose = () => {
		setOpenModal(false);
	};

	const banner = {
		1 : banner01,
		2 : banner02,
	};

	const logos = {
		1 : { img : compoExpertLogo, alt : "Nutrición Vegetal" },
		2 : { img : proviviLogo, alt : "Protección de Cultivos" },
	};

	useEffect(() => {
		(async () => {
			const { id, category } = router.query;
			setScrollTo(router.asPath.includes("#") ? router.asPath.split("#")[1] : "0");
			if (id === "1") {
				setCategories([1,2,3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
			} else {
				setCategories([]);
			}
			setParams({
				categoryId : [1,2,3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(parseInt(id)) ? "1" : id,
				category   : category,
			});
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router, router.asPath]);

	return (
		<>
			{ params.categoryId != null &&
				<Products
					delegations={{
						params,
						banner,
						logos,
						dataProduct,
						categories,
						setOpenModal,
						scrollTo,
					}}
				/>}
			<Dialog fullScreen open={openModal} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6">
							Provivi FAW
						</Typography>
					</Toolbar>
				</AppBar>
				<Divider style={{ height : "65px" }} />
				<DialogContent>
					<ProviviCarousel />
				</DialogContent>
				<Divider />
			</Dialog>
		</>
	);
};
export default ProductsContainer;
