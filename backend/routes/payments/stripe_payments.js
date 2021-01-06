const router = require('express').Router();   

// const User = mongoose.model('User');
// const mongoose = require('mongoose');

// const passport = require('passport');
// const utils = require('../lib/utils');

router.get("/", (req, res) => {
	res.send("Hello from API");
});

// SENDING PUBLISHABLE KEY
router.get("/public-key", (req, res) => {
	res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

router.get("/product-details", (req, res) => {
	let data = getProductDetails();
	res.send(data);
});

// ENDPOINT WHERE PAYMENT IS CREATED
router.post("/create-payment-intent", async (req, res) => {
	// BODY IS ASSIGNED OPTIONS OBJECT IE options = {payment_method_types: ["card"]} 
	const body = req.body;
	// GETTING PRODUCT DETAILS FROM OWN SERVER
	const productDetails = getProductDetails();

	// CREATING DICT WITH PAYLOAD FROM POST REQUEST AND PRODUCT DETAILS
	const options = {
		...body,
		amount: productDetails.amount,
		currency: productDetails.currency
	};

	// CREATE PAYMENT INTENT BY RUNNING SINGLE FUNCTION BY PASSING ABOVE DICT
	try {
		const paymentIntent = await stripe.paymentIntents.create(options);
		res.json(paymentIntent);
	} catch (err) {
		res.json(err);
	}
});

let getProductDetails = () => {
	return { currency: "EUR", amount: 9900 };
};


// WEBHOOKS IS AN HTTP ENDPOINT THAT RECIEVES EVENTS FROM STRIPE ABOUT SUCCESSFUL TRANSACTION OR DISPUTE OR FAILURE
// Webhook handler for asynchronous events.
router.post("/webhook", async (req, res) => {

	let data;
	let eventType;
	// Check if webhook signing is configured.
	if (process.env.STRIPE_WEBHOOK_SECRET) {
	// Retrieve the event by verifying the signature using the raw body and secret.
		let event;
		// GET STRIPE SINGATURE FROM HEADERS OF REQUEST
		let signature = req.headers["stripe-signature"];

		try {
			// CREATE AN EVENT FROM REQUEST PAYLOAD AND ABOVE SIGNATURE
			event = stripe.webhooks.constructEvent(
				// ???
				req.rawBody,
				signature,
				process.env.STRIPE_WEBHOOK_SECRET
			);
		} catch (err) {
			console.log(`⚠️ Webhook signature verification failed.`);
			return res.sendStatus(400);
		}
		// IF ABOVE TRY BLOCK SUCCEEDED , THEN EXTRACT DATA FROM EVENT, AND EVENT TYPE
		// Extract the object from the event.
		data = event.data;
		eventType = event.type;

	} else {

		// Webhook signing is recommended, but if the secret is not configured in `config.js`,
		// retrieve the event data directly from the request body.
		// STRIPE WEBHOOK SECRET IS NOT SET, THEN BOTTOM CODE WILL RUN
		data = req.body.data;
		eventType = req.body.type;
	}

	// IF PAYMENT SUCCEEDED THEN IT WILL CONSOLE LOG
	if (eventType === "payment_intent.succeeded") {
		// Fulfill any orders, e-mail receipts, etc
		console.log("💰 Payment received!");
	}

	// IF PAYMENT FAILED THEN IT WILL CONSOLE LOG
	if (eventType === "payment_intent.payment_failed") {
		// Notify the customer that their order was not fulfilled
		console.log("❌ Payment failed.");
	}

	res.sendStatus(200);

});

module.exports = router;