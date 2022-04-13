/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import {
	useState,
	useCallback,
	forwardRef,
} from "react";
import { useRouter } from "next/router";
import {
	Slide,
} from "@material-ui/core";


import MissionVision from "./MissionVision";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const AboutDetailContainer = () => {
	const router          = useRouter();
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const toRouter = useCallback(url =>() => {
		router.push(url);
	}, [router]);

	return (
		<MissionVision
			delegations={{
				open,
				Transition,
				handleClickOpen,
				handleClose,
				toRouter,
			}}
		/>
	);
};
export default AboutDetailContainer;
