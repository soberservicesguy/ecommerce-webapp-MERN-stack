import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import axios from 'axios';
//IMPORT COMPONENTS
import {TextBoxWithBackgroundImage} from "../components";
// IMPORT material-ui stuff
import { withStyles } from '@material-ui/styles';
import { 
	Grid, 
	// Button 
} from "@material-ui/core";
// IMPORT responsiveness hook
import withResponsiveness from "../responsiveness_hook";

const styles = theme => ({
  root: {
    height: 48,
    color: props => (props.cool) ? 'red' : 'black',
    [theme.breakpoints.up('sm')]:{
    	paddingLeft:100
    },
    '&:hover':{
    	paddingLeft:10	
    }
  },
});

class VerticalMasonriesForImagesContainer extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
	    masonryDetails:{},
	  }	
	}

// COMPONENT DID MOUNT
  componentDidMount() {

// FETCHING DATA FOR COMPONENT
	// axios.get(utils.baseUrl + utils.someEndPoint, 
	// 		// {params: {ID: 12345}}
	//   )
	//   .then( (response) => {
	//     console.log(response.data);
	//     this.setState(
	//     	prev => (
	//     		{
	//     			...prev,
	//     			fetchedData:response.data
	//     		}
	//     	),
	//     );
	//   })
	//   .catch( (error) => {
	//     console.log(error);
	//   })
	//   .then( () => {
	//     // always executed
	//   });
	}

// RENDER METHOD
	render() {
		const { classes } = this.props;
		const {_xs, _sm, _md, _lg, _xl} = this.props;

		return (

				<div 
					style={{
						width:this.props.containerWidth,
						margin:'auto',
						backgroundColor: this.props.containerBGcolor,
					}}
				>		
				<Grid container direction="row" spacing={0} style={{backgroundColor: 'none',}}>
				
					{this.props.vertical_grid_details.map(

						(grid_detail_item, outer_index) => (

							<Grid item container direction="column" 
								// spacing={grid_detail_item.vertical_spacing}
								xs={12} sm={12} 
								md={grid_detail_item.row_grids} 
								lg={grid_detail_item.row_grids}
							>
								{grid_detail_item.heights.map(

									(masonry_detail_item, inner_index) => (


									( _xs | _sm | _md ) 
										?
											<Grid item
												style={{
													height:masonry_detail_item.height,
													marginBottom:grid_detail_item.vertical_spacing,
													// marginLeft:grid_detail_item.leftGap,
												}}
											>
												<img 
													src={require('../images/samosa.jpeg')}
													style={{objectFit:'fill', width: '100%', height:masonry_detail_item.height}} 
												/>
											</Grid>
										:
											<Grid item
												style={{
													height:masonry_detail_item.height,
													marginBottom:grid_detail_item.vertical_spacing,
													marginLeft:grid_detail_item.leftGap,
												}}
											>
												<img 
													src={require('../images/samosa.jpeg')}
													style={{objectFit:'fill', width: '100%', height:masonry_detail_item.height}} 
												/>
											</Grid>
									)
								)}
							</Grid>
						)
					)}
				</Grid>


			</div>
		);
	}
}

