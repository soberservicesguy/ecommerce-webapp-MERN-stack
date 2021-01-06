const create_file_if_not_exists = require('/home/arsalan/resources/app_files_creator_package/modules/create_file_if_not_exists');

const components_list = [ 'React_Component_1' ] // always use underscores, they will be removed where needed
const containers_list = [ 'React_Grid' ] // fill container names without Container suffix but with underscores

const parents_children_pairs = [
	{
		// parent children pair is below
		Carousel:[ 
		], 
		schemafields:{
			// serial_number:`Number`,
			image_filepath:`String`, 
			title:`String`,
			endpoint:'String', // there should be always endpoint in parent, and in summarized version
		},
		linked_object_and_live_object_in_redux: 'User',
		index:'endpoint',
		summarized_version_length:3,
		special_lists_in_frontend:[], // ['Cart',] // dont create it in parent
		attributes_which_can_be_modified_in_frontend:[], // ['initial_quantity', 'product_color', 'product_size'] // KKEP IT SINGLE TOJENNED
		object_filtering_keys:[
		],
	},

	{
		// parent children pair is below
		Product:[ 
		], 
		schemafields:{
			endpoint:`Number`,
			image_thumbnail_filepath:`String`, 
			title:`String`,
			price: `String`,
			initial_quantity:`String`,
			product_size:`String`,
			product_color:`String`,
			timestamp_of_uploading:`String`,
		},
		linked_object_and_live_object_in_redux: '',
		index:'endpoint',
		summarized_version_length:4,
		special_lists_in_frontend:['Cart'], // ['Cart',] // dont create it in parent
		attributes_which_can_be_modified_in_frontend:['product_size', 'initial_quantity', 'product_color'], // ['initial_quantity', 'product_color', 'product_size'] // KKEP IT SINGLE TOJENNED
		object_filtering_keys:[
		],
	},

	{
		// parent children pair is below
		Order:[
			{
				User:{
					schemafields:{
						user_name:`String`,
						phone_number:`String`,
						hash:'String',
						salt:'String',
						isLoggedIn: 'Boolean',
					},
					linked_object_and_live_object_in_redux: '',
					index:'phone_number',
					summarized_version_length:5, 
					special_lists_in_frontend:[],
					// attributes_which_can_be_modified_in_frontend:['initial_quantity', ]
					object_filtering_keys:[],
				}
			} 
		], 
		schemafields:{
			endpoint:`String`,
			timestamp_of_order:'String',
			order_amount:'Number',
		},
		linked_object_and_live_object_in_redux: 'User',
		index:'endpoint',
		summarized_version_length:1,
		special_lists_in_frontend:[], // ['Cart',] // dont create it in parent
		attributes_which_can_be_modified_in_frontend:[], // ['initial_quantity', 'product_color', 'product_size'] // KKEP IT SINGLE TOJENNED
		object_filtering_keys:[
		],
	},

	{
		// parent children pair is below
		Blog_Post:[ 
		], 
		schemafields:{
			endpoint:'String', // there should be always endpoint in parent, and in summarized version
			image_thumbnail_filepath:`String`, 
			title:`String`,
			first_para:'String',
			initial_tags:'String',
			second_para:'String',
			third_para:'String',
			fourth_para:'String',
			all_tags:'String',
			timestamp_of_uploading:`String`,
		},
		linked_object_and_live_object_in_redux: 'User',
		index:'serial_number',
		summarized_version_length:5,
		special_lists_in_frontend:[], // ['Cart',] // dont create it in parent
		attributes_which_can_be_modified_in_frontend:[], // ['initial_quantity', 'product_color', 'product_size'] // KKEP IT SINGLE TOJENNED
		object_filtering_keys:[
		],
	},

]

function showListsProperly(the_list){
	let new_list = `[`
	the_list.map((item, index)=>{
		new_list = new_list  + `'${item}',`
	})
	new_list = new_list + `]`
	return new_list
}

function showDictProperly(schemafield_object){
	// let schemafields_dict = Object.keys(schemafield_object)[0]

	let schemakeys = Object.keys(schemafield_object)

	let new_dict = `
					{`

	schemakeys.map((key, index)=>{
		new_dict = new_dict + `
						${key}: '${schemafield_object[key]}',`
	})

	new_dict = new_dict + `
					},
`
	return new_dict
}

function generateKeyValuePairsProperly(list_of_dicts){
	let new_list = `[`


	list_of_dicts.map((dict)=>{
		let proper_dict = showDictProperly(dict)
		new_list = new_list + proper_dict
	})

	new_list = new_list + `]`

	return new_list
}

