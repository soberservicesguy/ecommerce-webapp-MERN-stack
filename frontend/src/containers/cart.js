
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import firebase from 'firebase';

import utils from "../utilities"

// IMPORT CONNECTED COMPONENTS
import {
} from '../redux_stuff/connected_components';

import {
	TextField,
	Modal, 
	Grid, 
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

const { Provider, Consumer } = React.createContext();

const styles = theme => ({
	modal:{

	},
	root: {
		maxWidth: 380,
		color: props => (props.cool) ? 'red' : 'black',
		[theme.breakpoints.up('sm')]:{
			paddingLeft:100
		},
		'&:hover':{
			paddingLeft:10  
		},
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		// backgroundColor: red[500],
	},
});


class CartContainer extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			redirectToRoute: false,

			show_product_size_modal: false,
			show_initial_quantity_modal: false,
			show_product_color_modal: false,	
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
	}

	toggle_product_size_modal(){
		this.setState(
			prev => (
				{
					...prev,
					show_product_size_modal: (prev.show_product_size_modal === false) ? true : false 
				}
			)
		)
	}


	toggle_initial_quantity_modal(){
		this.setState(
			prev => (
				{
					...prev,
					show_initial_quantity_modal: (prev.show_initial_quantity_modal === false) ? true : false 
				}
			)
		)
	}


	toggle_product_color_modal(){
		this.setState(
			prev => (
				{
					...prev,
					show_product_color_modal: (prev.show_product_color_modal === false) ? true : false 
				}
			)
		)
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
			
		const cart = this.props.cart

		// parameters being passed from previous route
		const endpoint_params_passed = this.props.match.params


		if ( this.state.redirectToRoute !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))

			// redirecting
			return <Redirect to = {{ pathname: "/Individual-Cart-Item" }} />

		} else {

			return (
				<div>

					<Grid container direction="row" spacing={4} style={{backgroundColor: '#eee'}}>

						{ ( cart || [] ).map((item, index) => (

						<Provider value={{
							getCompleteObjectAndSwitchToItsContainer: () => this.getCompleteObjectAndSwitchToItsContainer(),
							set_current_cart_item: () => this.props.set_current_item_in_Cart( item )
						}}>

							<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
								<ConnectedComponentForShowingCart
									dataPayloadFromParent = { item }
										product_sizeModifyCallback = { (product_size) => this.props.modify_product_size_of_some_item_in_cart(item.id, product_size) }
										initial_quantityModifyCallback = { (initial_quantity) => this.props.modify_initial_quantity_of_some_item_in_cart(item.id, initial_quantity) }
										product_colorModifyCallback = { (product_color) => this.props.modify_product_color_of_some_item_in_cart(item.id, product_color) }						
									/>
								</Grid>
							</Provider>
						))}
					</Grid>


					<Modal				  	
						open={this.state.show_product_size_modal} // link some variable to it so that it could be turned off
						aria-labelledby="server-modal-title"
						aria-describedby="server-modal-description"
						className={styles.modal}
						// onClose={() => {Alert.alert("Modal has been closed.");}}
					>
						<div style={{
							// height:windowHeight, 
						}}>

							<button onClick={() => this.toggle_product_size_modal()} 
								style={{
									// height:windowHeight * 0.4
								}}>
							</button>
							
							<div style={{backgroundColor: 'blue'}}>
								<div style={styles.textinputContainer}>
									<p style={styles.modalText}>
										Set Quantity Here
									</p>
									<form className={styles.root} noValidate autoComplete="off">
										<TextField 
											label="Standard" // placeholder 
											id="standard-basic" // "filled-basic" / "outlined-basic"
											variant="outlined" // "filled"
											classes={styles.textinput}
											onChange={ (product_size) => this.props.product_sizeChangeCallback(product_size) }
										/>
									</form>
								</div>
							</div>

							<button onClick={() => this.toggle_product_size_modal()} 
								style={{
									// height:windowHeight * 0.4
								}}>
							</button>
						</div>
					</Modal>

					<Modal				  	
						open={this.state.show_initial_quantity_modal} // link some variable to it so that it could be turned off
						aria-labelledby="server-modal-title"
						aria-describedby="server-modal-description"
						className={styles.modal}
						// onClose={() => {Alert.alert("Modal has been closed.");}}
					>
						<div style={{
							// height:windowHeight, 
						}}>

							<button onClick={() => this.toggle_initial_quantity_modal()} 
								style={{
									// height:windowHeight * 0.4
								}}>
							</button>
							
							<div style={{backgroundColor: 'blue'}}>
								<div style={styles.textinputContainer}>
									<p style={styles.modalText}>
										Set Quantity Here
									</p>
									<form className={styles.root} noValidate autoComplete="off">
										<TextField 
											label="Standard" // placeholder 
											id="standard-basic" // "filled-basic" / "outlined-basic"
											variant="outlined" // "filled"
											classes={styles.textinput}
											onChange={ (initial_quantity) => this.props.initial_quantityChangeCallback(initial_quantity) }
										/>
									</form>
								</div>
							</div>

							<button onClick={() => this.toggle_initial_quantity_modal()} 
								style={{
									// height:windowHeight * 0.4
								}}>
							</button>
						</div>
					</Modal>

					<Modal				  	
						open={this.state.show_product_color_modal} // link some variable to it so that it could be turned off
						aria-labelledby="server-modal-title"
						aria-describedby="server-modal-description"
						className={styles.modal}
						// onClose={() => {Alert.alert("Modal has been closed.");}}
					>
						<div style={{
							// height:windowHeight, 
						}}>

							<button onClick={() => this.toggle_product_color_modal()} 
								style={{
									// height:windowHeight * 0.4
								}}>
							</button>
							
							<div style={{backgroundColor: 'blue'}}>
								<div style={styles.textinputContainer}>
									<p style={styles.modalText}>
										Set Quantity Here
									</p>
									<form className={styles.root} noValidate autoComplete="off">
										<TextField 
											label="Standard" // placeholder 
											id="standard-basic" // "filled-basic" / "outlined-basic"
											variant="outlined" // "filled"
											classes={styles.textinput}
											onChange={ (product_color) => this.props.product_colorChangeCallback(product_color) }
										/>
									</form>
								</div>
							</div>

							<button onClick={() => this.toggle_product_color_modal()} 
								style={{
									// height:windowHeight * 0.4
								}}>
							</button>
						</div>
					</Modal>

				</div>
			);
		}
	}
}

CartContainer.defaultProps = {
	// : ,
};

// export default CartContainer // REMOVE withResponsiveness and withStyles as much as possible
export default withRouter(withResponsiveness(withStyles(styles)(CartContainer)))

export { Consumer };