VerticalMasonriesForImagesContainer.defaultProps = {
	// elements:
	vertical_grid_details:[ 
		{row_grids:3, vertical_spacing:10, leftGap:0, heights:[
				{height:100, }, {height:300}
			]
		}, 
		{row_grids:3, vertical_spacing:10, leftGap:10, heights:[
				{height:100}, {height:300}
			]
		}, 
		{row_grids:3, vertical_spacing:0, leftGap:10, heights:[
				{height:300}, {height:300}
			]
		}, 
		{row_grids:3, vertical_spacing:0, leftGap:10, heights:[
				{height:300}, {height:300}
			]
		}, 
	],

	leftMargin:(1) * 8 / 2 ,
  containerBGcolor:'blue',
  containerWidth:'100%',

	// masonryDetails: [ 
	// 	[{height:300}, {height:900}], 
	// 	[{height:300}, {height:300}], 
	// 	[{height:300}, {height:300}], 
	// 	[{height:300}, {height:300}], 
	// ],
 

 //  containerHeight:1000,
	// heightOfColumns:500,
 //  masonryListsOfLists:[
 //  	[
 //  		{flexBasis:'20%', width:100, paddingBottom:10, paddingTop:0, marginLeft:0, marginRight:0,// backgroundColor: '#000000'
 //  		},	
 //  		{ flexBasis:'50%', width:100, paddingBottom:10,  paddingTop:0,  marginLeft:0, marginRight:0, // backgroundColor: '#000000'
 //  		},	
 //  		{ flexBasis:'30%', width:100, paddingBottom:10,  paddingTop:0,  marginLeft:0, marginRight:0, // backgroundColor: '#000000'
 //  		},	
 //  	],

 //  	[
 //  		{ flexBasis:'50%', width:100, paddingBottom:10,  paddingTop:0,  marginLeft:0, marginRight:0, // backgroundColor: '#000000'
 //  		},	
 //  		{ flexBasis:'50%', width:100, paddingBottom:10,  paddingTop:0,  marginLeft:0, marginRight:0, // backgroundColor: '#000000'
 //  		},	
 //  		{ flexBasis:'50%', width:100, paddingBottom:10,  paddingTop:0,  marginLeft:0, marginRight:0, // backgroundColor: '#000000'
 //  		},	
 //  	],

 //  	[
 //  		{ flexBasis:'50%', width:100, paddingBottom:10,  paddingTop:0,  marginLeft:0, marginRight:0, // backgroundColor: '#000000'
 //  		},	
 //  		{ flexBasis:'50%', width:100, paddingBottom:10,  paddingTop:0,  marginLeft:0, marginRight:0, // backgroundColor: '#000000'
 //  		},	
 //  		{ flexBasis:'50%', width:100, paddingBottom:10,  paddingTop:0,  marginLeft:0, marginRight:0, // backgroundColor: '#000000'
 //  		},	
 //  	],

 //  	[
 //  		{ flexBasis:'50%', width:100, paddingBottom:10,  paddingTop:0,  marginLeft:0, marginRight:0, // backgroundColor: '#000000'
 //  		},	
 //  		{ flexBasis:'50%', width:100, paddingBottom:10,  paddingTop:0,  marginLeft:0, marginRight:0, // backgroundColor: '#000000'
 //  		},	
 //  		{ flexBasis:'50%', width:100, paddingBottom:10,  paddingTop:0,  marginLeft:0, marginRight:0,  // backgroundColor: '#000000'
 //  		},	
 //  		{ flexBasis:'50%', width:100, paddingBottom:10,  paddingTop:0,  marginLeft:0, marginRight:0,  // backgroundColor: '#000000'
 //  		},	
 //  		{ flexBasis:'50%', width:100, paddingBottom:10,  paddingTop:0,  marginLeft:0, marginRight:0,  // backgroundColor: '#000000'
 //  		},	
 //  	],

 //  ],

};

export default withResponsiveness(withStyles(styles)(VerticalMasonriesForImagesContainer));

// DOCSTRING 

	// CHILDREN SHOULD BE PASSED otherwise it gives ERROR, and their relevant objects in masonryListsOfLists should be present otherwise they wont be rendered. 
	// set width of each element, rather than using container width, use container width only for background color or background image pasting, mostly never
	// DOES NOT WORK IN img tag but works on image in bg in div
	//EXAMPLE:

	// <VerticalMasonriesContainer>					
		
		// <p>this 7</p>
		// <p>this 8</p>
		// <p>this 9</p>

		// <p>this 4</p>
		// <p>this 5</p>
		// <p>this 6</p>

		// <p>this 1</p>
		// <p>this 2</p>
		// <p>this 3</p>

		// <p>this 400</p>
		// <p>this 10</p>
		// <p>this 20</p>
		// <p>this 30</p>
		// <p>this 40</p>

	// </VerticalMasonriesContainer>

