import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//IMPORT COMPONENTS
import {TextBoxWithBackgroundImage} from "../components";
// IMPORT material-ui stuff
import { 
	Grid, 
	// Button 
} from "@material-ui/core";
// IMPORT responsiveness hook
import withResponsiveness from "../responsiveness_hook";


class VerticalMasonriesContainer extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

	componentDidMount() {
		this.generate_masonry()
	}

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

	generate_masonry(){

		let component
		let children_assigned = 0
		let {_xs, _sm, _md, _lg, _xl} = this.props;


		let total_columns_list = Object.keys(this.props.column_wise_details_list)
		let child_list

		let child_heights_list = this.get_height_of_nth_child_in_masonry_through_pattern(this.props.children, this.props.child_addition_pattern_heights)

		let column_dict = {}

		// for (let j = 0; j < this.props.children.length / this.props.child_addition_pattern_heights.length; j++) {
		for (let j = 0; j < child_heights_list.length; j++) {

			let iteration_index = j

			for (let i = 0; i < this.props.column_wise_details_list.length; i++) {

				if ( !Array.isArray(column_dict[i]) ){
					column_dict[i] = []
				}

				if ( children_assigned < this.props.children.length ){

					if ( _xs || _sm || _md ){

						component = (
							<Grid item
								style={{
									// height: child_heights_list[children_assigned],
									height: this.get_height_of_nth_child_in_masonry_through_pattern(this.props.children, this.props.child_addition_pattern_heights)[children_assigned],
									marginBottom: this.props.column_wise_details_list[i].bottom_spacing,
									// marginLeft: this.props.column_wise_details_list[i].leftGap,
								}}
							>
								{ this.props.children[ children_assigned ] }
							</Grid>
						)

						column_dict[i].push(component)
						children_assigned += 1


					} else {

						component = (
							<Grid item
								style={{
									// height: child_heights_list[children_assigned],
									height: this.get_height_of_nth_child_in_masonry_through_pattern(this.props.children, this.props.child_addition_pattern_heights)[children_assigned],									marginBottom: this.props.column_wise_details_list[i].bottom_spacing,
									marginLeft: this.props.column_wise_details_list[i].leftGap,
								}}
							>	
								{ this.props.children[ children_assigned ] }
							</Grid>
						)

						column_dict[i].push(component)
						children_assigned += 1

					}

				}
			}



		}

		let all_columns = []
		this.props.column_wise_details_list.map((column_detail, index) => {

			all_columns.push(
			
				<Grid item container direction="column" 
					xs={12} sm={12} 
					md={column_detail.width_in_grids} 
					lg={column_detail.width_in_grids}
				>
					{ column_dict[index] }
				</Grid>
			)

		})

		return all_columns

	}


// RENDER METHOD
	render() {

		let {_xs, _sm, _md, _lg, _xl} = this.props;

		let count = 0

		return (

				<div 
					style={{
						width:this.props.containerWidth,
						margin:'auto',
						backgroundColor: this.props.containerBGcolor,
					}}
				>		
				<Grid container direction="row" style={{backgroundColor: 'none',}}>

					{this.generate_masonry()}			

				</Grid>


			</div>
		);
	}
}




VerticalMasonriesContainer.defaultProps = {
	column_wise_details_list:[ 
		{ width_in_grids:4, bottom_spacing:10, leftGap:0 },
		{ width_in_grids:4, bottom_spacing:10, leftGap:10 },
		{ width_in_grids:4, bottom_spacing:10, leftGap:10 },
		// { width_in_grids:3, bottom_spacing:10, leftGap:10 },
	],

	// NOTE FOR FILLING child_addition_pattern_heights
	// fill so that the last one falls on the right most block, if it falls before right most block, then try repeating the entire grid so that pattern executes onces, best is to make the last element of pattern to render the right most block
	// the logic is that you need to fill the pattern properly, and then let it repeat to continue filling properly
	child_addition_pattern_heights:[400, 200, 400, 200, 400, 200, ],
	containerBGcolor:'black',
	containerWidth:'100%',

};

export default withResponsiveness(VerticalMasonriesContainer);