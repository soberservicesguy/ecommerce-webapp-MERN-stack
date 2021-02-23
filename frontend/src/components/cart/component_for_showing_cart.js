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


import {
	QuantityAdjuster,
} from "../"


class ComponentForShowingCart extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			price: this.props.dataPayloadFromParent.price,
			// price: 10,

			product_size: '',
			product_color: '',
			title: this.props.dataPayloadFromParent.title,

		// variations
			product_size_options:[],
			// product_size_options: [1,2,3],
			product_color_options: [],
			// product_color_options: [4,5,6],
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

	get_price_according_to_variations(){

		axios.get(utils.baseUrl + '/products/get-price', 
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
						price: response.data.price,
					}
				)
			)
		})
		.catch(function (error) {
			console.log(error);
		});	

	}


	render() {

		const { _xs, _sm, _md, _lg, _xl } = this.props

		const styles = {

		}

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
						{data.id + 1} 
					</p>
				</div>			

				<div style={{flex:1, textAlign:'center'}}>
					<img 
						// src={base64Image} 
						src={utils.image}
						alt="" 
						style={{
							// width:'100%', 
							height:100, 
							resizeMode: "stretch"
						}}
					/>
				</div>

				<div style={{flexBasis:200, textAlign:'center'}}>
					<p>
						TItle{ data.title }
					</p>
				</div>

				<div style={{flex:2, }}>
					<FormControl variant="outlined" style={{width:(_xs || _sm) ? '100%' : '80%'}}>
						<InputLabel id="demo-simple-select-outlined-label" style={{fontSize:20}}>
							Color
						</InputLabel>
						<Select
							style={{width:'100%', fontSize:20}}
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							label="Select Product Color"
							onChange={(event) => {
								this.props.modify_product_color_of_some_item_in_cart(data.id, event.target.value) 
								this.get_variations()
								this.get_price_according_to_variations()
							}}
							// value={this.state.privileges_selected}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>

							{product_color_menu}

						</Select>
					</FormControl>
				</div>

				<div style={{flex:2,}}>
					<FormControl variant="outlined" style={{width:(_xs || _sm) ? '100%' : '80%'}}>
						<InputLabel id="demo-simple-select-outlined-label" style={{fontSize:20,}}>
							Size
						</InputLabel>
						<Select
							style={{width:'100%', fontSize:20,}}
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							label="Select Product Size"
							onChange={(event) => {
								this.props.modify_product_size_of_some_item_in_cart(data.id, event.target.value)
								this.get_variations()
								this.get_price_according_to_variations()
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

				<div style={{flex:1, fontSize:20, paddingTop:10, textAlign:'center'}}>
					<p>
						${ this.state.price }
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

				<div style={{flex:1, }}>
					<QuantityAdjuster
						adjust_quantity_callback = {(new_quantity) => this.props.modify_initial_quantity_of_some_item_in_cart(data.id, new_quantity)}
					/>
				</div>


				<div style={{flex:1, fontSize:20, fontWeight:'bold', paddingTop:10, textAlign:'center', paddingRight:40,}}>
					<p>
						${ this.state.price * data.initial_quantity }
					</p>
				</div>


				<div style={{
					flexBasis: 20,
				}}>
					<button 
						onClick = { () => this.props.remove_product_from_cart(data.id) }
						style={{
							outline:"none",
							background:'none',
							borderWidth:0,
							fontWeight:'bold',
							fontSize:20,
						}}
					>
						X
					</button>					
				</div>

		</div>

		);
	}
}
	
ComponentForShowingCart.defaultProps = {

};


// export default ComponentForShowingCart;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(ComponentForShowingCart)