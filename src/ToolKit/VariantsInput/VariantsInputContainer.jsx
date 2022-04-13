import {
	useState,
	useCallback,
	useMemo,
} from "react";

// Import Own Components
import VariantsInput from "./VariantsInput.jsx";

const VariantsInputContainer = (props) => {
	const [anchorEl, setAnchorEl] = useState();

	const handleOpen  = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
	const handleClose = useCallback(() => setAnchorEl(null), []);

	const formatter = useMemo(() => new Intl.NumberFormat("en-US", {
		style                 : "currency",
		currency              : "USD",
		minimumFractionDigits : 2,
	}), []);

	return (
		<VariantsInput
			delegations={{
				formatter,
				anchorEl,
				handleOpen,
				handleClose,
			}}
			{...props}
		/>
	);
};

export default VariantsInputContainer;
