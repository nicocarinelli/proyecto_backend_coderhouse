import mercadopago from "mercadopago";

export const createPreference = async (req, res) => {
	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:8080/",
			"failure": "http://localhost:8080/",
			"pending": "",
		},
		auto_return: "approved",
	};

	mercadopago.preferences
        .create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
}

export const feedback = async (req, res) => {
    res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	})
}
