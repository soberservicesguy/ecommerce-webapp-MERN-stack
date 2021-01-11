
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
	InputLabel,
	MenuItem,
	FormControl,
	Select,
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
			show_product_size_modal: false,
			show_initial_quantity_modal: false,
			show_product_color_modal: false,

			product_size: '',
			product_color: '',
			title: this.props.dataPayloadFromParent.title,

		// variations
			product_size_options: [],
			product_color_options: [],
		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {
		console.log(this.props.dataPayloadFromParent.title)
		this.get_variations()
		// console.log('COMPONENT')
		// console.log(this.props.dataPayloadFromParent)
	}

	get_variations(){

		axios.get(utils.baseUrl + '/products/get-all-variations', 
			{
				params:{
					product_size: this.state.product_size,
					product_color: this.state.product_color,
					title: this.props.dataPayloadFromParent.title,
				}
			}
		)
		.then((response) => {
			this.setState(
				prev => (
					{
						...prev,
						product_size_options: response.data.product_size,
						product_color_options: response.data.product_color,
					}
				)
			)
		})
		.catch(function (error) {
			console.log(error);
		});	

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

		const product_color_menu = this.state.product_color_options.map((option, index) => {

			return (
				<MenuItem key={String(index)} value={`${option}`}>
					{`${option}`}
				</MenuItem>
			)

		})

		const product_size_menu = this.state.product_size_options.map((option, index) => {

			return (
				<MenuItem key={String(index)} value={`${option}`}>
					{`${option}`}
				</MenuItem>
			)

		})


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
					<button onClick = { () => this.toggle_initial_quantity_modal() }>
						toggle_initial_quantity_modal
					</button>
					<button onClick = { () => this.toggle_product_color_modal() }>
						toggle_product_color_modal
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
						
	
						<div style={{marginTop: 10,}}>
							<FormControl variant="outlined" style={styles.formControl}>
								<InputLabel id="demo-simple-select-outlined-label" style={{fontSize:20}}>
									Select Product Size
								</InputLabel>
								<Select
									style={{width:280, fontSize:20}}
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									label="Select Product Size"
									onChange={(event) => {
										this.props.modify_product_size_of_some_item_in_cart(data.id, event.target.value)
										this.get_variations()
									}}
									// value={this.state.privileges_selected}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>

									{product_size_menu}

								</Select>
							</FormControl>
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
										onChange={ (event) => this.props.modify_initial_quantity_of_some_item_in_cart(data.id, event.target.value) }
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

						<div style={{marginTop: 10,}}>
							<FormControl variant="outlined" style={styles.formControl}>
								<InputLabel id="demo-simple-select-outlined-label" style={{fontSize:20}}>
									Select Product Color
								</InputLabel>
								<Select
									style={{width:280, fontSize:20}}
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									label="Select Product Color"
									onChange={(event) => this.props.modify_product_color_of_some_item_in_cart(data.id, event.target.value) }
									// value={this.state.privileges_selected}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>

									{product_color_menu}

								</Select>
							</FormControl>
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
