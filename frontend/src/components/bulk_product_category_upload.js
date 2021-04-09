import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../utilities";

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
import withResponsiveness from "../responsiveness_hook";



class BulkProductCategoryUpload extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			redirectToRoute: false,
			image_main: [],
			excel_sheet:'',
		}

	}


// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		const styles = {
			outerContainer:{
				backgroundColor: 'white',
				width:'100%',
				margin:'auto',
				// height:500,
				marginBottom:10,
				paddingTop:30,
				paddingBottom:30,
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
				// backgroundColor: '#000000',
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

		// parameters being passed from previous route
		const endpoint_params_passed = this.props.match.params

		if ( this.state.redirectToRoute !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))

			// redirecting
			return <Redirect to = {{ pathname: "/products" }} />

		} else {

			return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
				<div style={styles.outerContainer}>

				

							{/*image upload*/}
							<div style={{width:'100%', margin:'auto', textAlign:'center'}}>
								<label htmlFor="myImageInput">
									{/* below div will act as myInput button*/}
									<div style={styles.uploadImageButton}>
										<p>Upload Category Images</p>
									</div>
								</label>
								<input
									id="myImageInput"
									style={{display:'none'}}
									name="product_category_images_upload" // name of input field or fieldName simply
									multiple="multiple" // for selecting multiple files
									enctype="multipart/form-data"
									type="file"
									onChange={(event) => {
										// console logging selected file from menu
										console.log( event.target.files ) // gives all files
										// setState method with event.target.files[0] as argument
										this.setState(prev => ({...prev, image_main: event.target.files}))
									}}
								/>

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
						<div style={styles.formAndRounButtonContainer}>
							<button 
								style={styles.roundButton}
								onClick={ () => {

									// let setResponseInFetchedBlogPosts = (arg) => this.props.set_fetched_blogposts(arg)
									let redirectToNewBlogPosts = () => this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))	

									// in formData send individual variables and not a complete object
									// formData.append('video_object', video_object) // THIS WILL NOT WORK, SENT VARS INDIVIDUALLY
									const formData = new FormData()
									// attaching multiple files with formData
									Array.from(this.state.image_main).forEach((file) => {
										formData.append('product_category_images_upload', file, file.name)
									})
								// NO EXCEL SHEET NEEDED FOR THIS
									// if(this.state.excel_sheet !== ''){
									// 	formData.append('excel_sheet', this.state.excel_sheet, this.state.excel_sheet.name)
									// }

									axios.post(utils.baseUrl + '/uploads/bulk-upload-product-categories', formData)
									.then(function (response) {
										console.log(response.data) // current blogpost screen data
										
										// set to current parent object
										// setResponseInFetchedBlogPosts(response.data.new_blogpost)

										// change route to current_blogpost
										redirectToNewBlogPosts()

									})
									.catch(function (error) {
										console.log(error)
									});						

								}}
							>
								Upload All Product Categories
							</button>
						</div>

						<div style={styles.formAndRounButtonContainer}>
							<button 
								style={styles.roundButton}
								onClick={ () => {
									axios.get(utils.baseUrl + '/uploads/bulk-delete-products')
									.then(function (response) {
										console.log(response.data)
									})
									.catch(function (error) {
										console.log(error)
									});
								}}
							>
								Delete Existing Categories
							</button>
						</div>

					</div>

				</div>
			);
		}			
	}
}
	
BulkProductCategoryUpload.defaultProps = {

};

// export default BulkProductCategoryUpload // REMOVE withResponsiveness and withStyles as much as possible
export default withRouter(withResponsiveness(BulkProductCategoryUpload))