
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
	// Button,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from "@material-ui/core";

import {
	// withRouter,
	Redirect,
} from "react-router-dom";


class SignUpContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {

			user_name: '',
			phone_number: '',
			password:'',
			user_image: '',

			privileges_selected:'',

			redirectToRoute: false,

		}
	}

	componentDidMount(){

	}


	signup_and_get_privileges(){
		// upload file with axios request
		const formData = new FormData()
		formData.append('user_name', this.state.user_name)
		formData.append('password', this.state.password)
		formData.append('phone_number', this.state.phone_number)
		formData.append('privileges_selected', this.state.privileges_selected)
		formData.append('category', 'avatar')
		if(this.state.user_image !== ''){
			formData.append('avatar_image', this.state.user_image, this.state.user_image.name)
		}


		axios.post(utils.baseUrl + '/users/signup-and-get-privileges', formData, {
			onUploadProgress: progressEvent => {
				// console.log( 'upload progress: ' + Math.round((progressEvent.loaded / progressEvent.total)*100) + '%' )
			}
		})
		.then(function (response) {
			// console.log(`POST rest call response is${JSON.stringify(response.data, null, 1)}`);
			if (response.data.success === true){
				// console.log('yes')
			}

			return response
		})
		.then((response) => {
			if (response.data.success === true){

			// REDIRECT TO LOGIN
				this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))

			} else {
				console.log('user sign up failed, try again')
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
				flexBasis:'35%',
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
			return <Redirect to = {{ pathname: "/login" }} />

		} else {

			return(
				<div style={styles.outerContainer}>

					<div style={{...styles.formAndRounButtonContainer, width:'27%', margin:'auto', backgroundColor: '#3B5998'}}>
						<button 
							style={styles.roundButton}
							onClick={ () => {}}
						>
							SIGN UP WITH FACEBOOK
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
									placeholder="Set your User name" 
									type="text" 
									// name="post_text"
									// multiline={true}
									onChange={ (event) =>  this.setState(prev => ({...prev, user_name: event.target.value})) }
									style={styles.roundTextInput} 
								/>
							</form>
						</div>

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
									placeholder="Set your password" 
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
						display:'flex',
						flexDirection:'row',
						justifyContent: 'space-around',
						alignItems:'center',
						height:60,
						marginBottom:20,
					}}>
						{/*image upload*/}
						<div>
							<label htmlFor="myImageInput">
								{/* below div will act as myInput button*/}
								<div style={styles.uploadImageButton}>
									Upload Image
								</div>
							</label>
							<input
								id="myImageInput"
								style={{display:'none'}}
								enctype="multipart/form-data"
								name="avatar_image" // name of input field or fieldName simply
								enctype="multipart/form-data"
								type="file"
								onChange={(event) => {
									// console logging selected file from menu
									// console.log( event.target.files[0] ) // gives first file
									// setState method with event.target.files[0] as argument
									this.setState(prev => ({...prev, user_image: event.target.files[0]}))
								}}
							/>
						</div>

						<div>
							<FormControl variant="outlined" style={styles.formControl}>
								<InputLabel id="demo-simple-select-outlined-label" style={{fontSize:20}}>
									Select Privileges To Use
								</InputLabel>
								<Select
									style={{width:280, fontSize:20}}
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									value={this.state.privileges_selected}
									label="Select Privileges To Use"
									onChange={(event) => {
										// console logging selected file from menu
										// console.log( event.target.value ) // gives first file
										// setState method with event.target.files[0] as argument
										this.setState(prev => ({...prev, privileges_selected: event.target.value}))
									}}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<MenuItem value={'Basic'}>
										Basic (surfing and ordering products)
									</MenuItem>
									<MenuItem value={'Products control'}>
										Uploading Products
									</MenuItem>
									<MenuItem value={'Carousels control'}>
										Uploading Carousels
									</MenuItem>
									<MenuItem value={'Blogposts control'}>
										Uploading Blogposts
									</MenuItem>
									<MenuItem value={'Total control'}>
										Total control
									</MenuItem>
								</Select>
							</FormControl>
						</div>
					</div>



					<div style={{
						width:'70%',
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
								onClick={ () => this.setState(prev => ({...prev, redirectToRoute: true})) }
							>
								Already have an account ?
							</button>
						</div>



						<div style={{...styles.formAndRounButtonContainer, marginLeft:50,}}>
							<button 
								style={styles.roundButton}
								onClick={ () => this.signup_and_get_privileges() }
							>
								Create Account
							</button>
						</div>
					</div>

									
				</div>

			);
		}
	}
}

// export default SignUpContainer;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(SignUpContainer)