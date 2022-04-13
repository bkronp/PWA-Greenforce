/* eslint-disable */
import {
	composeMiddlewares,
	allow,
} from "~/Util/ApiHelpers";
import fs         from "fs";
import moment     from "moment";
import pdf        from "html-pdf";
import handlebars from "handlebars";

import { quotationDetails } from "~/Server/controllers/quotations/quotation_controller";

const EXEC_PATH = process.cwd().replace(/[\\]+/ig, "/");
const template  = fs.readFileSync(`${EXEC_PATH}/src/Server/templates/prueba.handlebars`, "utf8");
const DOC       = handlebars.compile(template);

function _createPdfStream(html) {
	return new Promise(function(resolve, reject) {
		let border     = "25px";
		let pdfOptions = {
			format : "Letter",
			"border" : {
				"top"    : "0px",
			},
			footer : {
				width : "100%",
				contents : {
					default : `<div
						class="footer"
						style="text-align:right;"
					>
						<span class="c7" style="font-size:12px"></br>Hoja {{page}} de {{pages}}</span>
					</div>`
				}
			}
		};

		pdf.create(html, pdfOptions).toStream(function(err, stream) {
			if (err) {
				return reject(err);
			}
			return resolve(stream);
		});

	});
}

function _streamToBuffer(stream, cb) {
	const chunks = [];
	stream.on("data", (chunk) => {
		chunks.push(chunk);
	});
	stream.on("end", () => {
		return cb(null, Buffer.concat(chunks));
	});
	stream.on("error", (e) => {
		return cb(e);
	});
}

const QuotationPDF = async (req, res) => {
	try {
		const quotation = await quotationDetails(req.query.quotationId);
		let html = DOC({
			quotationId: quotation.id,
			customerName: quotation.customer_name,
			customerEmail: quotation.customer_email,
			customerTelephone: quotation.customer_telephone,
			paymentConditions: quotation.payment_conditions,
			address: quotation.address,
			date: moment(
				new Date(quotation.date).toLocaleString("en-US", { timeZone: "America/Mexico_City" }),
			).locale('es').format("DD/MMMM/YYYY LTS A"),
			userName: quotation.user_name,
			products: quotation.products,
			total: quotation.total,
			taxes: quotation.taxes,
			subtotal: quotation.subtotal,
			renderProductsDetails:
				req?.query?.simple_pdf && req?.query?.simple_pdf == "true" ? false : true,
			notRenderProductsDetails:
				req?.query?.simple_pdf && req?.query?.simple_pdf == "true" ? true : false,
		});
		_createPdfStream(html)
			.then((stream) => {
				_streamToBuffer(stream, function(err, buffer){
					if(err) {
						throw new Error(err);
					}
					let namePdf = `${quotation.code}.pdf`;
					res.setHeader("Content-disposition", "inline; filename*=UTF-8''" + namePdf);
					res.setHeader("Content-type", "application/pdf");
					return res.send(buffer);
				});
			});
	} catch (error) {
		console.error("Error: ", error);
		res.statusCode = 400;
		res.json({
			error   : 400,
			details : err
		});
	}
};

// export default QuotationPDF;
export default composeMiddlewares(
	allow("GET")
)(QuotationPDF);