function generate_schema_file(){
	var file_content = ``
	var all_linked_objects_list = []
	var all_classes_which_have_links = []

	file_content = file_content + `
const components_list = ${showListsProperly(components_list)}
const containers_list = ${showListsProperly(containers_list)}

	`

	file_content = file_content + `
const all_schemas = [
	`

	parents_children_pairs.map((parent_child_pair, index)=>{
		// first key is the db name
		let parent_name = Object.keys(parent_child_pair)[0]
		let parent_schemafields = parent_child_pair.schemafields
		let parent_index = parent_child_pair.index
		let parent_summarized_version_length = parent_child_pair.summarized_version_length
		let parent_linked_object_and_live_object_in_redux = parent_child_pair.linked_object_and_live_object_in_redux

		all_linked_objects_list.push( parent_linked_object_and_live_object_in_redux )
		if ( parent_linked_object_and_live_object_in_redux !== '' ){
			all_classes_which_have_links.push( parent_name )
		}

		let special_lists_in_frontend = parent_child_pair.special_lists_in_frontend
		let attributes_which_can_be_modified_in_frontend = parent_child_pair.attributes_which_can_be_modified_in_frontend 
		let object_filtering_keys = parent_child_pair.object_filtering_keys

		let parent_name_without_dashes = parent_name.split("_").join("")

		let child_name = ''
		let children_names = []
		let children_details_list = parent_child_pair[parent_name]
		children_details_list.map((child_details, child_index)=>{
			child_name = Object.keys(child_details)[0]
			children_names.push( child_name )
		})


		file_content = file_content + `
	{
		parent:{
			react_class_name_for_component:'Individual_${parent_name}', // used for pushing reducers and endpoints, and state to components. ALSO always use underscores, they will be removed where needed
			react_class_name_for_container:'${parent_name}', // used for pushing reducers and endpoints, and state to containers. ALSO fill container names WITHOUT CONTAINER suffix but with underscores
			react_class_name_for_card:'${parent_name}_Card',

			class_name:'${parent_name_without_dashes}', // first letter should be capitalized of each token and singular
			summarized_version_length:${parent_summarized_version_length},
			index:'${String(parent_index)}',

			children_classes:${showListsProperly(children_names)},
			schemafields:${showDictProperly(parent_schemafields)}
			
			special_lists_in_frontend: ${showListsProperly(special_lists_in_frontend)},
			attributes_which_can_be_modified_in_frontend: ${showListsProperly(attributes_which_can_be_modified_in_frontend)},
			object_filtering_keys: ${generateKeyValuePairsProperly(object_filtering_keys)},

			linked_object_and_live_object_in_redux: '${parent_linked_object_and_live_object_in_redux}',

			other_model_links:[
	`
		children_names.map((child_name)=>{
			if ( !all_linked_objects_list.includes(child_name) ){

				file_content = file_content + `
					{${child_name.split("_").join("").toLowerCase()}s: \`[{ type: Schema.Types.ObjectId, ref: '${child_name.split("_").join("")}' }]\`},
`
			} else {

				file_content = file_content + `
					{${child_name.split("_").join("").toLowerCase()}: \`{ type: Schema.Types.ObjectId, ref: '${child_name.split("_").join("")}' }\`},
`

			}

		})
		file_content = file_content + `
				]
			},

		children:[
	`



		children_details_list.map((child_details, child_index)=>{
			child_name = Object.keys(child_details)[0]
			child_schemafields = child_details[child_name].schemafields
			child_index = child_details[child_name].index
			child_summarized_version_length = child_details[child_name].summarized_version_length
			child_linked_object_and_live_object_in_redux = child_details[child_name].linked_object_and_live_object_in_redux

			all_linked_objects_list.push( child_linked_object_and_live_object_in_redux )
			if (child_linked_object_and_live_object_in_redux !== ''){
				all_classes_which_have_links.push( child_name )
			}

			child_name_without_dashes = child_name.split("_").join("")

			file_content = file_content + `
			{
				react_class_name_for_component:'Individual_${child_name}', // used for pushing reducers and endpoints, and state to components. ALSO always use underscores, they will be removed where needed
				react_class_name_for_container:'${child_name}', // used for pushing reducers and endpoints, and state to containers. ALSO fill container names WITHOUT CONTAINER suffix but with underscores
				react_class_name_for_card:'${child_name}_Card',
				class_name:'${child_name_without_dashes}', // first letter should be capitalized of each token and singular
				summarized_version_length:${child_summarized_version_length},
				index:'${child_index}',
				schemafields:${showDictProperly(child_schemafields)}
				other_model_links:[`

			if( !all_linked_objects_list.includes(child_name) ){

				file_content = file_content + `
					{${parent_name_without_dashes.toLowerCase()}: \`{ type: Schema.Types.ObjectId, ref: '${parent_name_without_dashes}'  }\`},
					{${child_linked_object_and_live_object_in_redux.split("_").join("").toLowerCase()}: \`{ type: Schema.Types.ObjectId, ref: '${child_linked_object_and_live_object_in_redux.split("_").join("")}'  }\`},
`
			} else {

				all_classes_which_have_links.map((classes_involving_link) => {

					file_content = file_content + `
					{${classes_involving_link.split("_").join("").toLowerCase()}s: \`\[{ type: Schema.Types.ObjectId, ref: '${classes_involving_link}'  }\]\`},`
				})
			}

			file_content = file_content + `

				],
			
				linked_object_and_live_object_in_redux: '${child_linked_object_and_live_object_in_redux}',
			},				
	`
		})

		file_content = file_content + `
		]
	},
`
	})


	file_content = file_content + `
]

module.exports = {
	components_list:components_list,
	containers_list:containers_list,
	all_schemas:all_schemas,
};
`
	create_file_if_not_exists('schemas.js', './', file_content )
}

// module.exports = generate_schema_file

generate_schema_file()

// GENERATE ROOT PLAN TOO, IE SEQUENCE FOR GO TO WHICH FILE AND DO WHAT, SAVE IT IN SEPARATE FILE
	// go to each card module and create card so that cards are displayed
	// go to each complete object screen so that complete object is displayed
	// go to other ordinary screens, create their layout and components
