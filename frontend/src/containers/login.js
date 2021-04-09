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

import {
	// withRouter,
	Redirect,
} from "react-router-dom";


class LoginContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {

			phone_number: '',
			password:'',

			redirectToRoute:false,

			redirectToHome:false,


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

		let allow_basic_privilege = () => this.props.allow_basic_privilege()
		let allow_products_privilege = () => this.props.allow_all_products_privilege()
		let allow_blogposts_privilege = () => this.props.allow_blogposts_privilege()
		let allow_carousels_privilege = () => this.props.allow_carousels_privilege()

		let revoke_products_privilege = () => this.props.revoke_products_privilege()
		let revoke_carousels_privilege = () => this.props.revoke_carousels_privilege()
		let revoke_basic_privilege = () => this.props.revoke_basic_privilege()
		let revoke_blogposts_privilege = () => this.props.revoke_blogposts_privilege()
		
		let set_is_signed_in = () => this.props.set_is_signed_in( true )
		let set_phone_number= () => this.props.set_phone_number( this.state.phone_number )

		let redirectToHomeCallback = () => this.setState(prev => ({...prev, redirectToHome: true }))

		axios.post(utils.baseUrl + '/users/login', 
			{
				phone_number:this.state.phone_number, 
				password:this.state.password
			}
		)
		.then(function (response) {
			if (response.data.success === true){

				let privileges = response.data.privileges

				for (let i = 0; i < privileges.length; i++) {
					let privilege_name = privileges[i]


					if ( privilege_name === 'Basic' ){

						allow_basic_privilege()		
						console.log('You are allowed basic surfing')

					} else if ( privilege_name === 'Products control' ){

						allow_products_privilege()
						console.log('YOU CAN UPLOAD PRODUCTS')

					} else if ( privilege_name === 'Carousels control' ){

						allow_carousels_privilege()
						console.log('YOU CAN UPLOAD CAROUSELS')

					} else if ( privilege_name === 'Blogposts control' ){

						allow_blogposts_privilege()
						console.log('YOU CAN UPLOAD BLOGPOSTS')

					} else  if ( privilege_name === 'Revoke Basic' ){

						revoke_basic_privilege()
						console.log('YOU CAN NOW SURF ONLY')

					} else if  ( privilege_name === 'Revoke Products control' ){

						revoke_products_privilege()
						console.log('YOU CAN NO LONGER UPLOAD PRODUCTS')

					} else if  ( privilege_name === 'Revoke Carousels control' ){

						revoke_carousels_privilege()
						console.log('YOU CAN NO LONGER UPLOAD CAROUSELS')

					} else if  ( privilege_name === 'Revoke Blogposts control' ){

						revoke_blogposts_privilege()
						console.log('YOU CAN NOW NO LONGER UPLOAD BLOGPOSTS')

					} else {
					}

				}

				axios.defaults.headers.common['Authorization'] = response.data.token				

				set_is_signed_in()
				set_phone_number()

				redirectToHomeCallback()

			} else {
				console.log('couldnt login')
			}

		})
		.catch(function (error) {
			// console.log(error);
		});	
	}

	delete_all_users(){
		axios.get(utils.baseUrl + '/users/delete-all-users',)
		.then(function (response) {
			if (response.data.success === true){

				console.log(response.data.message)
				
			} else {
				console.log('couldnt delete all users')
			}

		})
		.catch(function (error) {
			// console.log(error);
		});	

	}


	delete_all_blogpost(){
		axios.get(utils.baseUrl + '/users/delete-all-blogposts',)
		.then(function (response) {
			if (response.data.success === true){

				console.log(response.data.message)
				
			} else {
				console.log('couldnt delete all blogposts')
			}

		})
		.catch(function (error) {
			// console.log(error);
		});	

	}

	delete_all_products(){
		axios.get(utils.baseUrl + '/users/delete-all-products',)
		.then(function (response) {
			if (response.data.success === true){

				console.log(response.data.message)
				
			} else {
				console.log('couldnt delete all products')
			}

		})
		.catch(function (error) {
			// console.log(error);
		});	

	}

	delete_all_images(){
		axios.get(utils.baseUrl + '/users/delete-all-images',)
		.then(function (response) {
			if (response.data.success === true){

				console.log(response.data.message)
				
			} else {
				console.log('couldnt delete all images')
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

		if ( this.state.redirectToRoute !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))

			// redirecting
			return <Redirect to = {{ pathname: "/signup" }} />

		} else if ( this.state.redirectToHome !== false ) {

			// switching it back to false
			this.setState(prev => ({...prev, redirectToHome: (prev.redirectToHome === false) ? true : false }))

			// redirecting
			return <Redirect to = {{ pathname: "/home" }} />

		} else {


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
								onClick={ () => this.setState(prev => ({...prev, redirectToRoute: true })) }
							>
								Sign Up
							</button>
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
						<div style={{...styles.formAndRounButtonContainer, marginLeft:50, backgroundColor: 'red', borderColor:'red'}}>
							<button 
								style={{...styles.roundButton, }}
								onClick={ () => this.delete_all_users() }
							>
								Delete All Users
							</button>
						</div>

						<div style={{...styles.formAndRounButtonContainer, marginLeft:50, backgroundColor: 'red', borderColor:'red'}}>
							<button 
								style={{...styles.roundButton, }}
								onClick={ () => this.delete_all_blogpost() }
							>
								Delete All Blogposts
							</button>
						</div>

						<div style={{...styles.formAndRounButtonContainer, marginLeft:50, backgroundColor: 'red', borderColor:'red'}}>
							<button 
								style={{...styles.roundButton, }}
								onClick={ () => this.delete_all_products() }
							>
								Delete All Products
							</button>
						</div>

						<div style={{...styles.formAndRounButtonContainer, marginLeft:50, backgroundColor: 'red', borderColor:'red'}}>
							<button 
								style={{...styles.roundButton, }}
								onClick={ () => this.delete_all_images() }
							>
								Delete All Images
							</button>
						</div>

					</div>
				
				</div>
			);
		}
	}
}

// export default LoginContainer;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(LoginContainer)