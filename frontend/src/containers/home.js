import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import utils from "../utilities"
// IMPORT material-ui stuff
import { withStyles } from '@material-ui/styles';
import { 
	Grid, 
	// Button 
} from "@material-ui/core";
// IMPORT responsiveness hook
import withResponsiveness from "../responsiveness_hook";

import {
	ConnectedProductCard,
	ConnectedCreateProduct,
	ConnectedBlogPostCard,
} from '../redux_stuff/connected_components';

import {
	TwoSidedCustomMasonryContainer,
	VerticalMasonriesContainer,
} from "./"

import {
	TextBoxWithBackgroundImage,
	ComponentForShowingCategory,
} from "../components"

import { Carousel } from 'react-responsive-carousel'; // https://codesandbox.io/s/github/leandrowd/react-responsive-carousel/tree/master/codesandbox/default?file=/src/index.js
import "react-responsive-carousel/lib/styles/carousel.min.css";  // required and can't be ignored

import LocalShipping from '@material-ui/icons/LocalShipping';
import ContactSupport from '@material-ui/icons/ContactSupport';
import Payment from '@material-ui/icons/Payment';
import Schedule from '@material-ui/icons/Schedule';

import { 
	withRouter,
	Link,
} from "react-router-dom";


class HomeContainer extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
		axios.get(utils.baseUrl + '/products/products-list',)
		.then((response) => {
			this.props.set_fetched_products(response.data)
		})
		.catch((error) => {
			console.log(error);
		})


	}
	get_10_more_items() {
		axios.get(utils.baseUrl + `/products/products-list-next-10-with-children`)
		.then((response) => {
			this.props.set_fetched_10_more_product(response.data)
		})
		.catch((error) => {
			console.log(error);
		})		
	}

// copied from vertical masonries file
	get_height_of_nth_child_in_masonry_through_pattern(children_props, child_addition_pattern_heights){
		// generating list of child heights in child placement sequence
		let child_heights_list = []
		for (let j = 0; j < children_props.length; j++) {
			if (child_addition_pattern_heights[j]){
				child_heights_list.push( child_addition_pattern_heights[j] )
			}
		}		

		while (child_heights_list.length < children_props.length){
			child_heights_list = [...child_heights_list, ...child_heights_list]
		}

		if (children_props.length < child_heights_list.length){
			let number_of_additional = child_heights_list.length - children_props.length

			child_heights_list.splice(children_props.length, number_of_additional)
		}
		
		return child_heights_list

	}


