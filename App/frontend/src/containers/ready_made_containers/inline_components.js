import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//IMPORT COMPONENTS
// import {ComponentName} from "../components";
// IMPORT material-ui stuff
import { withStyles } from '@material-ui/styles';
import { 
	// Grid, 
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

class InlineComponentsContainer extends Component {
	constructor(props) {
		super(props);
		// - ONLY SET STATES WHEN NEEDED, ONLY IF THE DATA NEEDES TO BE USED AGAIN AND AGAIN - //
// STATE	
		this.state = {
	    isMobile: false,
	    fetchedData:[],
	  }	
	}

// COMPONENT DID MOUNT
	// - NEVER RUN A METHOD WHICH INVOLVES SETTING STATE IN IT FOLLOWED BY RUNNING ANOTHER ONE USING THE UPDATED STATE - //	
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
			// <Grid container direction="row" spacing={4} style={{backgroundColor: '#eee'}} >

			// 	<Grid item container direction="column" xs={12} sm={12} md={2} lg={3}>
			// 		<Grid item>
			// 		</Grid>

			// 		<Grid item>
			// 		</Grid>

			// 		<Grid item>
			// 		</Grid>
			// 	</Grid>

			// 	<Grid item container direction="column" xs={12} sm={12} md={8} lg={6}>
			// 		<Grid item>
			// 		</Grid>

			// 		<Grid item>
			// 		</Grid>
			// 	</Grid>

			// 	<Grid item container direction="column" xs={12} sm={12} md={2} lg={3}>
			// 		<Grid item>
			// 		</Grid>

			// 		<Grid item>
			// 		</Grid>

			// 		<Grid item>
			// 		</Grid>
			// 	</Grid>

			// </Grid>
				<div
					style={{
						width:this.props.containerWidth,
						// height:this.props.containerHeight,
						backgroundColor: this.props.containerColor,
						margin:'auto',
						display:'flex',
						flexDirection:'row',
						alignItems:this.props.alignItems,
						alignContent:this.props.alignContent,
						justifyContent: this.props.justifyContent,
					}}
				>
					{this.props.children}
				</div>
		);
	}
}

InlineComponentsContainer.defaultProps = {
  //:,
  containerWidth:'90%',
  containerHeight:200,
  containerColor:'grey',
  alignContent:'center',
  justifyContent:'center',
  alignItems:'center',
};

export default withResponsiveness(withStyles(styles)(InlineComponentsContainer));