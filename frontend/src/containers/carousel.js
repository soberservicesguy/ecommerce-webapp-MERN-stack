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
	ConnectedCarouselCard,
	ConnectedCreateCarousel,
} from '../redux_stuff/connected_components';



class CarouselContainer extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
		axios.get(utils.baseUrl + '/carousels/carousels-list-with-children',)
		.then((response) => {
			this.props.set_fetched_carousels(response.data)
		})
		.catch((error) => {
			console.log(error);
		})


	}
	get_10_more_items() {
		axios.get(utils.baseUrl + `/carousels/carousels-list-next-10-with-children`)
		.then((response) => {
			this.props.set_fetched_10_more_carousel(response.data)
		})
		.catch((error) => {
			console.log(error);
		})		
	}

// RENDER METHOD
	render() {
			
		const total_carousels = this.props.total_carousels

		const { classes } = this.props;

	  	const {_xs, _sm, _md, _lg, _xl} = this.props

	  	const styles = {

	  	}

		return (

			<Grid container direction="row" style={{backgroundColor: '#eee'}} >
				
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
		  			<ConnectedCreateCarousel/>
		  		</Grid>

				{total_carousels.map((item, index)=>(

					<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
						<ConnectedCarouselCard
							dataPayloadFromParent = { item }
						
						/>
					</Grid>

				))}

			</Grid>

		);
	}
}

CarouselContainer.defaultProps = {
	// : ,
};

export default withResponsiveness(CarouselContainer);