/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useCallback,
} from "react";
import PropTypes     from "prop-types";
import { connect }   from "react-redux";
import { useRouter } from "next/router";

// Import own Components
import { bindAll } from "~/Util";
import UserActions from "~/Store/UserStore/actions";
import Header      from "./Header.jsx";


const HeaderContainer = ({ userActions }) => {
	// Handle toggling the user menu
	const router = useRouter();
	const [anchorEl, setAnchorEl]   = useState(null);
	const [anchorEl2, setAnchorEl2] = useState(null);
	const [state, setState]         = useState(false);

	const handleOpen   = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
	const handleOpen2  = useCallback(({ currentTarget }) => setAnchorEl2(currentTarget), []);
	const handleClose  = useCallback(() => setAnchorEl(null), []);
	const handleClose2 = useCallback(() => setAnchorEl2(null), []);

	const toRouter = useCallback(url =>() => {
		router.push(url);
		setAnchorEl(null);
		setState(false);
	}, [router]);

	const toggleDrawer = (open) => (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
		  return;
		}
		setState(open);
		handleClose();
		handleClose2();
	};

	return (
		<Header
			delegations={{
				state,
				anchorEl,
				anchorEl2,
				handleOpen,
				handleClose,
				handleOpen2,
				handleClose2,
				toRouter,
				toggleDrawer,
			}}
		/>
	);
};

HeaderContainer.propTypes = {
	userActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ UserActions });


export default connect(null, mapDispatchToProps)(HeaderContainer);
