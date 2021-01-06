const initialState = {

	currentCarousel:{
			image_filepath:'dummy',
			title:'dummy',
			endpoint:'dummy',
		},

	totalCarousel: [
			{ image_filepath:'dummy1', title:'dummy1', endpoint:'dummy1',},
			{ image_filepath:'dummy2', title:'dummy2', endpoint:'dummy2',},
			{ image_filepath:'dummy3', title:'dummy3', endpoint:'dummy3',},
			{ image_filepath:'dummy4', title:'dummy4', endpoint:'dummy4',},
			{ image_filepath:'dummy5', title:'dummy5', endpoint:'dummy5',},
			{ image_filepath:'dummy6', title:'dummy6', endpoint:'dummy6',},
			{ image_filepath:'dummy7', title:'dummy7', endpoint:'dummy7',},
			{ image_filepath:'dummy8', title:'dummy8', endpoint:'dummy8',},
			{ image_filepath:'dummy9', title:'dummy9', endpoint:'dummy9',},
			{ image_filepath:'dummy10', title:'dummy10', endpoint:'dummy10',},
		],
	}

const reducerForCarousel = (state = initialState, action) => {

	switch (action.type) {

		case "SET_CURRENT_CAROUSEL":

			return {...state, currentCarousel: action.current_carousel}
			break;


		case "SET_FETCHED_CAROUSEL":

			return {...state, totalCarousel: action.carousel_list}
			break;

		case "SET_FETCHED_10_MORE_CAROUSEL":

			return {...state, totalCarousel: [...state.Carousel, action.carousel_list] }
			break;


		case "ADD_USER_TO_CAROUSEL":

			var currentTotalCarousel = state.totalCarousel

				var required_carousel = {}
				var carousel_index = 0
				currentTotalCarousel.map((item, index)=>{
					if (item.id === action.carousel_id){
						required_carousel = item
						carousel_index = index
					}
				})
				
				let new_user = {}
				if( required_carousel[ 'users' ].length > 0 ){

					let last_id = required_carousel[ 'users' ][ required_carousel[ 'users' ].length - 1 ].id
					new_user = {id: last_id + 1, ...action.user_object}

				} else {

					new_user = {id: 0, ...action.user_object}
				}

				var newTotalCarousel = []
				currentTotalCarousel.map((item, index)=>{
					if (index === carousel_index){
						let currentUsers = item[ 'users' ]
						item[ 'users' ] = [ ...currentUsers, new_user ]
					}
					newTotalCarousel.push(item)
				})

				return {...state, currentTotalCarousel: newTotalCarousel}
				break;

		case "REMOVE_USER_FROM_CAROUSEL":

			var currentTotalCarousel = state.totalCarousel

				var required_carousel = {}
				var carousel_index = 0
				currentTotalCarousel.map((item, index)=>{
					if (item.id === action.carousel_id){
						required_carousel = item
						carousel_index = index
					}
				})
				
				var newTotalCarousel = []
				var required_user = {}
				var user_index = 0
				currentTotalCarousel.map((item, index)=>{
					if (index === carousel_index){
						let currentUsers = item[ 'users' ]
						
						item[ 'users' ] = currentUsers.splice(action.user_id, 1)
					}
					newTotalCarousel.push( item )
				})

				return {...state, currentTotalCarousel: newTotalCarousel}
				break;

		default:

			return state

	}

};

export default reducerForCarousel;
