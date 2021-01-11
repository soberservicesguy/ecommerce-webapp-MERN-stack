
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

const styles = theme => ({
	root: {
		height: 48,
		color: props => (props.cool) ? 'red' : 'black',
		[theme.breakpoints.up('sm')]:{
			paddingLeft:100
		},
	},
	buttonWithoutBG:{
		marginTop:50,
		marginBottom:50,
	},
	innerText:{

	},
	textinputContainer:{
		// marginTop: windowHeight * 0.05, // or 30  gap
		// height: windowHeight * 0.1, // or 100
		width: '80%',
		justifyContent: 'center', // vertically centered
		alignSelf: 'center', // horizontally centered
		// backgroundColor: utils.lightGreen,
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
	outerContainer: {
	},
	bigBlue: {
	},
});


class BulkBlogpostUpload extends Component {
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

		// parameters being passed from previous route
		const endpoint_params_passed = this.props.match.params

		if ( this.state.redirectToRoute !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))

			// redirecting
			return <Redirect to = {{ pathname: "/blogposts" }} />

		} else {

			return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
				<div style={styles.outerContainer}>


					<div style={styles.textinputContainer}>
						<p style={styles.headingOverInput}>
							UPLOAD BLOPOST IMAGES HERE
						</p>
						<form className={styles.root} noValidate autoComplete="off">
							<input
								name="blogpost_image_main" // name of input field or fieldName simply
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
							UPLOAD BLOPOST EXCEL SHEET HERE
						</p>
						<form className={styles.root} noValidate autoComplete="off">
							<input
								name="excel_sheet_for_blogpost" // name of input field or fieldName simply
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
								formData.append('blogpost_image_main', file, file.name)
							})
							formData.append('excel_sheet_for_blogpost', this.state.excel_sheet, this.state.excel_sheet.name)

							axios.post(utils.baseUrl + '/uploads/bulk-upload-blogposts', formData)
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
							Press To Create Bulk BlogPosts
						</p>
					</button>

					<div>
						<button style={styles.buttonWithoutBG}
							onClick={ () => {
								axios.get(utils.baseUrl + '/uploads/bulk-delete-blogposts')
								.then(function (response) {
									console.log(response.data)
								})
								.catch(function (error) {
									console.log(error)
								});
							}}
						>
							<p style={styles.innerText}>
								Press To DELETE ALL BLOGPOSTS
							</p>
						</button>
					</div>

				</div>
			);
		}			
	}
}
	
BulkBlogpostUpload.defaultProps = {

};

// export default BulkBlogpostUpload // REMOVE withResponsiveness and withStyles as much as possible
export default withRouter(withResponsiveness(withStyles(styles)(BulkBlogpostUpload)))
