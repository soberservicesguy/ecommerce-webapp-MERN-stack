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

import resize_image from "../../handy_functions/resize_image"


class CreateCarousel extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			redirectToRoute: false,

			image_filepath: '',
			title: '',
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
			return <Redirect to = {{ pathname: "/Individual-Carousel" }} />

		} else {

			return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
				<div style={styles.outerContainer}>

					<div style={styles.textinputContainer}>
						<p style={styles.headingOverInput}>
							Carousel image
						</p>
						<form className={styles.root} noValidate autoComplete="off">
							<input
								name="carousel_image" // name of input field or fieldName simply
								enctype="multipart/form-data"
								type="file"
								onChange={async (event) => {

									try {
										const file = event.target.files[0];
										const compressed_image = await resize_image(file);
										this.setState(prev => ({...prev, image_filepath: compressed_image}))

									} catch (err) {
										console.log(err);
									}

								}}
							/>
						</form>
					</div>


				  	<div style={styles.textinputContainer}>
						<form className={styles.root} noValidate autoComplete="off">
							<TextField 
								label="Type your title" // placeholder 
								id="standard-basic" // "filled-basic" / "outlined-basic"
								variant="outlined" // "filled"
								classes={styles.textinput}
								onChange={ (event) => this.setState( prev => ({...prev, title: event.target.value})) }
							/>
						</form>
				  	</div>


					<button style={styles.buttonWithoutBG}
						onClick={ () => {

							let setResponseInCurrentCarousel = (arg) => this.props.set_current_carousel(arg)
							let redirectToNewCarousel = () => this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))	

							const formData = new FormData()
							formData.append('title', this.state.title)
					
							if (this.state.image_filepath !== ''){

								formData.append('carousel_image', this.state.image_filepath, this.state.image_filepath.name)

								axios.post(utils.baseUrl + '/carousels/create-carousel-with-user', formData)
								.then(function (response) {
									// console.log(response.data) // current carousel screen data
									
									// set to current parent object
									setResponseInCurrentCarousel(response.data.new_carousel)

									// change route to current_carousel
									redirectToNewCarousel()

								})
								.catch(function (error) {
									console.log(error)
								});						

							}


						}}
					>
						<p style={styles.innerText}>
							Press To Create Carousel
						</p>
					</button>
				</div>
			);
		}			
	}
}
	
CreateCarousel.defaultProps = {

};

// export default CreateCarousel // REMOVE withResponsiveness and withStyles as much as possible
export default withRouter(withResponsiveness(CreateCarousel))