const initialState = {

	currentOrder:{
			endpoint:'dummy',
			timestamp_of_order:'dummy',
			order_amount:'dummy',
		},

	totalOrder: [
			{ endpoint:'dummy1', timestamp_of_order:'dummy1', order_amount:'dummy1',},
			{ endpoint:'dummy2', timestamp_of_order:'dummy2', order_amount:'dummy2',},
			{ endpoint:'dummy3', timestamp_of_order:'dummy3', order_amount:'dummy3',},
			{ endpoint:'dummy4', timestamp_of_order:'dummy4', order_amount:'dummy4',},
			{ endpoint:'dummy5', timestamp_of_order:'dummy5', order_amount:'dummy5',},
			{ endpoint:'dummy6', timestamp_of_order:'dummy6', order_amount:'dummy6',},
			{ endpoint:'dummy7', timestamp_of_order:'dummy7', order_amount:'dummy7',},
			{ endpoint:'dummy8', timestamp_of_order:'dummy8', order_amount:'dummy8',},
			{ endpoint:'dummy9', timestamp_of_order:'dummy9', order_amount:'dummy9',},
			{ endpoint:'dummy10', timestamp_of_order:'dummy10', order_amount:'dummy10',},
		],
	}

const reducerForOrder = (state = initialState, action) => {

	switch (action.type) {

		case "SET_CURRENT_ORDER":

			return {...state, currentOrder: action.current_order}
			break;


		case "SET_FETCHED_ORDER":

			return {...state, totalOrder: action.order_list}
			break;

		case "SET_FETCHED_10_MORE_ORDER":

			return {...state, totalOrder: [...state.Order, action.order_list] }
			break;


		case "ADD_USER_TO_ORDER":

			var currentTotalOrder = state.totalOrder

				var required_order = {}
				var order_index = 0
				currentTotalOrder.map((item, index)=>{
					if (item.id === action.order_id){
						required_order = item
						order_index = index
					}
				})
				
				let new_user = {}
				if( required_order[ 'users' ].length > 0 ){

					let last_id = required_order[ 'users' ][ required_order[ 'users' ].length - 1 ].id
					new_user = {id: last_id + 1, ...action.user_object}

				} else {

					new_user = {id: 0, ...action.user_object}
				}

				var newTotalOrder = []
				currentTotalOrder.map((item, index)=>{
					if (index === order_index){
						let currentUsers = item[ 'users' ]
						item[ 'users' ] = [ ...currentUsers, new_user ]
					}
					newTotalOrder.push(item)
				})

				return {...state, currentTotalOrder: newTotalOrder}
				break;

		case "REMOVE_USER_FROM_ORDER":

			var currentTotalOrder = state.totalOrder

				var required_order = {}
				var order_index = 0
				currentTotalOrder.map((item, index)=>{
					if (item.id === action.order_id){
						required_order = item
						order_index = index
					}
				})
				
				var newTotalOrder = []
				var required_user = {}
				var user_index = 0
				currentTotalOrder.map((item, index)=>{
					if (index === order_index){
						let currentUsers = item[ 'users' ]
						
						item[ 'users' ] = currentUsers.splice(action.user_id, 1)
					}
					newTotalOrder.push( item )
				})

				return {...state, currentTotalOrder: newTotalOrder}
				break;

		default:

			return state

	}

};

export default reducerForOrder;
