
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

const styles = theme => ({
	iconStyle:{
		alignSelf:'center',
	},
	screenContainer:{
		alignItems:'center',
		flex:1,
		// display:'flex',
		// flexDirection: 'column',
		alignItems:'center',
		justifyContent: 'space-between', 
	},

	lowerButton:{
		alignItems: 'center',
		width:'100%',
		paddingTop:15,
		paddingBottom:15,
		marginBottom:0,
		backgroundColor: 'grey',
	},

	buttonWithoutBG:{
		marginTop:50,
		marginBottom:50,

	},
	textinput:{
		marginTop:20,
		textAlign:'left',
		borderWidth:1,
		borderColor:(utils.lightGrey),
		borderStyle:'solid',
		paddingLeft:20,
		paddingTop:15,
		paddingBottom:15,
		fontSize:18,
	},
	orText:{
		color:utils.lightGrey,
		fontSize:20,
		textAlign:'center',
	},
	orTextChild:{
		flex:1,
	},
	rightBar:{
		flex:3,
		borderBottomWidth:1,
		borderColor:utils.lightGrey,
		width:'100%',
	},
	leftBar:{
		flex:3,
		borderBottomWidth:1,
		borderColor:utils.lightGrey,
	},
	orContainer:{
		marginTop:20,
		display:'flex',
		flexDirection:'row',
		alignItems:'center',
		justifyContent: 'center',
		width:'80%',
	},
	buttonContainer:{
		marginTop:30,
		justifyContent: 'center',
		alignSelf:'center',
		height:100,
		width:'80%',
	},
	roundButton:{
		borderRadius:50,
		borderColor:'green',
		borderWidth:2,
		backgroundColor: 'green',
		borderStyle:'solid',
		width:'100%',
		paddingTop:15,
		paddingBottom:15,
	},
	text:{
		fontSize:20,
		color:'white',
		textAlign:'center',
	},
	headingOverInput:{
		width:'100%',
		marginTop:20,
		fontSize:18,
		fontWeight:'bold',
		textAlign:'left',
	},
	textinputContainer:{
		width:'80%',
	},

	formControl: {
		margin: theme.spacing(1),
		minWidth: 500,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
});

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
		formData.append('avatar_image', this.state.user_image, this.state.user_image.name)


		axios.post(utils.baseUrl + '/users/signup-and-get-privileges', formData, {
			onUploadProgress: progressEvent => {
				console.log( 'upload progress: ' + Math.round((progressEvent.loaded / progressEvent.total)*100) + '%' )
			}
		})
		.then(function (response) {
			console.log(`POST rest call response is${JSON.stringify(response.data, null, 1)}`);
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

		if ( this.state.redirectToRoute !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))

			// redirecting
			return <Redirect to = {{ pathname: "/login" }} />

		} else {

			return(
				<div style={styles.screenContainer}>
					
					<div style={styles.buttonContainer}>
						<button style={styles.roundButton} onClick={() => null} activeOpacity={0.2}>
							<p style={styles.text}>
								SIGN UP WITH FACEBOOK
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
							USER_NAME
						</p>
						<form className={styles.root} noValidate autoComplete="off">
							<TextField 
								label="Type your user name" // placeholder 
								id="standard-basic" // "filled-basic" / "outlined-basic"
								variant="outlined" // "filled"
								classes={styles.textinput}
								onChange={ (event) =>  this.setState(prev => ({...prev, user_name: event.target.value})) }
							/>
						</form>
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

					<div style={styles.textinputContainer}>
						<p style={styles.headingOverInput}>
							USER_IMAGE
						</p>
						<form className={styles.root} noValidate autoComplete="off">
							<input
								name="avatar_image" // name of input field or fieldName simply
								enctype="multipart/form-data"
								type="file"
								onChange={(event) => {
									// console logging selected file from menu
									console.log( event.target.files[0] ) // gives first file
									// setState method with event.target.files[0] as argument
									this.setState(prev => ({...prev, user_image: event.target.files[0]}))
								}}
							/>
						</form>
					</div>

					<div style={{marginTop: 10,}}>
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
									console.log( event.target.value ) // gives first file
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
								<MenuItem value={'Blogposts control'}>
									Uploading Blogposts
								</MenuItem>
								<MenuItem value={'Total control'}>
									All Privileges
								</MenuItem>
							</Select>
						</FormControl>
					</div>


					<button  onClick={() => {}} style={styles.buttonWithoutBG}>
						<p style={styles.lowerText}>
							Already have an account ?
						</p>
					</button>
						
					<button style={styles.lowerButton} activeOpacity={0.2}
						onClick={ () => this.signup_and_get_privileges() }
					>
						Create Account
					</button>
									
				</div>
			);
		}
	}
}

// export default SignUpContainer;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(withStyles(styles)(SignUpContainer))
