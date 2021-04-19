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


		case "ADD_USER_TO_BLOGPOST":

			var currentTotalBlogPost = state.totalBlogPost

				var required_blogpost = {}
				var blogpost_index = 0
				currentTotalBlogPost.map((item, index)=>{
					if (item.id === action.blogpost_id){
						required_blogpost = item
						blogpost_index = index
					}
				})
				
				let new_user = {}
				if( required_blogpost[ 'users' ].length > 0 ){

					let last_id = required_blogpost[ 'users' ][ required_blogpost[ 'users' ].length - 1 ].id
					new_user = {id: last_id + 1, ...action.user_object}

				} else {

					new_user = {id: 0, ...action.user_object}
				}

				var newTotalBlogPost = []
				currentTotalBlogPost.map((item, index)=>{
					if (index === blogpost_index){
						let currentUsers = item[ 'users' ]
						item[ 'users' ] = [ ...currentUsers, new_user ]
					}
					newTotalBlogPost.push(item)
				})

				return {...state, currentTotalBlogPost: newTotalBlogPost}
				break;

		case "REMOVE_USER_FROM_BLOGPOST":

			var currentTotalBlogPost = state.totalBlogPost

				var required_blogpost = {}
				var blogpost_index = 0
				currentTotalBlogPost.map((item, index)=>{
					if (item.id === action.blogpost_id){
						required_blogpost = item
						blogpost_index = index
					}
				})
				
				var newTotalBlogPost = []
				var required_user = {}
				var user_index = 0
				currentTotalBlogPost.map((item, index)=>{
					if (index === blogpost_index){
						let currentUsers = item[ 'users' ]
						
						item[ 'users' ] = currentUsers.splice(action.user_id, 1)
					}
					newTotalBlogPost.push( item )
				})

				return {...state, currentTotalBlogPost: newTotalBlogPost}
				break;

		default:

			return state

	}

};

export default reducerForBlogPost;
