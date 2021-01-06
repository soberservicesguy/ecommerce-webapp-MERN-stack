function get_allowed_privileges_list(user_object){

	let privileges_list = [] 
	user_object.privileges.map((privilege_object) => {

		if ( privilege_object.privilege_name === 'allow_surfing' ){
	
			privileges_list.push( 'Basic' )

		} else if ( privilege_object.privilege_name === 'is_allowed_product_upload' ){

			privileges_list.push( 'Products control' )

		} else if ( privilege_object.privilege_name === 'is_allowed_carousel_upload' ){

			privileges_list.push( 'Carousels control' )

		} else if ( privilege_object.privilege_name === 'is_allowed_writing_blopost' ){

			privileges_list.push( 'Blogposts control' )

		} else {
		}

	})

// add revoked or privileges that are not given
	if ( !privileges_list.includes('Basic') ){

	// not needed to revoke basic
		// privileges_list.push('Revoke Basic')
	
	} 

	if ( !privileges_list.includes('Carousels control') ){

		privileges_list.push('Revoke Carousels control')

	} 

	if ( !privileges_list.includes('Products control') ){

		privileges_list.push('Revoke Products control')

	} 

	if ( !privileges_list.includes('Blogposts control') ){

		privileges_list.push('Revoke Blogposts control')

	} 

	return privileges_list
}

module.exports = get_allowed_privileges_list