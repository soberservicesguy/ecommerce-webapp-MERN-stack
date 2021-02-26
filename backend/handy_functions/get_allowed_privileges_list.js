require("../models/privilige")
const Privilege = require('mongoose').model('Privilege');

async function get_allowed_privileges_list(user_object){


	let privileges_names = [] 

	// console.log('user_object.privileges')
	// console.log(user_object.privileges)

// getting privilege names
	await Promise.all(user_object.privileges.map(async (privilege_id) => {
		let privilege_object = await Privilege.findOne({_id: privilege_id})
		console.log(privilege_id)
		console.log(privilege_object)
		privileges_names.push( privilege_object.privilege_name )
	}))

	// console.log('names')
	// console.log(privileges_names)

	// console.log('FROM PRIVILEGES')
	// console.log(user_object)
	// console.log(user_object.privileges)


	
	let privileges_list = [] 
	privileges_names.map((privilege_name) => {

		if ( privilege_name === 'allow_surfing' ){
	
			privileges_list.push( 'Basic' )

		} else if ( privilege_name === 'is_allowed_product_upload' ){

			privileges_list.push( 'Products control' )

		} else if ( privilege_name === 'is_allowed_carousel_upload' ){

			privileges_list.push( 'Carousels control' )

		} else if ( privilege_name === 'is_allowed_writing_blopost' ){

			privileges_list.push( 'Blogposts control' )

		} else {
		}

	})

	// console.log('privileges_list output')
	// console.log(privileges_list)

// add revoked or privileges that are not given
	// if ( !privileges_list.includes('Basic') ){

	// not needed to revoke basic
		// privileges_list.push('Revoke Basic')
	
	// } 

	if ( !privileges_list.includes('Carousels control') ){

		privileges_list.push('Revoke Carousels control')

	} 

	if ( !privileges_list.includes('Products control') ){

		privileges_list.push('Revoke Products control')

	} 

	if ( !privileges_list.includes('Blogposts control') ){

		privileges_list.push('Revoke Blogposts control')

	} 

	// console.log('privileges_list final output')
	// console.log(privileges_list)

	return privileges_list
}

module.exports = get_allowed_privileges_list