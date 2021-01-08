
import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";

import {
	TextField,
	Modal, 
	Grid, 
	// Button 
} from "@material-ui/core";

const styles = theme => ({
	outerContainer: {
	},
});

class ComponentForShowingCart extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {

		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

		// console.log('COMPONENT')
		// console.log(this.props.dataPayloadFromParent)
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

	render() {
		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist
		var base64Image = "data:image/jpeg;base64," + data.image_thumbnail_filepath

		return (

			<div>

				<div style={styles.outerContainer}>
					<p>HIII</p>
					<div style={styles.imageContainer}>
						<img src={base64Image} alt="" 
							style={{
								width:200, 
								height:400, 
								resizeMode: "contain"
							}}
						/>
					</div>

					<p>
						{data.id} ID
					</p>
					<p>
						{ data.endpoint }
					</p>

					<p>
						{ data.title }
					</p>
					<p>
						{ data.price }
					</p>
					<p>
						{ data.initial_quantity }
					</p>
					<p>
						{ data.product_size }
					</p>
					<p>
						{ data.product_color }
					</p>
					<p>
						{ data.timestamp_of_uploading }
					</p>

					<button onClick = { () => this.props.remove_from_cart_callback() }>
						Remove from cart
					</button>

					<button onClick = { () => this.toggle_product_size_modal() }>
						toggle_size_modal_callback
					</button>
				</div>






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
										onChange={ (event) => this.props.modify_initial_quantity_of_some_item_in_cart(data.id, event.target.value) }
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
	
ComponentForShowingCart.defaultProps = {

};


// export default ComponentForShowingCart;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(withStyles(styles)(ComponentForShowingCart))
