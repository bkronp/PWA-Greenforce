/* eslint-disable import/extensions */
// Import dependencies
import { useMemo } from "react";
import Fade        from "react-reveal/Fade";

// Import Own Components
import banner1          from "~/Resources/banners/Banner001.webp";
import banner2          from "~/Resources/banners/Banner002.webp";
import banner3          from "~/Resources/banners/Banner003.webp";
import MultipleCarousel from "~/Components/MultipleCarousel";
import useStyles        from "./styles";

const BannerProducts = () => {
	const classes         = useStyles();
	const responsiveProps = useMemo(() => ({
		desktop : {
			breakpoint : { max : 3000, min : 960 },
			items      : 1,
		},
		tablet : {
			breakpoint : { max : 960, min : 600 },
			items      : 1,
		},
		mobile : {
			breakpoint : { max : 600, min : 0 },
			items      : 1,
		},
	}), []);

	const imagenes = [
		banner1,
		banner2,
		banner3,
	];


	return (
		<div className={classes.bannerContainer}>
			<Fade clear delay={700}>
				<MultipleCarousel
					settingsProps={{
						showDots : true,
						infinite : true,
						autoPlay : true,
					}}
					responsiveProps={responsiveProps}
				>
					{
						imagenes != [] && imagenes.map((item, id) =>
							/*<Parallax
								key={id}
								title=""
								subtitle=""
								height="500px"
								background={item}
								color={false}
								backgroundSize="100% 100%"
							/>*/
							<img key={id} src={item} style={{ width : "100%" }} />
						)
					}
				</MultipleCarousel>
			</Fade>
		</div>
	);
};

export default BannerProducts;
