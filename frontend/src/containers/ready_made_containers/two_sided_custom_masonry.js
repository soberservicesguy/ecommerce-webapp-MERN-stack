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

class TwoSidedCustomMasonryContainer extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
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
					backgroundColor: this.props.containerColor,
				}}
			>	

				<Grid container direction="row" 
					spacing={0} 
					alignItems="center" 
					justifyContent="center"
					style={{backgroundColor: 'none'}} >

				{
					(!this.props.swapSides)
					? 
					<>
						<Grid item container spacing={( _xs | _sm | _md ) ? null : this.props.grid_spacing} direction="row" xs={12} sm={12} md={8} lg={8}
							style={{
								marginLeft:( _xs | _sm | _md ) ? null : this.props.grid_spacing * 8 / 2 / 2, // trial and error
							}}
						
						>
							{this.props.leftSideMasonryGridCssList.map(
								(item, index) => (
									<Grid item xs={12} sm={12} md={item.grids} lg={item.grids}>
										<div 
											style={{
												height:item.height,
												backgroundColor: item.backgroundColor
											}} 
										>
											{this.props.children[index]}										
										</div>
									</Grid>
								))
							}
						</Grid>

						<Grid item container spacing={( _xs | _sm | _md ) ? null : this.props.grid_spacing} direction="row" xs={12} sm={12} md={4} lg={4}
							style={{
								marginLeft:( _xs | _sm | _md ) ? null : this.props.grid_spacing * 8 / 2 / 2, // trial and error
							}}
						>
							{this.props.rightSideMasonryGridCssList.map(
								(item, index) => (
									<Grid item xs={12} sm={12} md={item.grids} lg={item.grids}>
										<div 
											style={{
												height:item.height,
												backgroundColor: item.backgroundColor
											}} 
										>
											{this.props.children[ index + (this.props.leftSideMasonryGridCssList).length ]}										
										</div>
									</Grid>
								) 
							)}
						</Grid>
					</>
				:
					<>
					<Grid item container spacing={( _xs | _sm | _md ) ? null : this.props.grid_spacing} direction="row" xs={12} sm={12} md={4} lg={4}
						style={{
							marginLeft:( _xs | _sm | _md ) ? null : this.props.grid_spacing * 8 / 2 / 2, // trial and error
						}}
					>
						{this.props.rightSideMasonryGridCssList.map(
							(item, index) => (
								<Grid item xs={12} sm={12} md={item.grids} lg={item.grids}>
									<div 
										style={{
											height:item.height,
											backgroundColor: item.backgroundColor
										}} 
									>
										{this.props.children[ index + (this.props.leftSideMasonryGridCssList).length ]}										
									</div>
								</Grid>
							) 
						)}
					</Grid>
					
					<Grid item container spacing={( _xs | _sm | _md ) ? null : this.props.grid_spacing} direction="row" xs={12} sm={12} md={8} lg={8}
						style={{
							marginLeft:( _xs | _sm | _md ) ? null : this.props.grid_spacing * 8 / 2 / 2, // trial and error
						}}
					>
						{this.props.leftSideMasonryGridCssList.map(
							(item, index) => (
								<Grid item xs={12} sm={12} md={item.grids} lg={item.grids}>
									<div 
										style={{
											height:item.height,
											backgroundColor: item.backgroundColor
										}} 
									>
										{this.props.children[index]}										
									</div>
								</Grid>
							))
						}
					</Grid>
				</>
			}
			</Grid>

			</div>
		);
	}
}

TwoSidedCustomMasonryContainer.defaultProps = {
  containerWidth:'90%',
  containerColor:'yellow',
  swapSides:false,
  grid_spacing:1,
  leftSideMasonryGridCssList:[
	  {
	  	grids:12,
	  	height:400, 
	  },
	  {
	  	grids:6,
	  	height:400, 
	  },
	  {
	  	grids:6,
	  	height:400, 
	  },
  ],
  rightSideMasonryGridCssList:[
	  {
	  	grids:12,
	  	height:400*2 + 4*2 , // heights of both rows + gap 
	  },

  ]
};

export default withResponsiveness(withStyles(styles)(TwoSidedCustomMasonryContainer));

// DOCSTRING 

// children should be passed, and their relevant objects in both lefttSideMasonryGridCssList and rightSideMasonryGridCssList should be present otherwise they wont be rendered.
// TextBoxWithBackgroundImage is child passed to it, you can pass any

// <TwoSidedCustomMasonryContainer>
// 	<TextBoxWithBackgroundImage backgroundImage={require('../../images/samosa.jpeg')} /> 
// 	<TextBoxWithBackgroundImage backgroundImage={require('../../images/samosa.jpeg')} />
// 	<TextBoxWithBackgroundImage backgroundImage={require('../../images/samosa.jpeg')} />
// 	<TextBoxWithBackgroundImage backgroundImage={require('../../images/samosa.jpeg')} />	
// </TwoSidedCustomMasonryContainer>