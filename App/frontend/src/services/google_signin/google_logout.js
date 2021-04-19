import React from 'react';
import { GoogleLogout } from 'react-google-login';

class LogOutFromGoogle extends React.Component {

	const responseGoogle = (response) => {
		console.log(response);
	}
 
	render() {
		return (
			<GoogleLogout
				clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
				buttonText="Logout"
				onLogoutSuccess={logout}
			>
		    </GoogleLogout>
		)
	}
}
 
export default LogOutFromGoogle;