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
			outerContainer:{
				backgroundColor: 'white',
				// height:500,
				marginBottom:10,
				paddingTop:30,
				paddingBottom:30,
			},


		// round text input
			roundTextInputContainer:{
				width:'55%', 
				height:50,
				margin:'auto',
				marginTop:10,
				marginLeft:10,
				marginRight:10,
				// marginBottom:0,
				// backgroundColor: '#000000',
			},
			roundTextInput:{
				outline:'none', 
				width:'100%', 
				height:50, 
				paddingLeft:20,
				paddingRight:100, 
				color:'black', 
				borderRadius:30,
				borderWidth:1, 
				borderStyle:'solid',
				borderColor:'#eee', 
				backgroundColor: '#eee',
			},

		// roundButton
			formAndRounButtonContainer:{
				marginTop:20,
				// flex:1,
				flexBasis:'50%',
				// width: '20%',
				// width: 100,
				height: 40,
				backgroundColor: 'none',
				borderRadius: 40,
				borderWidth: 1, 
				borderStyle: 'solid',
				borderColor: 'grey', 
				backgroundColor: 'grey',

				// position: 'relative',
				// bottom: (this.state.tracked_height2 + 2) + (this.state.tracked_height1 + 2 - this.state.tracked_height2 - 2)/2, // self_height_including_border_thickness + difference in heights of both / 2
				// left: this.state.tracked_width1 + 2 - this.state.tracked_width2 - 10, // tracked_width - self_width - some_gap 
			},
			roundButton:{
				width:'100%',
				height:'100%',
				border:'none',
				background: 'none',
				outline:'none',
				color:'white',
				fontWeight:'bold',
			},

			uploadImageContainer:{
				flexBasis:'50%',
				// height:60,
				margin:'auto',
				// marginTop:5,
				display:'flex',
				flexDirection:'row',
				justifyContent: 'space-between', 
				alignItems:'center',
			},
			uploadImageButton:{
				paddingTop:20,
				// paddingBottom:20,
				fontWeight:'bold',
				color:'grey'
			}

		}

		return(
			<div style={styles.outerContainer}>


				<div style={{...styles.formAndRounButtonContainer, width:'30%', margin:'auto', backgroundColor: '#3B5998'}}>
					<button 
						style={styles.roundButton}
						onClick={ () => {}}
					>
						LOGIN WITH FACEBOOK
					</button>
				</div>				
				
				<p style={{textAlign:'center', marginTop:20, fontSize:20, fontWeight:'bold'}}>
					OR
				</p>


				<div style={{
					width:'80%',
					margin:'auto',
					display:'flex',
					flexDirection:'column',
					justifyContent: 'space-around',
					alignItems:'center',
					// height:60,
					marginBottom:20,
				}}>

					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your Phone number" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) =>  this.setState(prev => ({...prev, phone_number: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>

					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your password" 
								type="password" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) =>  this.setState(prev => ({...prev, password: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>

				</div>

				<div style={{
					width:'90%',
					margin:'auto',
					display:'flex',
					flexDirection:'row',
					justifyContent: 'space-around',
					alignItems:'center',
					height:60,
					marginBottom:20,
				}}>
					<div style={{...styles.formAndRounButtonContainer, marginRight:50, backgroundColor: '#3B5998'}}>
						<button 
							style={styles.roundButton}
							onClick={ () => this.login_and_get_jwt_token_and_privileges()}
						>
							Sign In
						</button>
					</div>

					<div style={{...styles.formAndRounButtonContainer, marginLeft:50,}}>
						<button 
							style={styles.roundButton}
							onClick={ () => this.make_request_to_protected_route() }
						>
							MAKE REQUEST AT PROTECTED ROUTE
						</button>
					</div>


					<div style={{...styles.formAndRounButtonContainer, marginLeft:50,}}>
						<button 
							style={styles.roundButton}
							onClick={ () => this.logout_and_remove_jwt_token() }
						>
							Logout
						</button>
					</div>
				</div>
			
			</div>
		);
	}
}

// export default LoginContainer;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(LoginContainer)