// OLDER VERSION 1 WITH CHILDINDEXING METHOD

	// Steps:
	// REDONE ABOVE// 1 run map over masonryListsOfLists and get internalList
	// 2 generate range of internalList 
	// 3 if its first internalList, push it as it is in masonryDetails with its index as key
	// 4 if its any other internalList, run map method on this internalList and get previous key value pair, access its last item and then add 1 to each
	// NO LONGER NEEDED !!!
		// childIndexCalculator(firstIndex, secondIndex){

		// 	// const masonryDetails = {};
		// 	// const masonryListsOfLists = this.props.masonryListsOfLists;
		// 	const masonryDetails = this.props.masonryDetails;

		// 	// masonryListsOfLists.map(
		// 	masonryDetails.map(
		// 		(internalList, index) => {
				
		// 		if (index===0){

		// 			var indicesToUse = [...Array(internalList.length).keys()];
		// 			masonryDetails[index] = indicesToUse;

		// 		} else {

		// 			var previousAssignedIndicesList = masonryDetails[index - 1];
		// 			var lastItemOfPreviousList = previousAssignedIndicesList[previousAssignedIndicesList.length -1]

		// 			var indicesToUse = [];
				
		// 			internalList.map(
					
		// 				(listElement, internal_index) => {

		// 					indicesToUse.push( internal_index + lastItemOfPreviousList + 1)

		// 				}
		// 			)
						
		// 				masonryDetails[index] = indicesToUse;

		// 			}
		// 		}
		// 	)

		// 	const locatedList = masonryDetails[firstIndex];
		// 	const locatedListElement = locatedList[secondIndex];
		// 	return locatedListElement;		

		// }




		// <div 
		// 	style={{
		// 		display:'flex',
		// 		backgroundColor: this.props.containerBGcolor,
		// 		flexDirection:'row',
		// 		// flexWrap:'wrap',
		// 		alignContents:'center',
		// 		alignItems:'center',
		// 		justifyContent:'center',
				
		// 	}}
		// >
		// 	{this.props.masonryListsOfLists.map(
				
		// 		(masonryCssList, outer_index) => (
		// 			<div
		// 				key={String(outer_index)}
		// 				style={{
		// 					display:'flex',
		// 					flexDirection:'column',
		// 					alignContents:'center',
		// 					alignItems:'center',
		// 					justifyContent:'center',
		// 					height:this.props.heightOfColumns,
		// 				}}
		// 			>
				
		// 				{masonryCssList.map(
				
		// 						(item, inner_index) => (
		// 							<div
		// 								key={String(inner_index)} 
		// 								style={{
											
		// 									flexBasis:item.flexBasis,
		// 									width:item.width,
		// 									paddingBottom:item.paddingBottom,
		// 									paddingTop:item.paddingTop, 
		// 									// marginRight:item.marginRight,
		// 									// alignSelf:'center',
		// 									marginLeft:item.marginLeft,
		// 									marginRight:item.marginRight,
		// 									backgroundColor: item.backgroundColor
		// 								}} 
		// 							> 
		// 								{this.props.children[this.childIndexCalculator(outer_index, inner_index)]}

		// 							</div>
		// 						)
		// 					)}			
				
		// 			</div>				

		// 		)
		// 	)}
		
		// </div>

// OLD VERSION 2
				// <Grid container direction="row" spacing={0} style={{backgroundColor: 'none', marginLeft:this.props.leftMargin}} >
		
				// 	{this.props.vertical_grid_details.map(

				// 		(grid_detail_item, outer_index) => (

				// 			<Grid item container direction="column" 
				// 				spacing={grid_detail_item.vertical_spacing} 
				// 				xs={12} sm={12} 
				// 				md={grid_detail_item.row_grids} 
				// 				lg={grid_detail_item.row_grids}
				// 			>
				// 				{grid_detail_item.heights.map(
				// 					(masonry_detail_item, inner_index) => (
				// 						<Grid item
				// 							style={{
				// 								height:masonry_detail_item.height
				// 							}}
				// 						>
				// 							{this.props.children[this.childIndexCalculator(outer_index, inner_index)]}
				// 						</Grid>
				// 					)
				// 				)}
				// 			</Grid>
				// 		)
				// 	)}
				// </Grid>
