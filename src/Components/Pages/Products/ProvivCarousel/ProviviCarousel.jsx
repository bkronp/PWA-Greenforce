/* eslint-disable import/extensions */
import React, { useMemo }   from "react";
import Fade        from "react-reveal/Fade";


// Import Own Components
import ProviviCarousel01	from "~/Resources/img/ProviviCarrousel/01.jpeg";
import ProviviCarousel02	from "~/Resources/img/ProviviCarrousel/02.jpeg";
import ProviviCarousel03	from "~/Resources/img/ProviviCarrousel/03.jpeg";
import ProviviCarousel04	from "~/Resources/img/ProviviCarrousel/04.jpeg";
import ProviviCarousel05	from "~/Resources/img/ProviviCarrousel/05.jpeg";
import ProviviCarousel06	from "~/Resources/img/ProviviCarrousel/06.jpeg";
import ProviviCarousel07	from "~/Resources/img/ProviviCarrousel/07.jpeg";
import ProviviCarousel08	from "~/Resources/img/ProviviCarrousel/08.jpeg";
import ProviviCarousel09	from "~/Resources/img/ProviviCarrousel/09.jpeg";
import ProviviCarousel10	from "~/Resources/img/ProviviCarrousel/10.jpeg";
import MultipleCarousel 	from "~/Components/MultipleCarousel";
// import Parallax         	from "~/Components/Parallax";

import useStyles        from "./styles";

const ProviviCarousel = () => {
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

	const images = [
		ProviviCarousel01,
		ProviviCarousel02,
		ProviviCarousel03,
		ProviviCarousel04,
		ProviviCarousel05,
		ProviviCarousel06,
		ProviviCarousel07,
		ProviviCarousel08,
		ProviviCarousel09,
		ProviviCarousel10,
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
						images.length > 0 && images.map((item, id) =>
							// <Parallax
							// 	key={id}
							// 	title=""
							// 	subtitle=""
							// 	background={item}
							// 	color={false}
							// 	backgroundSize="100% 100%"
							// />
							<img key={id} src={item} className={classes.images} />
						)
					}
				</MultipleCarousel>
			</Fade>
		</div>
	);
};

export default ProviviCarousel;
