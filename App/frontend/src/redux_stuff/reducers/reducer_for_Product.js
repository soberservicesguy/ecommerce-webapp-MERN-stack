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

	all_product_categories: [
		{},
		{},
	],

	current_product_category:{
		dummy:''
	},
}


const reducerForProduct = (state = initialState, action) => {

	switch (action.type) {

		case "SET_CURRENT_PRODUCT_CATEGORY":

			return {...state, current_product_category: action.product_category}
			break;
		

		case "SET_FETCHED_PRODUCT_CATEGORIES":

			return {...state, all_product_categories: action.product_category_list}
			break;

		case "SET_CURRENT_PRODUCT":

			return {...state, currentProduct: action.current_product}
			break;


		case "SET_FETCHED_PRODUCT":

			return {...state, totalProduct: action.product_list}
			break;

		case "SET_FETCHED_10_MORE_PRODUCT":

			return {...state, totalProduct: [...state.Product, action.product_list] }
			break;


		case "ADD_USER_TO_PRODUCT":

			var currentTotalProduct = state.totalProduct

				var required_product = {}
				var product_index = 0
				currentTotalProduct.map((item, index)=>{
					if (item.id === action.product_id){
						required_product = item
						product_index = index
					}
				})
				
				let new_user = {}
				if( required_product[ 'users' ].length > 0 ){

					let last_id = required_product[ 'users' ][ required_product[ 'users' ].length - 1 ].id
					new_user = {id: last_id + 1, ...action.user_object}

				} else {

					new_user = {id: 0, ...action.user_object}
				}

				var newTotalProduct = []
				currentTotalProduct.map((item, index)=>{
					if (index === product_index){
						let currentUsers = item[ 'users' ]
						item[ 'users' ] = [ ...currentUsers, new_user ]
					}
					newTotalProduct.push(item)
				})

				return {...state, currentTotalProduct: newTotalProduct}
				break;

		case "REMOVE_USER_FROM_PRODUCT":

			var currentTotalProduct = state.totalProduct

				var required_product = {}
				var product_index = 0
				currentTotalProduct.map((item, index)=>{
					if (item.id === action.product_id){
						required_product = item
						product_index = index
					}
				})
				
				var newTotalProduct = []
				var required_user = {}
				var user_index = 0
				currentTotalProduct.map((item, index)=>{
					if (index === product_index){
						let currentUsers = item[ 'users' ]
						
						item[ 'users' ] = currentUsers.splice(action.user_id, 1)
					}
					newTotalProduct.push( item )
				})

				return {...state, currentTotalProduct: newTotalProduct}
				break;

		default:

			return state

	}

};

export default reducerForProduct;
