const mongoose = require('mongoose');
require('../../models/product');
const Product = mongoose.model('Product');

const currency = "USD"

async function get_all_product_objects_and_order_amount_for_stripe(products_list){
	let products_in_order = products_list
	let final_order_content = []
	let order_amount = 0
	let product_objects = []

	let loop_result = await Promise.all(products_in_order.map(async (ordered_product) => {
		let quantity = ordered_product.initial_quantity
		// console.log(`ORDERED QUANTITY IS ${quantity}`)

		delete ordered_product.price
		delete ordered_product.initial_quantity

		await Product.findOne(ordered_product)
		.then((product_found) => {

			// console.log('FOUND PRODUCT')
			// console.log(product_found)

			product_objects.push(product_found)

			final_order_content.push({
				price_data: {
					currency: currency,
					product_data: {
						name: product_found.title,
					},
					unit_amount: product_found.price,
				},
				quantity: quantity,
			})
			// console.log('1')
			// console.log('PRODUCT RESULTS')
			// console.log(Number(product_found.price) * Number(quantity))
			order_amount += Number(product_found.price) * Number(quantity)

		})

	}))

	return {order_amount: order_amount, product_objects: product_objects, final_order_content: final_order_content}
}

module.exports = {get_all_product_objects_and_order_amount_for_stripe}