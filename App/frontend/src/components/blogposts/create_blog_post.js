import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import {
	TextField,
	Grid, 
	// Modal, 
	// Button 
} from "@material-ui/core";

import {
	withRouter,
	Redirect,
} from "react-router-dom";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";



class CreateBlogPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			redirectToRoute: false,

			image_thumbnail_filepath: '',
			title: '',
			first_para: '',
			initial_tags: '',
			second_para: '',
			third_para: '',
			fourth_para: '',
			all_tags: '',

			new_blogpost_id: null,
		}

	}


// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		const styles = {
			outerContainer:{
				// width:'100%',
				margin:'auto',
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
				// marginLeft:10,
				// marginRight:10,
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

			roundButton:{
				// width:'100%',
				flex:1,
				height:'100%',
				border:'none',
				background: 'none',
				outline:'none',
				color:'black',
				fontWeight:'bold',
				textAlign:'right',
				// backgroundColor: '#000000'
			},

			uploadImageButton:{
				flex:1,
				// backgroundColor: '#000000',
				paddingTop:20,
				// paddingBottom:20,
				fontWeight:'bold',
				color:'grey',
				textAlign:'left'
			}

		}

		// parameters being passed from previous route
		const endpoint_params_passed = this.props.match.params

		if ( this.state.redirectToRoute !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))

			// redirecting
			return <Redirect to = {{ pathname: `/blogposts/:${this.state.new_blogpost_id}` }} />

		} else {

			return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
				<div style={styles.outerContainer}>

					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your title" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) => this.setState( prev => ({...prev, title: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>
					
					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your first_para" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) => this.setState( prev => ({...prev, first_para: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>
					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your initial_tags" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) => this.setState( prev => ({...prev, initial_tags: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>

					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your second_para" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) => this.setState( prev => ({...prev, second_para: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>

					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your third_para" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) => this.setState( prev => ({...prev, third_para: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>

					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your fourth_para" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) => this.setState( prev => ({...prev, fourth_para: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>

					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your all_tags" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) => this.setState( prev => ({...prev, all_tags: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>


					<div style={{
						width:'50%',
						margin:'auto',
						display:'flex',
						flexDirection:'row',
						justifyContent: 'space-around',
						alignItems:'center',
						height:60,
						marginBottom:20,
					}}>
						<div>
							<label htmlFor="myImageInput">
								{/* below div will act as myInput button*/}
								<div style={styles.uploadImageButton}>
									<p>Upload Image</p>
								</div>
							</label>
							<input
								id="myImageInput"
								style={{display:'none'}}
								enctype="multipart/form-data"
								type="file"
								name="blogpost_image_main" // name of input field or fieldName simply
								onChange={(event) => {
									// console logging selected file from menu
									// console.log( event.target.files[0] ) // gives first file
									// setState method with event.target.files[0] as argument
									this.setState(prev => ({...prev, image_thumbnail_filepath: event.target.files[0]}))
								}}
							/>
						</div>

						<button style={styles.roundButton}
							onClick={ () => {

								let setResponseInCurrentBlogPost = (arg) => this.props.set_current_blogpost(arg)
								let redirectToNewBlogPost = () => this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))	
								let setNewBlogpostIDAtState = (response) => this.setState(prev => ({...prev, new_blogpost_id: response.data.new_blogpost.endpoint }))	

								const formData = new FormData()
								formData.append('title', this.state.title)
								formData.append('first_para', this.state.first_para)
								formData.append('initial_tags', this.state.initial_tags)
								formData.append('second_para', this.state.second_para)
								formData.append('third_para', this.state.third_para)
								formData.append('fourth_para', this.state.fourth_para)
								formData.append('all_tags', this.state.all_tags)

								if(this.state.image_thumbnail_filepath !== ''){
									formData.append('blogpost_image_main', this.state.image_thumbnail_filepath, this.state.image_thumbnail_filepath.name)

									axios.post(utils.baseUrl + '/blogpostings/create-blogpost-with-user', formData)
									.then(function (response) {
										// console.log(response.data) // current blogpost screen data
										
										setNewBlogpostIDAtState(response)
										// set to current parent object

										setResponseInCurrentBlogPost(response.data.new_blogpost)

										// change route to current_blogpost
										redirectToNewBlogPost()

									})
									.catch(function (error) {
										console.log(error)
									});						

								}

							}}
						>
							<p style={styles.innerText}>
								Press To Create BlogPost
							</p>
						</button>
					</div>


				</div>
			);
		}			
	}
}
	
CreateBlogPost.defaultProps = {

};

// export default CreateBlogPost // REMOVE withResponsiveness and withStyles as much as possible
export default withRouter(withResponsiveness(CreateBlogPost))