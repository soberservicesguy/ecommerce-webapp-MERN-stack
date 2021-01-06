
const components_list = ['React_Component_1',]
const containers_list = ['React_Grid',]

	
const all_schemas = [
	
	{
		parent:{
			react_class_name_for_component:'Individual_Carousel', // used for pushing reducers and endpoints, and state to components. ALSO always use underscores, they will be removed where needed
			react_class_name_for_container:'Carousel', // used for pushing reducers and endpoints, and state to containers. ALSO fill container names WITHOUT CONTAINER suffix but with underscores
			react_class_name_for_card:'Carousel_Card',

			class_name:'Carousel', // first letter should be capitalized of each token and singular
			summarized_version_length:3,
			index:'endpoint',

			children_classes:[],
			schemafields:
					{
						image_filepath: 'String',
						title: 'String',
						endpoint: 'String',
					},

			
			special_lists_in_frontend: [],
			attributes_which_can_be_modified_in_frontend: [],
			object_filtering_keys: [],

			linked_object_and_live_object_in_redux: 'User',

			other_model_links:[
	
				]
			},

		children:[
	
		]
	},

	{
		parent:{
			react_class_name_for_component:'Individual_Product', // used for pushing reducers and endpoints, and state to components. ALSO always use underscores, they will be removed where needed
			react_class_name_for_container:'Product', // used for pushing reducers and endpoints, and state to containers. ALSO fill container names WITHOUT CONTAINER suffix but with underscores
			react_class_name_for_card:'Product_Card',

			class_name:'Product', // first letter should be capitalized of each token and singular
			summarized_version_length:4,
			index:'endpoint',

			children_classes:[],
			schemafields:
					{
						endpoint: 'Number',
						image_thumbnail_filepath: 'String',
						title: 'String',
						price: 'String',
						initial_quantity: 'String',
						product_size: 'String',
						product_color: 'String',
						timestamp_of_uploading: 'String',
					},

			
			special_lists_in_frontend: ['Cart',],
			attributes_which_can_be_modified_in_frontend: ['product_size','initial_quantity','product_color',],
			object_filtering_keys: [],

			linked_object_and_live_object_in_redux: '',

			other_model_links:[
	
				]
			},

		children:[
	
		]
	},

	{
		parent:{
			react_class_name_for_component:'Individual_Order', // used for pushing reducers and endpoints, and state to components. ALSO always use underscores, they will be removed where needed
			react_class_name_for_container:'Order', // used for pushing reducers and endpoints, and state to containers. ALSO fill container names WITHOUT CONTAINER suffix but with underscores
			react_class_name_for_card:'Order_Card',

			class_name:'Order', // first letter should be capitalized of each token and singular
			summarized_version_length:1,
			index:'endpoint',

			children_classes:['User',],
			schemafields:
					{
						endpoint: 'String',
						timestamp_of_order: 'String',
						order_amount: 'Number',
					},

			
			special_lists_in_frontend: [],
			attributes_which_can_be_modified_in_frontend: [],
			object_filtering_keys: [],

			linked_object_and_live_object_in_redux: 'User',

			other_model_links:[
	
					{user: `{ type: Schema.Types.ObjectId, ref: 'User' }`},

				]
			},

		children:[
	
			{
				react_class_name_for_component:'Individual_User', // used for pushing reducers and endpoints, and state to components. ALSO always use underscores, they will be removed where needed
				react_class_name_for_container:'User', // used for pushing reducers and endpoints, and state to containers. ALSO fill container names WITHOUT CONTAINER suffix but with underscores
				react_class_name_for_card:'User_Card',
				class_name:'User', // first letter should be capitalized of each token and singular
				summarized_version_length:5,
				index:'phone_number',
				schemafields:
					{
						user_name: 'String',
						phone_number: 'String',
						hash: 'String',
						salt: 'String',
						isLoggedIn: 'Boolean',
					},

				other_model_links:[
					{carousels: `[{ type: Schema.Types.ObjectId, ref: 'Carousel'  }]`},
					{orders: `[{ type: Schema.Types.ObjectId, ref: 'Order'  }]`},

				],
			
				linked_object_and_live_object_in_redux: '',
			},				
	
		]
	},

	{
		parent:{
			react_class_name_for_component:'Individual_Blog_Post', // used for pushing reducers and endpoints, and state to components. ALSO always use underscores, they will be removed where needed
			react_class_name_for_container:'Blog_Post', // used for pushing reducers and endpoints, and state to containers. ALSO fill container names WITHOUT CONTAINER suffix but with underscores
			react_class_name_for_card:'Blog_Post_Card',

			class_name:'BlogPost', // first letter should be capitalized of each token and singular
			summarized_version_length:5,
			index:'serial_number',

			children_classes:[],
			schemafields:
					{
						endpoint: 'String',
						image_thumbnail_filepath: 'String',
						title: 'String',
						first_para: 'String',
						initial_tags: 'String',
						second_para: 'String',
						third_para: 'String',
						fourth_para: 'String',
						all_tags: 'String',
						timestamp_of_uploading: 'String',
					},

			
			special_lists_in_frontend: [],
			attributes_which_can_be_modified_in_frontend: [],
			object_filtering_keys: [],

			linked_object_and_live_object_in_redux: 'User',

			other_model_links:[
	
				]
			},

		children:[
	
		]
	},

]

module.exports = {
	components_list:components_list,
	containers_list:containers_list,
	all_schemas:all_schemas,
};
