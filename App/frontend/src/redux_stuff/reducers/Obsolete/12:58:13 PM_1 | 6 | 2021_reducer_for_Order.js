const initialState = {

	currentOrder:{
		},

	totalOrder: [
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
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


		default:

			return state

	}

};

export default reducerForOrder;
