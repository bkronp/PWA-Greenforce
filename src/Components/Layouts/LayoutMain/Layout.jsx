import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Own Components
// import Header from "~/Components/Header";
// import Footer from "~/Components/Footer";

import HeaderNav from "../../Header/HeaderNav";
import FooterFot from "../../Footer/FooterFot";

const Layout = ({ children }) => (
	<>
		<HeaderNav />
		{ children }
		<FooterFot />
	</>
);

Layout.propTypes = {
	children : PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.node]),
};

Layout.defaultProps = {
	children : <></>,
};

export default Layout;
