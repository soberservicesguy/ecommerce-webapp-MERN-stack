import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';

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

import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51I98eiADpqLOsbfMg7Sqh5TvQFPRvifh1U1za4bv3wDhEwbQdShvbzQ37NNLfd8sAENcd845FPSUjYZatN9dHHf700QcVrGvdq');



class CreateOrder extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			redirectToRoute: false,
			redirectToStripeScreen: false,

			order_phone_number_field: '',
			order_delivery_address_field: '',

			order_email:'',
		}

	}


// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		const styles = {
			outerContainer:{
				backgroundColor: 'white',
				// height:500,
				marginBottom:10,
				paddingTop:30,
				paddingBottom:30,

				// margin:'auto',
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



			buttonWithoutBG:{
				width:'100%',
				height:'100%',
				border:'none',
				background: 'none',
				outline:'none',
				color:'black',
				fontWeight:'bold',

			},


		}

		// parameters being passed from previous route
		const endpoint_params_passed = this.props.match.params

		if ( this.state.redirectToRoute !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))

			// redirecting
			return <Redirect to = {{ pathname: "/Individual-Order" }} />

		} else if ( this.state.redirectToStripeScreen !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, redirectToStripeScreen: (prev.redirectToStripeScreen === false) ? true : false }))

			// redirecting
			return <Redirect to = {{ pathname: "/Stripe-Checkout" }} />


		} else {

			return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
				<div style={styles.outerContainer}>


					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your Contact Number" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) => this.setState( prev => ({...prev, order_phone_number_field: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>


					<div style={styles.roundTextInputContainer}>
						<form>
							<input 
								placeholder="Type your Delivery Address" 
								type="text" 
								// name="post_text"
								// multiline={true}
								onChange={ (event) => this.setState( prev => ({...prev, order_delivery_address_field: event.target.value})) }
								style={styles.roundTextInput} 
							/>
						</form>
					</div>



					<div style={{
						width:'90%',
						margin:'auto',
						display:'flex',
						flexDirection:'row',
						justifyContent: 'center',
						alignItems:'center',
						height:60,
						marginBottom:20,
					}}>

					{/*Paypal payment*/}
						<button style={styles.buttonWithoutBG}
							onClick={ () => {

								let setResponseInCurrentOrder = (arg) => this.props.set_current_order(arg)
								let redirectToNewOrder = () => this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))	

								// removing unncessary keys like id, image_thumbnail_filepath from payload
								var final_products_paylaod = this.props.complete_cart.map((product) => {

									delete product.id
									delete product.image_thumbnail_filepath

									return product
								})

								axios.post(utils.baseUrl + '/paypal/create-order-with-paypal', 
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

								})
								.catch(function (error) {
									console.log(error)
								});						

							}}
						>
							<p style={styles.innerText}>
								Order With PAYPAL
							</p>
						</button>

					{/*Stripe payment*/}
						<button style={styles.buttonWithoutBG}
							onClick={ () => {
								// going to stripe screen
								{/*this.setState(prev => ({...prev, redirectToStripeScreen: true }))*/}

								let setResponseInCurrentOrder = (arg) => this.props.set_current_order(arg)
								let redirectToNewOrder = () => this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))	

								// removing unncessary keys like id, image_thumbnail_filepath from payload
								var final_products_paylaod = this.props.complete_cart.map((product) => {

									delete product.id
									delete product.image_thumbnail_filepath

									return product
								})

								axios.post(utils.baseUrl + '/stripe-payments/create-order-with-stripe', 
									{
										products: final_products_paylaod,
										phone_number: this.state.order_phone_number_field,
										delivery_address: this.state.order_delivery_address_field,
										// order_email: this.state.order_email,
									}
								)
								.then(async function (res) {
								
									const stripe = await stripePromise;
									const session = await res.json();
									const result = await stripe.redirectToCheckout({
										sessionId: session.id,
								    });

								// OLD STRIPE WORKFLOW
									// const clientSecret = res.data['client_secret'];
									// const result = await stripe.confirmCardPayment(clientSecret, {
									// 	payment_method: {
									// 		card: elements.getElement(CardElement),
									// 		billing_details: {
									// 			email: email,
									// 		},
									// 	},
									// });
								// PAYPAL WORKFLOW
									// if (res.status === 200) {

									// 	console.log('GOING TO PAYPAL URL FOR PAYMENT VERIFICATION')
									// 	console.log(res.data)
									// 	window.location = res.data.forwardLink

									// } else {
									// 	console.log('SOMETHING IS WRONG')
									// }
								})
								.catch(function (error) {
									console.log(error)
								});						

							}}
						>
							<p style={styles.innerText}>
								Order With STRIPE
							</p>
						</button>

					</div>


				</div>
			);
		}			
	}
}
	
CreateOrder.defaultProps = {

};

// export default CreateOrder // REMOVE withResponsiveness and withStyles as much as possible
export default withRouter(withResponsiveness(CreateOrder))