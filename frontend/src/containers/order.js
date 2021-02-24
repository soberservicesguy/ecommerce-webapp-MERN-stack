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
	ConnectedOrderCard,
	ConnectedCreateOrder,
} from '../redux_stuff/connected_components';



class OrderContainer extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
			axios.get(utils.baseUrl + '/orders/orders-list-with-children',)
			.then((response) => {
				this.props.set_fetched_orders(response.data)
			})
			.catch((error) => {
				console.log(error);
			})


	}
	get_10_more_items() {
		axios.get(utils.baseUrl + `/orders/orders-list-next-10-with-children`)
		.then((response) => {
			this.props.set_fetched_10_more_order(response.data)
		})
		.catch((error) => {
			console.log(error);
		})		
	}

// RENDER METHOD
	render() {
			
		const total_orders = this.props.total_orders

		const { classes } = this.props;
	  	const {_xs, _sm, _md, _lg, _xl} = this.props

	  	const styles = {
	  		outerContainer:{
	  			marginTop:50,
	  		}
	  	}

		return (

				
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<div style={styles.outerContainer}>
			  			<ConnectedCreateOrder/>
					</div>

{/*				{total_orders.map((item, index)=>(

					<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
						<ConnectedOrderCard
							dataPayloadFromParent = { item }

							user_quantity = { item.user_quantity }
							user = { item.user || [] }
						
						/>
					</Grid>

				))}*/}

			</Grid>

		);
	}
}

OrderContainer.defaultProps = {
	// : ,
};

export default withResponsiveness(OrderContainer);