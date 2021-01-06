function verify_privilege(object, privileges_list){

	privileges_list.map((privilege_name) => {

		if ( privilege_name === 'Basic' ){

			object.props.allow_basic_privilege()

		} else if ( privilege_name === 'Images control' ){

			object.props.allow_images_privilege()

		} else if ( privilege_name === 'Videos control' ){

			object.props.allow_videos_privilege()

		} else if ( privilege_name === 'Blogposts control' ){

			object.props.allow_blogpost_privilege()

		} else  if ( privilege_name === 'Revoke Basic' ){

			object.props.revoke_basic_privilege()

		} else if  ( privilege_name === 'Revoke Images control' ){

			object.props.revoke_images_privilege()

		} else if  ( privilege_name === 'Revoke Videos control' ){

			object.props.revoke_videos_privilege()

		} else if  ( privilege_name === 'Revoke Blogposts control' ){

			object.props.revoke_blogpost_privilege()

		} else {
		}

	})

}

module.exports = verify_privilege