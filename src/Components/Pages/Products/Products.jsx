/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
import React, { useEffect }	from "react";
import { Grid, Container,
	 } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import PropTypes from "prop-types";

// import YoutubeVideoPlayer 	from "~/Components/YoutubeVideoPlayer";
import LayoutPage     		from "~/Components/Layouts/LayoutPage";
import CardProduct    		from "~/Components/CardProduct";
import { Typography
	, Button } from "~/ToolKit";
import { SWR }        		from "~/Util";

import useStyles from "./styles";

/* <div dangerouslySetInnerHTML={{ __html : a }} /> */
const Products = ({
	delegations : {
		params,
		banner,
		categories,
		logos,
		scrollTo,
		setOpenModal,
	},
	width,
}) => {
	const classes = useStyles();

	useEffect(() => {

		(async () => {

			const x = () => new Promise((resolve, reject) => {
				setTimeout(() => {
					const view = document.getElementById(scrollTo);

					if (view) {
						view.scrollIntoView();
						resolve(true);
					}
					resolve(false);
				}, 100);
			});

			while (true) {
				const response = await x();
				if ( response == true) break;
			}
		})();
		window.addEventListener("load", () => {
			try {
				document.getElementById(scrollTo).scrollIntoView();
			} catch (err) {
				//pass
			}
		});
	}, [scrollTo]);

	return (<>
		<LayoutPage
			title={""}
			subtitle={""}
			container={false}
			background={banner[params.categoryId]}
			height="19vw"
			shadow={false}
		>
			<Container style={{ padding : "3rem 0 3rem 0" }}>
				<Grid
					container
					direction="row"
					justify="center"
					style={{
						padding   : "1rem 0px 2rem 0",
						textAlign : "center",
					}}
					xl={12}
				>
					<Grid item xs={12}>
						<img
							src={logos[params.categoryId].img}
							style={{ width : "15rem" }}
							alt={logos[params.categoryId].alt}
						/>
					</Grid>
				</Grid>

				{
					params.categoryId === "1" && (
						<Grid
							item
							xs={12}
							container
							className={classes.padding}
							justify="center"
							alignItems="stretch"
						>
							{/* <Grid item>
								<Button
									color="primary"
									className={classes.btnProducto}
									onClick={() => setOpenModal(true)}
								>
									Catálogo Provivi
								</Button>
							</Grid> */}
						</Grid>
					)
				}

				<Grid style={{ height : "calc(20vw + 15vh)", "flexBasis" : "auto", "width" : "100%" }}
					key={params.categoryId}>
					{params.categoryId === "1" ?
						<video autoPlay muted controls style={{ width : "100%", height : "100%" }}>
							<source src={require("~/Resources/videos/Compoexpert.mp4")} type="video/mp4" />
						</video>
						: (
							<video autoPlay muted controls style={{ width : "100%", height : "100%" }}>
								<source src={require("~/Resources/videos/Provivi.mp4")} type="video/mp4" />
							</video>
						)}
				</Grid>

				{
					categories.map((cat => (
						<SWR
							key={cat}
							url={`/api/products/page/1?category_id=${cat}&page_sizes=100`}
						>
							{ ({ collection }) => (
								<>
									<Grid
										container
										direction="row"
										justify="center"
										id={cat}
										style={{
											padding   : "1rem 0px  0",
											textAlign : "center",
										}}
										xl={12}
									>
										<Grid item xs={12}>
											<Typography type="header4" fontWeight="600" className={classes.subCategory}>
												{collection[0]?.category}
											</Typography>
										</Grid>
									</Grid>
									<Grid
										container
										direction="row"
										justify="center"
										alignItems="stretch"
									>
										{collection.length > 0 &&
										collection.map((product, index) => (
											<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
												<CardProduct
													id={product.id}
													category={params.category}
													nameProduct={product.name}
													label={product.presentation}
													image={product.image}
												/>
											</Grid>
										))}
									</Grid>
								</>
							)}
						</SWR>
					)))
				}

			</Container>
		</LayoutPage>
	</>);
};

Products.propTypes = {
	delegations : PropTypes.shape({
		banner       : PropTypes.object.isRequired,
		logos        : PropTypes.object.isRequired,
		params       : PropTypes.object.isRequired,
		categories   : PropTypes.array.isRequired,
		setOpenModal : PropTypes.func.isRequired,
		scrollTo     : PropTypes.string.isRequired,
	}).isRequired,
	width : PropTypes.any,
};

export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch("https://.../posts");
	const posts = await res.json();

	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props : {
			posts,
		},
	};
}

export default withWidth()(Products);
