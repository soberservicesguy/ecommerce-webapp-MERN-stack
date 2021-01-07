const initialState = {

	currentCartItem:{
	},

	entireCart: [
	],

}


const reducerForCart = (state = initialState, action) => {

	switch (action.type) {

		case "ADD_PRODUCT_TO_CART":

			var currentEntireCart = state.entireCart

			let new_product = {}
			if ( currentEntireCart.length > 0 ){

				let last_id = currentEntireCart[ currentEntireCart.length-1 ].id

				if (last_id === null){

					new_product = {id: 0, ...action.product_object}

				} else {

					new_product = {id: last_id + 1, ...action.product_object}

				}

			} else {

				new_product = {id: 0, ...action.product_object}
			
			}

			currentEntireCart.push(new_product)
			// console.log('CART AFTER ADDITION')
			// console.log(currentEntireCart)

			return {...state, entireCart: [...currentEntireCart]}
			break;


		case "REMOVE_PRODUCT_FROM_CART":
			// console.log('CALLED')
			var currentEntireCart = state.entireCart

			var filtered_products = currentEntireCart.filter(
				function(item){
					return item.id === action.product_id
				}
			)

			var product_index = currentEntireCart.indexOf(filtered_products[0])
			if (product_index !== -1){
				currentEntireCart.splice(product_index, 1)
			}

			return {...state, entireCart: [...currentEntireCart]}
			break;


		case "EDIT_PRODUCT_COLOR":
			var currentEntireCart = state.entireCart
			var filtered_products = currentEntireCart.filter(
				function(item){
					return item.id === action.product_id
				}
			)

			var product_to_edit = filtered_products[0]

			var product_index = currentEntireCart.indexOf(product_to_edit)
			if (product_index > -1){
				currentEntireCart.splice(product_index, 1)
			}

			product_to_edit = {...product_to_edit, product_color: action.color}
			
			return {...state, entireCart: [...currentEntireCart, product_to_edit]}
			break;

		case "EDIT_PRODUCT_QUANTITY":
			var currentEntireCart = state.entireCart

			var filtered_products = currentEntireCart.filter(
				function(item){
					return item.id === action.product_id
				}
			)

			var product_to_edit = filtered_products[0]

			var product_index = currentEntireCart.indexOf(product_to_edit)
			if (product_index > -1){
				currentEntireCart.splice(product_index, 1)
			}

			product_to_edit = {...product_to_edit, initial_quantity: action.quantity}
			
			return {...state, entireCart: [...currentEntireCart, product_to_edit]}
			break;


		case "EDIT_PRODUCT_SIZE":
			var currentEntireCart = state.entireCart
			var filtered_products = currentEntireCart.filter(
				function(item){
					return item.id === action.product_id
				}
			)

			var product_to_edit = filtered_products[0]

			var product_index = currentEntireCart.indexOf(product_to_edit)
			if (product_index > -1){
				currentEntireCart.splice(product_index, 1)
			}

			product_to_edit = {...product_to_edit, product_size: action.size}
			
			return {...state, entireCart: [...currentEntireCart, product_to_edit]}
			break;


		case "SET_CURRENT_CART_ITEM":

			return {...state, currentCartItem: action.cart_item}
			break;


		default:

			return state

	}

};

export default reducerForCart;
