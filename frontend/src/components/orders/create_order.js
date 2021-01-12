
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


class CreateOrder extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			redirectToRoute: false,

			order_phone_number_field: '',
			order_delivery_address_field: '',
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
			return <Redirect to = {{ pathname: "/Individual-Order" }} />

		} else {

			return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
				<div style={styles.outerContainer}>


				  	<div style={styles.textinputContainer}>
						<form className={styles.root} noValidate autoComplete="off">
							<TextField 
								label="Type your Contact Number" // placeholder 
								id="standard-basic" // "filled-basic" / "outlined-basic"
								variant="outlined" // "filled"
								classes={styles.textinput}
								onChange={ (event) => this.setState( prev => ({...prev, order_phone_number_field: event.target.value})) }
							/>
						</form>
				  	</div>


				  	<div style={styles.textinputContainer}>
						<form className={styles.root} noValidate autoComplete="off">
							<TextField 
								label="Type your Delivery Address" // placeholder 
								id="standard-basic" // "filled-basic" / "outlined-basic"
								variant="outlined" // "filled"
								classes={styles.textinput}
								onChange={ (event) => this.setState( prev => ({...prev, order_delivery_address_field: event.target.value})) }
							/>
						</form>
				  	</div>


					<button style={styles.buttonWithoutBG}
						onClick={ () => {

							let setResponseInCurrentOrder = (arg) => this.props.set_current_order(arg)
							let redirectToNewOrder = () => this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))	

							console.log({
									products: this.props.complete_cart,
									phone_number: this.state.order_phone_number_field,
									delivery_address: this.state.order_delivery_address_field,
								})
							// removing unncessary keys like id, image_thumbnail_filepath from payload
							var final_products_paylaod = this.props.complete_cart.map((product) => {

								delete product.id
								delete product.image_thumbnail_filepath

								return product
							})

							// const formData = new FormData()
							// formData.append('products', this.props.complete_cart)
							// formData.append('phone_number', this.state.order_phone_number_field)
							// formData.append('delivery_address', this.state.order_delivery_address_field)
// id
// image_thumbnail_filepath
// initial_quantity
// title

							console.log({
								products: final_products_paylaod,
								phone_number: this.state.order_phone_number_field,
								delivery_address: this.state.order_delivery_address_field,
							})

							axios.post(utils.baseUrl + '/paypal/create-order-with-paypal', 
								// formData,
								{
									products: final_products_paylaod,
									phone_number: this.state.order_phone_number_field,
									delivery_address: this.state.order_delivery_address_field,
								}
							)
							.then(function (res) {
							
								if (res.status === 200) {

									console.log('GOING TO PAYPAL URL FOR PAYMENT VERIFICATION')
									console.log(res.data)
									window.location = res.data.forwardLink

								} else {

									console.log('SOMETHING IS WRONG')

								}

								// set to current parent object
								// setResponseInCurrentOrder(res.data)

								// change route to current_order
								// redirectToNewOrder()

							})
							.catch(function (error) {
								console.log(error)
							});						

						}}
					>
						<p style={styles.innerText}>
							Press To Create Order
						</p>
					</button>
				</div>
			);
		}			
	}
}
	
CreateOrder.defaultProps = {

};

// export default CreateOrder // REMOVE withResponsiveness and withStyles as much as possible
export default withRouter(withResponsiveness(withStyles(styles)(CreateOrder)))
