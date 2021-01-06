const initialState = {

	isSignedIn: false,
	userToken: null,

}

const reducerForUser = (state = initialState, action) => {

	switch (action.type) {

		case "SET_IS_SIGNED_IN":

			return {...state, isSignedIn: action.booleon}
			break;

		case "SET_USER_TOKEN":

			return {...state, userToken: action.token}
			break;

		default:

			return state

	}

};

export default reducerForUser;
