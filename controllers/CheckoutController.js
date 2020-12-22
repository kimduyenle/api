const _ = require("lodash");
const models = require("../models");
const paginate = require("../utils/paginate");
const getUserInfo = require("../utils/getUserInfo");
const paypal = require("@paypal/payouts-sdk");
class CheckoutController {
	async payout(req, res) {
		let clientId =
			"AahRbFwBxZbe_2LApCXd-8j3eyIuwbBEqM0qU6Jdmey7HPU_RHxCkCl_1MDZCxQVZAJgJPr9rsmseJs7";
		let clientSecret =
			"ELLm2UwloV_QeRoHqeEVIUGhQccoeGbLoWeotz8xhcizymtRAVjpfLgJQypk1AkYC4S9FRDLFQA0gK4S";
		let environment = new paypal.core.SandboxEnvironment(
			clientId,
			clientSecret
		);
		let client = new paypal.core.PayPalHttpClient(environment);

		const now = new Date();
		const key = now.getTime();
		const amount = Number(req.body.amount);
		let requestBody = {
			sender_batch_header: {
				recipient_type: "EMAIL",
				email_message: "SDK payouts test txn",
				note: "Enjoy your Payout!!",
				sender_batch_id: key,
				email_subject: "This is a test transaction from SDK"
			},
			items: [
				{
					note: "Your 5$ Payout!",
					amount: {
						currency: "USD",
						value: amount
					},
					receiver: "myuser@personal.example.com",
					sender_item_id: key
				}
			]
		};

		// Construct a request object and set desired parameters
		// Here, PayoutsPostRequest() creates a POST request to /v1/payments/payouts
		let request = new paypal.payouts.PayoutsPostRequest();
		request.requestBody(requestBody);

		// Call API with your client and get a response for your call
		let createPayouts = async function () {
			let response = await client.execute(request);
			console.log(`Response: ${JSON.stringify(response)}`);
			// If call returns body in response, you can get the deserialized version from the result attribute of the response.
			console.log(
				`Payouts Create Response: ${JSON.stringify(response.result)}`
			);
			return response.result.batch_header.payout_batch_id;
		};
		const r = await createPayouts();
		console.log({ r });
		return res.status(200).json(r);
	}
}

module.exports = new CheckoutController();
