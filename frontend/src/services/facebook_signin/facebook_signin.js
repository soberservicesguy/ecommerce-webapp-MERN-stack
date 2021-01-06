import React from 'react';
import FacebookLogin from 'react-facebook-login';
 
class SignInThroughFacebook extends React.Component {

	responseFacebook(response) {
		console.log(response)
	}
 
	render() {
		return (
			<FacebookLogin
				appId="1088597931155576"
				autoLoad={true}
				fields="name,email,picture"
				onClick={componentClicked}
				callback={this.responseFacebook}
			/>
		)
	}
}
 
export default SignInThroughFacebook;