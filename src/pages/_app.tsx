/* eslint-disable import/extensions */
import { useEffect }         from "react";
import PropTypes             from "prop-types";
import { Provider }          from "react-redux";
import Head                  from "next/head";
import { ThemeProvider  }    from "@material-ui/styles";
import { CssBaseline }       from "@material-ui/core";
import Router                from "next/router";
import MessengerCustomerChat from "react-messenger-customer-chat";
import NProgress             from "nprogress";
import "nprogress/nprogress.css";

// Import Own Components
import Alert            from "~/Components/Alert";
import Dialog           from "~/Components/Dialog";
import theme            from "~/ToolKit/theme";
import { scrollToTop }  from "~/Util/ApiHelpers";
import Store            from "~/Store";
import { STATE_LOADED } from "~/Store/actionTypes";
import settings			from "~/Server/settings.json";
import "../global_styles.css";

const CustomApp = ({ Component, pageProps }) => {
	useEffect(() => {
		NProgress.configure({ showSpinner : true });

		Router.events.on("routeChangeStart", () => {
			scrollToTop();
			NProgress.start();
		});

		Router.events.on("routeChangeComplete", NProgress.done);

		Router.events.on("routeChangeError", NProgress.done);
	}, []);

	useEffect(() => {
		// Load state from localStorage
		import("~/Store/persistor").then(({ loadState }) => {
			const state = loadState() || {};

			state["dialogReducer"] = {
				open : false,
			};

			Store.dispatch({
				type    : STATE_LOADED,
				payload : {
					...state,
					stateLoaded : true,
				},
			});
		});
	}, []);

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");

		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	});

	return (
		<>
			<Head>
				<title>{settings.page.name}</title>
			</Head>

			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Provider store={Store}>
					<Component {...pageProps} />
					<Alert />
					<Dialog />
				</Provider>
			</ThemeProvider>
			<MessengerCustomerChat
				pageId="1554263117976250"
				appId="1037635720022818"
				loggedInGreeting="¡Hola! ¿Como podemos ayudarte?"
				loggedOutGreeting="¡Hola! ¿Como podemos ayudarte?"
				themeColor="#efb810"
				language="ES_LA"
			/>
		</>
	);
};

CustomApp.propTypes = {
	Component : PropTypes.any,
	pageProps : PropTypes.any,
};

export default CustomApp;
