import { useCallback, useMemo } from "react";
import { useRouter }            from "next/router";
import {
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";

// Import Own Components
import {
	FaHome,
	// FaUser,
} from "~/Resources/icons/far";
import {
	FaFileInvoiceDollar,
	FaTag,
	FaCog,
} from "~/Resources/icons/fal";
import useStyles               from "./styles";

const useAdminRoutes = () => {
	const router  = useRouter();
	const classes = useStyles();

	const makeRedirectFn = useCallback(url => unMountComponent => () => {
		if (url === router.pathname) {
			return unMountComponent ? unMountComponent() : undefined;
		}

		router.push(url);
	}, [router]);

	const routes = useMemo(() => [
		[makeRedirectFn("/admin"), "Inicio", FaHome],
		[makeRedirectFn("/admin/products"), "Productos", FaTag],
		// [makeRedirectFn("/admin/users"), "Usuarios", FaUser],
		// [makeRedirectFn("/admin/quotation"), "Cotizaciones", FaFileInvoiceDollar],
		[makeRedirectFn("/admin/config"), "Configuración", FaCog],
	], [makeRedirectFn]);

	const mapedRoutesForUsage = useMemo(() => routes.map(([redirectFn, label, Icon]) => ({
		redirectFn,
		components : (
			<>
				<ListItemIcon className={classes.icon}>
					<Icon />
				</ListItemIcon>

				<ListItemText primary={label} className={classes.label} />
			</>
		),
	})), [routes, classes.icon, classes.label]);

	return mapedRoutesForUsage;
};

export default useAdminRoutes;
