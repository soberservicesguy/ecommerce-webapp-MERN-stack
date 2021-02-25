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



class CreateProduct extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			redirectToRoute: false,

			category:'',
			image_thumbnail_filepath: '',
			title: '',
			price: '',
			product_size: '',
			product_color: '',
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
			return <Redirect to = {{ pathname: "/Individual-Product" }} />

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
								placeholder="Type your category" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) => this.setState( prev => ({...prev, category: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>

					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your price" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) => this.setState( prev => ({...prev, price: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>

					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your product_size" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) => this.setState( prev => ({...prev, product_size: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>

					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your product_color" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) => this.setState( prev => ({...prev, product_color: event.target.value})) }
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
								name="product_image" // name of input field or fieldName simply
								onChange={(event) => {
									// console logging selected file from menu
									console.log( event.target.files[0] ) // gives first file
									// setState method with event.target.files[0] as argument
									this.setState(prev => ({...prev, image_thumbnail_filepath: event.target.files[0]}))
								}}
							/>
						</div>

						<button style={styles.roundButton}
							onClick={ () => {

								let setResponseInCurrentProduct = (arg) => this.props.set_current_product(arg)
								let redirectToNewProduct = () => this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))	

								const formData = new FormData()
								formData.append('title', this.state.title)
								formData.append('category', this.state.category)
								formData.append('price', this.state.price)
								formData.append('product_size', this.state.product_size)
								formData.append('product_color', this.state.product_color)
								if(this.state.image_thumbnail_filepath !== ''){
									formData.append('product_image', this.state.image_thumbnail_filepath, this.state.image_thumbnail_filepath.name)
								}

								axios.post(utils.baseUrl + '/products/create-product-with-user', formData)
								.then(function (response) {
									console.log(response.data) // current product screen data
									
									// set to current parent object
									setResponseInCurrentProduct(response.data.new_product)

									// change route to current_product
									redirectToNewProduct()

								})
								.catch(function (error) {
									console.log(error)
								});						

							}}
						>
							Create Product
						</button>
					</div>

				</div>
			);
		}			
	}
}
	
CreateProduct.defaultProps = {

};

// export default CreateProduct // REMOVE withResponsiveness and withStyles as much as possible
export default withRouter(withResponsiveness(CreateProduct))