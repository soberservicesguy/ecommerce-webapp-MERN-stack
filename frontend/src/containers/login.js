import React, {Component} from 'react';
import axios from 'axios';

// IMPORT connected components
// import {ConnectedSomeComponent} from "../redux_stuff/connected_components";

import utils from "../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../responsiveness_hook";

import {
	TextField,
	// Modal, 
	// Grid, 
	// Button 
} from "@material-ui/core";

import { verify_privilege } from "../handy_functions/"


class LoginContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {

			phone_number: '',
			password:'',

		}
	}

	componentDidMount(){

	}

	make_request_to_protected_route(){

		axios.get(utils.baseUrl + '/users/protected')
		.then(function (response) {
			if (response.data.success === true){

				console.log(response.data)

			} else {
				console.log(response.data)
				console.log('not authorized')
			}

		})
		.catch(function (error) {
			// console.log(error);
		});	
	}

	login_and_get_jwt_token_and_privileges(){

		axios.post(utils.baseUrl + '/users/login', 
			{
				phone_number:this.state.phone_number, 
				password:this.state.password
			}
		)
		.then(function (response) {
			if (response.data.success === true){

				// console.log(response.data)
				axios.defaults.headers.common['Authorization'] = response.data.token				
				this.props.set_is_signed_in( true )
				this.props.set_phone_number( this.state.phone_number )

				verify_privilege(this, response.data.privileges)
			// not needed anymore, made it DRY using above function
				// // response.data.privileges.map((privilege_name) => {

				// // 	if ( privilege_name === 'Basic' ){

				// // 		this.props.allow_basic_privilege()

				// // 	} else if ( privilege_name === 'Images control' ){

				// // 		this.props.allow_images_privilege()

				// // 	} else if ( privilege_name === 'Videos control' ){

				// // 		this.props.allow_videos_privilege()

				// // 	} else if ( privilege_name === 'Blogposts control' ){

				// // 		this.props.allow_blogpost_privilege()

				// // 	} else  if ( privilege_name === 'Revoke Basic' ){

				// // 		this.props.revoke_basic_privilege()

				// // 	} else if  ( privilege_name === 'Revoke Images control' ){

				// // 		this.props.revoke_images_privilege()

				// // 	} else if  ( privilege_name === 'Revoke Videos control' ){

				// // 		this.props.revoke_videos_privilege()

				// // 	} else if  ( privilege_name === 'Revoke Blogposts control' ){

				// // 		this.props.revoke_blogpost_privilege()

				// // 	} else {
				// // 	}

				// })

			} else {
				console.log('couldnt login')
			}

		})
		.catch(function (error) {
			// console.log(error);
		});	
	}

	render() {

		const styles = {

		}

		return(
			<div style={styles.screenContainer}>
				
				<div style={styles.buttonContainer}>
					<button style={styles.roundButton} onClick={() => null} activeOpacity={0.2}>
						<p style={styles.text}>
							LOGIN WITH FACEBOOK
						</p>
					</button>
				</div>

			
				<div style={styles.orContainer}>
					<div style={styles.leftBar}>
					</div>

					<div style={styles.orTextChild}>
						<p style={styles.orText}>
							OR
						</p>
					</div>

					<div style={styles.rightBar}>
					</div>
				</div>

				<div style={styles.textinputContainer}>
					<p style={styles.headingOverInput}>
						PHONE_NUMBER
					</p>
					<form className={styles.root} noValidate autoComplete="off">
						<TextField 
							label="Type your phone number" // placeholder 
							id="standard-basic" // "filled-basic" / "outlined-basic"
							variant="outlined" // "filled"
							classes={styles.textinput}
							onChange={ (event) =>  this.setState(prev => ({...prev, phone_number: event.target.value})) }
						/>
					</form>
				</div>

				<div style={styles.textinputContainer}>
					<p style={styles.headingOverInput}>
						PASSWORD
					</p>
					<form className={styles.root} noValidate autoComplete="off">
						<TextField 
							label="Type your password" // placeholder 
							id="standard-basic" // "filled-basic" / "outlined-basic"
							variant="outlined" // "filled"
							classes={styles.textinput}
							onChange={ (event) =>  this.setState(prev => ({...prev, password: event.target.value})) }
						/>
					</form>
				</div>
					
				<button style={styles.lowerButton} activeOpacity={0.2}
					onClick={ () => this.login_and_get_jwt_token_and_privileges() }
				>
					Sign In
				</button>
								

				<button style={styles.lowerButton} activeOpacity={0.2}
					onClick={ () => this.make_request_to_protected_route() }
				>
					MAKE REQUEST AT PROTECTED ROUTE
				</button>

				<button style={styles.lowerButton} activeOpacity={0.2}
					onClick={ () => this.logout_and_remove_jwt_token() }
				>
					LOGOUT
				</button>

			</div>
		);
	}
}

// export default LoginContainer;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(LoginContainer)