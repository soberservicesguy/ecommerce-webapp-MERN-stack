import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import firebase from 'firebase';

import utils from "../utilities"

// IMPORT CONNECTED COMPONENTS
import {
} from '../redux_stuff/connected_components';

import {
	Grid, 
	// TextField,
	// Modal, 
	// Button 
} from "@material-ui/core";

import {
	ConnectedComponentForShowingCart,
} from '../redux_stuff/connected_components';

import {
	withRouter,
	Redirect,
} from "react-router-dom";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../responsiveness_hook";



class CartContainer extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			redirectToRoute: false,

		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
	}


	getCompleteObjectAndSwitchToItsContainer(endpoint) {
		axios.get(utils.baseUrl + '/products/find-product',
			{params: {endpoint: endpoint } }
		)
		.then((response) => {
			this.props.set_current_item_in_cart( response.data )

			this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))
			
			this.props.history.push('Individual-Cart-Item') // switching to route
		})
		.catch((error) => {
			console.log(error);
		})	
	}

// RENDER METHOD
	render() {
			
		const cart = this.props.complete_cart

		// parameters being passed from previous route
		const endpoint_params_passed = this.props.match.params

		const styles = {

		}


		if ( this.state.redirectToRoute !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))

			// redirecting
			return <Redirect to = {{ pathname: "/Individual-Cart-Item" }} />

		} else {

			return (
				<div>
					{/* cart header */}

					<div style={{
						display:'flex',
						flexDirection:'row',
						justifyContent:'space-between',
						alignItems:'center',
						width:'90%',
						margin:'auto',
						marginTop:10,
						marginBottom:10,
						borderTopWidth:3,
						borderTopColor:'#eee',
						borderTopStyle:'solid',
						paddingTop:20,
					}}>	
						<div style={{flexBasis:50,}}>
							<p style={{paddingLeft:10,}}>
								#
							</p>
						</div>			

						<div style={{flex:1, textAlign:'center'}}>
							<p>Image</p>
						</div>

						<div style={{flexBasis:200, textAlign:'center'}}>
							<p>
								Title
							</p>
						</div>

						<div style={{flex:2, textAlign:'center'}}>
							<p>Product Color</p>
						</div>

						<div style={{flex:2, textAlign:'center'}}>
							<p>Product Size</p>
						</div>

						<div style={{flex:1, fontSize:20, paddingTop:10, textAlign:'center'}}>
							<p>
								Unit Price
							</p>
						</div>


		{/*				<p>
							{ data.endpoint }
						</p>*/}

		{/*				<p>
							{ data.product_size }
						</p>

						<p>
							{ data.product_color }
						</p>*/}

		{/*				<p>
							{ data.initial_quantity }
						</p>*/}

		{/*				<p>
							{ data.timestamp_of_uploading }
						</p>*/}


		{/*				<button onClick = { () => this.toggle_product_size_modal() }>
							toggle_size_modal_callback
						</button>
					
						<button onClick = { () => this.toggle_initial_quantity_modal() }>
							toggle_initial_quantity_modal
						</button>
					
						<button onClick = { () => this.toggle_product_color_modal() }>
							toggle_product_color_modal
						</button>*/}

						<div style={{flex:1, textAlign:'center'}}>
							<p>Quantity</p>
						</div>


						<div style={{flex:1, fontSize:20, fontWeight:'bold', paddingTop:10, textAlign:'center'}}>
							<p>
								Total
							</p>
						</div>


						<div style={{
							flexBasis: 20,
							fontWeight:'bold',							
							fontSize:20,
						}}>
							<p>Remove</p>
						</div>

				</div>




					<Grid container direction="column">

						{ cart.map((item, index) => (
							<Grid item xs={12}>
								<ConnectedComponentForShowingCart
									dataPayloadFromParent = { item }
								// not needed, since its redux
									// product_size_modify_callback = { (product_size) => this.props.modify_product_size_of_some_item_in_cart(item.id, product_size) }
									// initial_quantity_modify_callback = { (initial_quantity) => this.props.modify_initial_quantity_of_some_item_in_cart(item.id, initial_quantity) }
									// product_color_modify_callback = { (product_color) => this.props.modify_product_color_of_some_item_in_cart(item.id, product_color) }						
									// remove_from_cart_callback = { () => this.props.remove_product_from_cart(item.id) }
									
									// toggle_size_modal_callback = { () => this.toggle_product_size_modal() }
									// toggle_quantity_modal_callback = { () => this.toggle_initial_quantity_modal() }
									// toggle_color_modal_callback = { () => this.toggle_product_color_modal() }
								/>
							</Grid>
						))}
					</Grid>

				</div>
			);
		}
	}
}

CartContainer.defaultProps = {
	// : ,
};

// export default CartContainer // REMOVE withResponsiveness and withStyles as much as possible
export default withRouter(withResponsiveness(CartContainer))
