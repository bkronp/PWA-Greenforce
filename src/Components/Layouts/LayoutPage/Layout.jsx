import PropTypes from "prop-types";
import {
	Container,
} from "@material-ui/core";

// Import Own Components
import LayoutMain from "~/Components/Layouts/LayoutMain";
import Parallax   from "~/Components/Parallax";
import banner     from "~/Resources/banners/bannerPrincipal.png";

const Layout = (
	{ children,
		title,
		subtitle,
		background,
		container,
		cursiveTitle,
		height,
		backgroundSize,
		shadow,
		cursiveSubtitle }
) => (
	<LayoutMain>
		<Parallax
			title={title}
			alignment="bottom"
			repeat="no-repeat"
			subtitle={subtitle}
			height={height}
			background={background}
			backgroundSize={backgroundSize}
			color={false}
			shadow={shadow}
			cursiveTitle={cursiveTitle}
			cursiveSubtitle={cursiveSubtitle}
		/>
		{ container ? (
			<Container style={{ minHeight : "70vh", paddingBottom : "2rem", paddingTop : "3rem" }}>
				{ children }
			</Container>
		) : (
			<div style={{ minHeight : "70vh", marginBottom : "5rem" }}>
				{ children }
			</div>
		)}
	</LayoutMain>
);

Layout.propTypes = {
	children        : PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.node]),
	title           : PropTypes.string,
	subtitle        : PropTypes.string,
	background      : PropTypes.string,
	shadow          : PropTypes.bool,
	container       : PropTypes.bool,
	cursiveTitle    : PropTypes.bool,
	cursiveSubtitle : PropTypes.bool,
	height          : PropTypes.string,
	backgroundSize  : PropTypes.string,
};

Layout.defaultProps = {
	children        : <></>,
	background      : banner,
	title           : "",
	subtitle        : "",
	container       : true,
	height          : "19vw",
	backgroundSize  : "100%",
	shadow          : true,
	cursiveSubtitle : true,
};

export default Layout;
