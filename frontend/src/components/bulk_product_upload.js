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



class BulkProductUpload extends Component {
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


					<div style={styles.textinputContainer}>
						<p style={styles.headingOverInput}>
							UPLOAD PRODUCT IMAGES HERE
						</p>
						<form className={styles.root} noValidate autoComplete="off">
							<input
								name="product_images_upload" // name of input field or fieldName simply
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
						</form>
					</div>

					<div style={styles.textinputContainer}>
						<p style={styles.headingOverInput}>
							UPLOAD PRODUCT EXCEL SHEET HERE
						</p>
						<form className={styles.root} noValidate autoComplete="off">
							<input
								name="excel_sheet_for_products" // name of input field or fieldName simply
								// multiple="multiple" // for selecting multiple files
								enctype="multipart/form-data"
								type="file"
								onChange={(event) => {
									// console logging selected file from menu
									console.log( event.target.files[0] ) // gives first file
									// setState method with event.target.files[0] as argument
									this.setState(prev => ({...prev, excel_sheet: event.target.files[0]}))
								}}
							/>
						</form>
					</div>


					<button style={styles.buttonWithoutBG}
						onClick={ () => {

							// let setResponseInFetchedBlogPosts = (arg) => this.props.set_fetched_blogposts(arg)
							let redirectToNewBlogPosts = () => this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))	

							// in formData send individual variables and not a complete object
							// formData.append('video_object', video_object) // THIS WILL NOT WORK, SENT VARS INDIVIDUALLY
							const formData = new FormData()
							// attaching multiple files with formData
							Array.from(this.state.image_main).forEach((file) => {
								formData.append('product_images_upload', file, file.name)
							})
							formData.append('excel_sheet_for_products', this.state.excel_sheet, this.state.excel_sheet.name)

							axios.post(utils.baseUrl + '/uploads/bulk-upload-products', formData)
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
						<p style={styles.innerText}>
							Press To Create Bulk Products
						</p>
					</button>

					<div>
						<button style={styles.buttonWithoutBG}
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
							<p style={styles.innerText}>
								Press To DELETE ALL PRODUCTS
							</p>
						</button>
					</div>

				</div>
			);
		}			
	}
}
	
BulkProductUpload.defaultProps = {

};

// export default BulkProductUpload // REMOVE withResponsiveness and withStyles as much as possible
export default withRouter(withResponsiveness(BulkProductUpload))