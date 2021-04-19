const initialState = {

	currentBlogPost:{
		},

	totalBlogPost: [
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

const reducerForBlogPost = (state = initialState, action) => {

	switch (action.type) {

		case "SET_CURRENT_BLOGPOST":

			return {...state, currentBlogPost: action.current_blogpost}
			break;


		case "SET_FETCHED_BLOGPOST":

			return {...state, totalBlogPost: action.blogpost_list}
			break;

		case "SET_FETCHED_10_MORE_BLOGPOST":

			return {...state, totalBlogPost: [...state.BlogPost, action.blogpost_list] }
			break;


		default:

			return state

	}

};

export default reducerForBlogPost;
