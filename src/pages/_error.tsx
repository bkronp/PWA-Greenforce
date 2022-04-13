import { useCallback } from "react";
import { useRouter }   from "next/router";
import Head            from "next/head";

import {
	Grid,
	Box,
} from "@material-ui/core";
import {
	Button,
	/* ButtonWithoutStyles as Clicker, */
	Typography,
} from "~/ToolKit";

function Error() {
	const router = useRouter();

	// const toHome = useCallback(() => router.push("/"), [router]);
	const toBack = useCallback(() => router.back(), [router]);

	return (
		<>
			<Head>
				<title>Villamex - Error</title>
			</Head>
			<Grid container id="error-container">
				<Grid
					item
					xs={12}
					container
					direction="column"
					justify="center"
					alignItems="center"
				>
					{/* <Clicker onClick={toHome}>
						<img src={logo} alt="zoko's logo" />
					</Clicker> */}
					<Box m={2}>
						<Typography type="title" fontWeight="bold">404</Typography>
					</Box>
					<Box m={2}>
						<Typography type="header1">PAGE NOT FOUND</Typography>
					</Box>
					<Box m={2}>
						<Button
							className="button-404"
							color="primary"
							size="medium"
							grow
							textColor
							onClick={toBack}
							variant="contained"
						>
							{ " Regresar" }
						</Button>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}

Error.getInitialProps = ({ asPath, res }: any): any => {
	if (asPath.endsWith("/")) {
		res.writeHead(301, { Location : asPath.substring(0, asPath.length - 1) });
		return res.end();
	}

	return asPath;
};

export default Error;