// RENDER METHOD
	render() {
			
		const total_products = this.props.total_products

		const { classes } = this.props;
	  	const {_xs, _sm, _md, _lg, _xl} = this.props

	  	const styles = {

	  	}

	  	let grid_item_height = 400
	  	let grid_end_item_height = 800

		let total_children = [1,2,3,4,5,6,7,8].map((item, index) => {
		// {[...total_categories, 1, 2].map((item, index) => {
			return(
				<div>
					<ComponentForShowingCategory
						dataPayloadFromParent = { item }
						index={ index }
					/>
				</div>
			)

		})


	// copying same child_addition_pattern_heights from child_addition_pattern_heights prop to VerticalMasonriesContainer
		let child_addition_pattern_heights = [200, 400, 200, 400, 400, 200, 400, 200]


		return (
			<div>

			{/* top carousel */}
				<div style={{width:'90%', margin:'auto'}}>
					<Carousel
						showArrows={true}
						autoPlay={true}
						renderThumbs={ () => null }
						// onChange={onChange} 
						// onClickItem={onClickItem} 
						// onClickThumb={onClickThumb}
					>
						{this.props.total_carousels.map((item, index) => (
							<div
								key={item.id}
								style={{height:'90vh'}} 
							>
							  <img 
							  	// src={item.imageSource}
							  	src={utils.image}
							  	style={{width:'100%', height:'90vh', resizeMode:'stretch'}} 
							  />
							</div>
						))}
					</Carousel>
				</div>

			{/* categories */}
				<div style={{marginTop:100,}}>
					<TwoSidedCustomMasonryContainer
						containerWidth = {'90%'}
						containerColor = {'none'}
						swapSides = {false}
						grid_spacing = {1}
						leftSideMasonryGridCssList = {[
							{grids:12, height:grid_item_height,},
							{grids:6, height:grid_item_height,},
							{grids:6, height:grid_item_height,},
						]}
						rightSideMasonryGridCssList = {[
							{grids:12, height:grid_end_item_height + 4*2 ,} // heights of both rows + gap 
						]}
					>
						{[1,2,3,4].map((category_item, index) => {
						// {all_cotegories.map((category_item, index) => {
							if (index !== [1,2,3,4].length -1){
								return(
									<TextBoxWithBackgroundImage
										backgroundImage={utils.image} 
										text={'this is it this is it'}
										newLineText={'Collection'}
										verticalDisplacement={-(grid_item_height - 90 -20)} // height - self_height_of_component - horizontal_displacement
										horizontalDisplacement={20}
									/>
								)
							} else {
								return(

									<TextBoxWithBackgroundImage
										backgroundImage={utils.image} 
										text={'this is it this is it'}
										newLineText={'Collection'}
										verticalDisplacement={-(grid_end_item_height + 4*2 - 90 -20)} // height - self_height_of_component- horizontal_displacement
										horizontalDisplacement={20}
									/>
								)
							}
						})}
					</TwoSidedCustomMasonryContainer>					
				</div>


			{/* new collection block */}
				<div style={{width:'90%', margin:'auto', marginTop:100, backgroundColor: '#eee'}}>
					<Grid container direction="row" spacing={0} justify="space-between">
						<Grid item xs={12} sm={12} md={3} lg={3}>
							<div style={{flex:1, paddingTop:30, paddingBottom:30, paddingLeft:30,}}>
								<p style={{
									fontSize:40,
									textAlign:( _xs | _sm | _md ) ? 'center' : 'left' 
								}}>
									NEW 2021
								<br/>
								<span style={{fontWeight:'bold', fontSize:40}}>
									COLLECTION
								</span>
								</p>
							</div>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<div style={{width:'60%', margin:'auto', textAlign:'center', backgroundColor: '#ffffff', paddingTop:30, paddingBottom:30, marginTop:30,}}>
								<p style={{fontWeight:'bold',fontSize:40}}>
									NOW 
									<span style={{fontSize:40, marginLeft:8, fontWeight:'normal'}}>
										IN STORE
									</span>
								</p>
							</div>
						</Grid>
						<Grid item xs={12} sm={12} md={3} lg={3}>
							<div style={{textAlign:'center'}}>
								<img 
									src={utils.image}
									style={{
										objectFit:'fill', 
										width: '50%', 
										height:'80%', 
										borderRadius:200,
										marginTop:(_xs || _sm) ? 20 : 0,
									}} 
								/>
							</div>
						</Grid>
					</Grid>
				</div>


			{/* best sellers block */}
				<div style={{
					display:'flex',
					flexDirection:'row',
					justifyContent: 'space-between',
					alignItems:'center',
					height:200,
					width:'90%',
					margin:'auto',
					marginTop:100,
				}}>
					
					<div style={{
						flex:1,
						// height:200,
					}}>
						<p style={{
							fontSize:40,
							borderLeftWidth:2,
							borderLeftStyle:'solid',
							paddingTop:30,
							paddingBottom:30,
							paddingLeft:20,
						}}>
							BEST <span style={{marginLeft:10, fontWeight:'bold'}}>SELLERS</span>
						</p>
					</div>

					<div style={{
						flex:1,
						// height:200,
					}}>
						<p style={{textAlign: 'right'}}>
							More
						</p>
					</div>
				</div>


			{/* 4 products */}
				<div style={{
					width:'90%',
					margin:'auto',
					marginTop:100,
				}}>
					<Grid container orientation = "row">
						{[1,2,3,4].map((item, index) => {
						// {four_products.map((product_item, index) => {
							return(
								<Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
									<ConnectedProductCard
										dataPayloadFromParent = {item}
									/>
								</Grid>
							)
						})}					
					</Grid>					
				</div>


			{/* product categories masonry */}
				<div style={{marginTop:100}}>
					<VerticalMasonriesContainer
						column_wise_details_list = {[ 
							{ width_in_grids:3, bottom_spacing:10, leftGap:0 },
							{ width_in_grids:3, bottom_spacing:10, leftGap:10 },
							{ width_in_grids:3, bottom_spacing:10, leftGap:10 },
							{ width_in_grids:3, bottom_spacing:10, leftGap:10 },
						]}
						child_addition_pattern_heights = {[200, 400, 200, 400, 400, 200, 400, 200]}
						containerBGcolor = {'none'}
						containerWidth = {'90%'}
					>
			  			{[1,2,3,4,5,6,7,8].map((item, index) => {
			  			// {[...total_categories, 1, 2].map((item, index) => {
			  				return(
			  					<div>
		  					  		<Link 
		  					  			// to={`/products/:id=${item.endpoint}`}
		  					  			to={{pathname:`/products`, state:{endpoint: item.endpoint}}}  
		  					  			style={{color: 'inherit', textDecoration: 'inherit'}}
		  							>
					  					<ComponentForShowingCategory
					  						dataPayloadFromParent = { item }
					  						index={ index }
					  						local_height = {this.get_height_of_nth_child_in_masonry_through_pattern(total_children, child_addition_pattern_heights)[index]}						  			
					  					/>

				  					</Link>
			  					</div>
				  			)

			  			})}

					</VerticalMasonriesContainer>
				</div>




			{/* latest news block */}
				<div style={{
					display:'flex',
					flexDirection:'row',
					justifyContent: 'space-between',
					alignItems:'center',
					height:200,
					width:'90%',
					margin:'auto',
					marginTop:100,
				}}>
					
					<div style={{
						flex:1,
						// height:200,
					}}>
						<p style={{
							fontSize:40,
							borderLeftWidth:2,
							borderLeftStyle:'solid',
							paddingTop:30,
							paddingBottom:30,
							paddingLeft:20,
						}}>
							LATEST <span style={{marginLeft:10, fontWeight:'bold'}}>NEWS</span>
						</p>
					</div>

					<div style={{
						flex:1,
						// height:200,
					}}>
						<p style={{textAlign: 'right'}}>
							More
						</p>
					</div>
				</div>




			{/* 3 blogcards block */}
				<div style={{
					width:'90%',
					margin:'auto',
					marginTop:100,
				}}>
					<Grid container orientation = "row">
						{[1,2,3,].map((item, index) => {
						// {three_blogposts.map((product_item, index) => {
							return(
								<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
									<ConnectedBlogPostCard
										dataPayloadFromParent = {item}
									/>
								</Grid>
							)
						})}					
					</Grid>					
				</div>


			{/* four blocks like free shipping, 24/7 customer service */}
				<div style={{
					width:'90%',
					margin:'auto',
					marginTop:100,
					backgroundColor: '#3A3B3C',
					height:300,
					paddingTop:100,
					marginBottom:100,
				}}>
					<Grid container orientation = "row">
						<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
							<div style={{
								textAlign:'center',

							}}>
								<LocalShipping style={{color:'white', fontSize:50,}}/>
								<p style={{fontSize:20, color:'white'}}>
									Free Shipping
								</p>
							</div>
						</Grid>

						<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
							<div style={{
								textAlign:'center'
							}}>
								<ContactSupport style={{color:'white', fontSize:50,}}/>							
								<p style={{fontSize:20, color:'white'}}>
									24/7 Customer Service
								</p>
							</div>
						</Grid>

						<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
							<div style={{
								textAlign:'center'
							}}>
								<Payment style={{color:'white', fontSize:50,}}/>
								<p style={{fontSize:20, color:'white'}}>
									Payment Options
								</p>
							</div>
						</Grid>

						<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
							<div style={{
								textAlign:'center'
							}}>
								<Schedule style={{color:'white', fontSize:50,}}/>
								<p style={{fontSize:20, color:'white'}}>
									30 Days Returns
								</p>
							</div>
						</Grid>
					</Grid>					
				</div>


			</div>
		);
	}
}

HomeContainer.defaultProps = {
	// : ,
};

export default withResponsiveness(HomeContainer);