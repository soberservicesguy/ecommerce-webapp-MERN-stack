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
				new_product = {id: last_id + 1, ...action.product_object}

			} else {

				new_product = {id: 0, ...action.product_object}
			
			}

			currentEntireCart.push(new_product)

			return {...state, entireCart: [...currentEntireCart]}
			break;


		case "REMOVE_PRODUCT_FROM_CART":
			var currentEntireCart = state.entireCart

			let product_to_remove = currentEntireCart.filter(
				function(item){
					return item.id === action.product_id
				}
			)

			currentEntireCart.remove( product_to_remove )

			return {...state, entireCart: [...currentEntireCart]}
			break;


		case "EDIT_PRODUCT_COLOR":
			var currentEntireCart = state.entireCart
			var product_to_edit = currentEntireCart.filter(
				function(item){
					return item.id === action.product_id
				}
			)

			currentEntireCart.remove( product_to_edit )

			product_to_edit = {...product_to_edit, product_color: action.color}
			
			return {...state, entireCart: [...currentEntireCart, product_to_edit]}
			break;

		case "EDIT_PRODUCT_QUANTITY":
			var currentEntireCart = state.entireCart

			var product_to_edit = currentEntireCart.filter(
				function(item){
					return item.id === action.product_id
				}
			)

			currentEntireCart.remove( product_to_edit )

			product_to_edit = {...product_to_edit, initial_quantity: action.quantity}
			
			return {...state, entireCart: [...currentEntireCart, product_to_edit]}
			break;


		case "EDIT_PRODUCT_SIZE":
			var currentEntireCart = state.entireCart
			var product_to_edit = currentEntireCart.filter(
				function(item){
					return item.id === action.product_id
				}
			)

			currentEntireCart.remove( product_to_edit )

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
