const initialState = {

	currentProduct:{
			endpoint:'dummy',
			image_thumbnail_filepath:'dummy',
			title:'dummy',
			price:'dummy',
			initial_quantity:'dummy',
			product_size:'dummy',
			product_color:'dummy',
			timestamp_of_uploading:'dummy',
		},

	totalProduct: [
			{ endpoint:'dummy1', image_thumbnail_filepath:'dummy1', title:'dummy1', price:'dummy1', initial_quantity:'dummy1', product_size:'dummy1', product_color:'dummy1', timestamp_of_uploading:'dummy1',},
			{ endpoint:'dummy2', image_thumbnail_filepath:'dummy2', title:'dummy2', price:'dummy2', initial_quantity:'dummy2', product_size:'dummy2', product_color:'dummy2', timestamp_of_uploading:'dummy2',},
			{ endpoint:'dummy3', image_thumbnail_filepath:'dummy3', title:'dummy3', price:'dummy3', initial_quantity:'dummy3', product_size:'dummy3', product_color:'dummy3', timestamp_of_uploading:'dummy3',},
			{ endpoint:'dummy4', image_thumbnail_filepath:'dummy4', title:'dummy4', price:'dummy4', initial_quantity:'dummy4', product_size:'dummy4', product_color:'dummy4', timestamp_of_uploading:'dummy4',},
			{ endpoint:'dummy5', image_thumbnail_filepath:'dummy5', title:'dummy5', price:'dummy5', initial_quantity:'dummy5', product_size:'dummy5', product_color:'dummy5', timestamp_of_uploading:'dummy5',},
			{ endpoint:'dummy6', image_thumbnail_filepath:'dummy6', title:'dummy6', price:'dummy6', initial_quantity:'dummy6', product_size:'dummy6', product_color:'dummy6', timestamp_of_uploading:'dummy6',},
			{ endpoint:'dummy7', image_thumbnail_filepath:'dummy7', title:'dummy7', price:'dummy7', initial_quantity:'dummy7', product_size:'dummy7', product_color:'dummy7', timestamp_of_uploading:'dummy7',},
			{ endpoint:'dummy8', image_thumbnail_filepath:'dummy8', title:'dummy8', price:'dummy8', initial_quantity:'dummy8', product_size:'dummy8', product_color:'dummy8', timestamp_of_uploading:'dummy8',},
			{ endpoint:'dummy9', image_thumbnail_filepath:'dummy9', title:'dummy9', price:'dummy9', initial_quantity:'dummy9', product_size:'dummy9', product_color:'dummy9', timestamp_of_uploading:'dummy9',},
			{ endpoint:'dummy10', image_thumbnail_filepath:'dummy10', title:'dummy10', price:'dummy10', initial_quantity:'dummy10', product_size:'dummy10', product_color:'dummy10', timestamp_of_uploading:'dummy10',},
		],
	cart:[
		],
	current_cart_item:{
		},
	}

const reducerForProduct = (state = initialState, action) => {

	switch (action.type) {

		case "SET_CURRENT_PRODUCT":

			return {...state, currentProduct: action.current_product}
			break;


		case "SET_FETCHED_PRODUCT":

			return {...state, totalProduct: action.product_list}
			break;

		case "SET_FETCHED_10_MORE_PRODUCT":

			return {...state, totalProduct: [...state.Product, action.product_list] }
			break;



		case "SET_CURRENT_CART_ITEM":

			return {...state, current_cart_item: action.current_cart_item}
			break;

		case "ADD_PRODUCT_TO_CART":
				if( state.cart.length > 0 ){

					let last_id = state.cart[ state.cart.length - 1 ].id
					return {...state, cart: [...state.cart, {id: last_id + 1, ...action.product}] }

				} else {

					return {...state, cart: [...state.cart, {id: 0, ...action.product}] }

				}
				break;


		case "REMOVE_PRODUCT_FROM_CART":

			return {...state, cart: [...state.cart.filter( (item) => item.id !== action.product_id ) ] }
			break;

		case "MODIFY_PRODUCT_SIZE_OF_PRODUCT_IN_CART":

			var currentCart = state.cart

				var required_product = {}
				var product_index = 0
				currentCart.map((item, index)=>{
					if (item.id === action.product_id){
						required_product = item
						product_index = index
					}
				})
				
				var newCart = []
				currentCart.map((item, index)=>{
					if (index === product_index){
						item['product_size'] = action.product_size
					}
					newCart.push(item)
				})

				return {...state, cart:newCart}
				break;

		case "MODIFY_INITIAL_QUANTITY_OF_PRODUCT_IN_CART":

			var currentCart = state.cart

				var required_product = {}
				var product_index = 0
				currentCart.map((item, index)=>{
					if (item.id === action.product_id){
						required_product = item
						product_index = index
					}
				})
				
				var newCart = []
				currentCart.map((item, index)=>{
					if (index === product_index){
						item['initial_quantity'] = action.initial_quantity
					}
					newCart.push(item)
				})

				return {...state, cart:newCart}
				break;

		case "MODIFY_PRODUCT_COLOR_OF_PRODUCT_IN_CART":

			var currentCart = state.cart

				var required_product = {}
				var product_index = 0
				currentCart.map((item, index)=>{
					if (item.id === action.product_id){
						required_product = item
						product_index = index
					}
				})
				
				var newCart = []
				currentCart.map((item, index)=>{
					if (index === product_index){
						item['product_color'] = action.product_color
					}
					newCart.push(item)
				})

				return {...state, cart:newCart}
				break;

		default:

			return state

	}

};

export default reducerForProduct;
