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

import Banner			from "~/Resources/banners/bannerPrincipal2.png";
import ProductDetails 	from "./About";

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
		<ProductDetails
			delegations={{
				open,
				Transition,
				handleClickOpen,
				handleClose,
				toRouter,
				Banner,
			}}
		/>
	);
};
export default AboutDetailContainer;
