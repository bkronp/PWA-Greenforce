// import Header 			from "~/Components/Header";
// import Footer 			from "~/Components/Footer";
import SelectedProducts from "~/Components/SelectedProducts";
import BannerProducts 	from "~/Components/Banners/BannerProducts";
import AboutUs 			from "../AboutUs/AboutUs";
import Services 		from "../CardServices/Services";
import HeaderNav        from "../Header/HeaderNav";
import FooterFot 		from "../Footer/FooterFot";
import Customers from "../Customers/Customers";

const HomeLayout = () => (
	<>
		{/* <Header /> */}
		<HeaderNav />
		<BannerProducts />
		<SelectedProducts />
		<Customers />
		<AboutUs />
		<Services />
		<FooterFot />		
		{/* <Footer /> */}
	</>
);

export default HomeLayout;
