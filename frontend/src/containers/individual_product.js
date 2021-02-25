import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import utils from "../utilities"
// IMPORT material-ui stuff
import { withStyles } from '@material-ui/styles';
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
// IMPORT responsiveness hook
import withResponsiveness from "../responsiveness_hook";

import { withRouter } from "react-router-dom";

import {
	QuantityAdjuster,
} from "../components/"

import Share from '@material-ui/icons/Share';
import ThumbUp from '@material-ui/icons/ThumbUp';

class IndividualIndividualProduct extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			// price: this.props.dataPayloadFromParent.price,
			// price: 10,

			product_size: '',
			product_color: '',
			// title: this.props.dataPayloadFromParent.title,

		// variations
			// product_size_options:[],
			product_size_options: [1,2,3],
			product_color_options: [],
			// product_color_options: [4,5,6],
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {
		// console.log(this.props.dataPayloadFromParent.title)
		console.log('state')
		console.log(this.props.location.state.something)
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
					// title: this.props.dataPayloadFromParent.title,
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



// RENDER METHOD
	render() {
		const { classes } = this.props;
		const {_xs, _sm, _md, _lg, _xl} = this.props

		const styles = {

		}

		var base64Image = "data:image/jpeg;base64," + this.props.current_product.image_thumbnail_filepath

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
			<Grid container orientation="row">
				<Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
					<div style={{
						textAlign:'center'
					}}>
						<img
							// src={base64Image} 
							src={utils.image} 
							alt="" 
							style={{
								width:'70%', 
								height:'70vh', 
								resizeMode: "contain",
							}}
						/>						
					</div>
				</Grid>


				<Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
					<div style={{
						marginLeft:80,
						marginRight:100,
					}}>
						<p style={{
							fontSize:30,
							borderBottomWidth:1,
							borderBottomStyle:'solid',
							borderBottomColor:'#eee',
							paddingBottom:40,
						}}>
							Title{this.props.current_product.title}
						</p>

						<p style={{
							fontSize:30,
							borderBottomWidth:1,
							borderBottomStyle:'solid',
							borderBottomColor:'#eee',
							paddingBottom:40,
						}}>
							<span style={{textDecoration: 'line-through', fontSize:15,}}>${this.props.current_product.price + 20}</span> ${this.props.current_product.price}
						</p>

						<div style={{
							display:'flex',
							flexDirection:'row',
							alignItems:'center',
							justifyContent: 'space-around',
							marginTop:40,
							borderBottomWidth:1,
							borderBottomStyle:'solid',
							borderBottomColor:'#eee',
							paddingBottom:40,
						}}>
							<div style={{flex:4, }}>
								<FormControl variant="outlined" style={{width:'100%'}}>
									<InputLabel id="demo-simple-select-outlined-label" style={{fontSize:20}}>
										Color
									</InputLabel>
									<Select
										style={{width:'100%', fontSize:20}}
										labelId="demo-simple-select-outlined-label"
										id="demo-simple-select-outlined"
										label="Select Product Color"
										onChange={(event) => {
											// this.props.modify_product_color_of_some_item_in_cart(data.id, event.target.value) 
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

							<div style={{flex:1}}></div>

							<div style={{flex:4}}>
								<FormControl variant="outlined" style={{width:'100%',}}>
									<InputLabel id="demo-simple-select-outlined-label" style={{fontSize:20,}}>
										Size
									</InputLabel>
									<Select
										style={{width:'100%', fontSize:20,}}
										labelId="demo-simple-select-outlined-label"
										id="demo-simple-select-outlined"
										label="Select Product Size"
										onChange={(event) => {
											// this.props.modify_product_size_of_some_item_in_cart(data.id, event.target.value)
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

						</div>

						<div style={{
							display:'flex',
							flexDirection:'row',
							alignItems:'center',
							justifyContent: 'space-around',
							marginTop:40,
							borderBottomWidth:1,
							borderBottomStyle:'solid',
							borderBottomColor:'#eee',
							paddingBottom:40,
						}}>
							<div style={{flex:3, }}>
								<QuantityAdjuster
									width = {(_xs || _sm) ? 300 : 300}
									adjust_quantity_callback = {(new_quantity) => {
										// this.props.modify_initial_quantity_of_some_item_in_cart(data.id, new_quantity)
									}}
								/>
							</div>

							<div style={{
								flex:1
							}}>
								<button
									onClick = {() => this.props.add_product_to_cart(this.props.dataPayloadFromParent)}
									style={{
										ouline:'none',
										background:'none',
										backgroundColor:'grey',
										color:'white',
										paddingLeft:20,
										paddingRight:20,
										paddingTop:10,
										paddingBottom:10,
										width:'100%',
										marginLeft: (_xs || _sm) ? 40 : 50
									}}
								>
									ADD TO CART
								</button>
							</div>

							<div style={{
								flex:1,
								margin:'auto',
							}}>
								<ThumbUp style={{color:'grey', fontSize:25, marginLeft:(_xs || _sm) ? 70 : 100,}}/>
							</div>

							<div style={{
								flex:1,
								margin:'auto',
							}}>
								<Share style={{color:'grey', fontSize:25, marginLeft: (_xs || _sm) ? 20 : 0}}/>
							</div>


						</div>

						<div style={{
							marginTop:40,
							borderBottomWidth:1,
							borderBottomStyle:'solid',
							borderBottomColor:'#eee',
							paddingBottom:40,
						}}>
							<p>
								Category: {this.props.current_product.category}
							</p>
						</div>						




					</div>





				</Grid>
			</Grid>


		);

	}
}
	
IndividualIndividualProduct.defaultProps = {
	//:,
};

export default withRouter(withResponsiveness(IndividualIndividualProduct));





			// <div style={styles.imageContainer}>

				
			// 	<p>
			// 		{this.props.current_product.initial_quantity}
			// 	</p>
				
				
			// 	<p>
			// 		{this.props.current_product.product_color}
			// 	</p>
				
			// 	<p>
			// 		{this.props.current_product.product_size}
			// 	</p>
				
			// </div>