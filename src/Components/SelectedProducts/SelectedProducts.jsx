/* eslint-disable camelcase */
/* eslint-disable max-len */
import {
	Grid,
	Card,
	CardMedia,
	Container,
} from "@material-ui/core";
import { useCallback } from "react";
import { useRouter }   from "next/router";

// Import Own Components
import Quotation      from "~/Components/Quotation";
import { SWR }        from "~/Util";
import { Typography } from "~/ToolKit" ;
import useStyles      from "./styles";
import { slug }       from "~/Util/ApiHelpers";

const SelectedProducts = () => {
	const classes = useStyles();
	const router = useRouter();

	const toRouter = useCallback(url =>() => {
		router.push(url);
	}, [router]);

	return (
		<SWR
			url={"/api/products/page/1?only_offered=true&page_size=5"}
		>
			{ ({ collection }) => (
				<Container className={classes.root}>
					{collection != undefined && collection.length > 0 && (
						<>
							<Grid container justify="center">
								<Typography type="header2" style={{ margin : "3rem 0" }}>
									PROMOCIONES VILLAMEX
								</Typography>
							</Grid>
							<Grid container justify="center">
								{collection.map(item => (
									<Grid
										key={item.id}
										item
										xs={12}
										md={6}
										justify="center"
										alignContent="center"
										style={{
											textAlign    : "center",
											marginBottom : "3rem",
											padding      : "1rem",
										}}
									>
										<div className="ribbon-box">
											<span className="ribbon" />
											<span className="ribbon-text">
												{item.name} ({item.presentation})
											</span>
											<Card
												style={{ cursor : "pointer" }}
												onClick={toRouter(`/products/${slug(item.category)}/${slug(item.name)}/${item.id}`)}
											>
												<CardMedia
													component="img"
													alt="Certificaciones"
													height="350"
													image={item.image}
													title=""
												/>
											</Card>
										</div>

										<Quotation
											product={item}
										/>
									</Grid>
								))}
							</Grid>
						</>
					)}
					<style jsx global>{`
							.ribbon-box {
								position: relative;
							}
							
							.ribbon-box h3 {
								margin      : 0 0 0.25em 0;
								font-size   : 28px;
								font-weight : 400;
								line-height : 1.3;
								color       : #222;
							}
							
							.ribbon-box .ribbon-box-inside p {
								margin : 0 0 1em;
							}
							
							.ribbon-box .ribbon-box-inside > p:last-child {
								margin-bottom : 0;
							}
							
							.ribbon-box.ribbon-box-inside p a {
								color : #53b0de;
							}
							
							.ribbon-box .ribbon-box-inside p a:hover {
								color : #222;
							}
							
							/* Ribbon Styles */
							
							.ribbon-box .ribbon {
								display  : inline-block;
								position : absolute;
								left     : 20px;
								top      : 38px;
							}
							.ribbon-text{
								display     : inline-block;
								position    : absolute;
								left        : 56px;
								right       : 0;
								top         : 10px;
								font-size   : small;
								font-weight : 600;
								padding     : 1rem;
								background  : #ffffff85;
							}
							
							.ribbon-box .ribbon:before,
							.ribbon-box .ribbon:after {
								content  : "";
								display  : block;
								position : absolute;
								height   : 10px;
								bottom   : -8px;
								border   : 18px solid #EFB810;    
							}
							
							.ribbon-box .ribbon:before {
								border-bottom-color : transparent;
								bottom              : -40px;
							}
						`}
					</style>
				</Container>
			)}
		</SWR>
	);
};

export default SelectedProducts;
