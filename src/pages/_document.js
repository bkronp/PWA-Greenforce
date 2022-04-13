import React                 from "react";
import { ServerStyleSheets } from "@material-ui/core/styles";
import reactRevealconfig     from "react-reveal/globals";
import Document, {
	Html,
	Head,
	Main,
	NextScript,
} from "next/document";

// Import Own Components
import theme         from "~/ToolKit/theme";
import MessengerChat from "~/Components/MessengerChat";
// To prevent flickering with React Reveal library
reactRevealconfig({
	ssrFadeout : true,
});

class CustomDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{ /* App primary color */ }
					<meta name="theme-color" content={theme.palette.primary.main} />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
					<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
					<link rel="manifest" href="/favicon/manifest" />
				</Head>
				<body>
					<Main />
					<NextScript />
					<MessengerChat
						pageId="1554263117976250"
						// eslint-disable-next-line react/no-string-refs
						ref="fb-msgr"
					/>
					<script
						// dangerouslySetInnerHTML={{
						// 	__html : `
						// 		function googleTranslateElementInit() {
						// 			new google.translate.TranslateElement({
						// 				pageLanguage: 'es'
						// 			}, 'google_translate_element');
						// 		}
						// 	`,
						// }}
					 />
					{/* <script
						type="text/javascript"
						src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
					/> */}
				</body>
			</Html>
		);
	}
}

CustomDocument.getInitialProps = async ctx => {
	const sheets             = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () => originalRenderPage({
		enhanceApp : App => props => sheets.collect(<App {...props} />),
	});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles : [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
	};
};

export default CustomDocument;
