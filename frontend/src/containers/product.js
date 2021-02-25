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
} from '../redux_stuff/connected_components';



class ProductContainer extends Component {
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

// RENDER METHOD
	render() {
			
		const total_products = this.props.total_products

		const { classes } = this.props;
	  	const {_xs, _sm, _md, _lg, _xl} = this.props

	  	const styles = {

	  	}

		return (

			<Grid container direction="row" style={{backgroundColor: '#eee'}} >

				{(this.props.isAllowedProductsControl) ? (

					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
			  			<ConnectedCreateProduct/>
			  		</Grid>

					):(

					null

				)}

				
				{total_products.map((item, index)=>(

					<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>

						<div style={{marginTop:(index > 2) ? 50 : 0,}}>
							<ConnectedProductCard
								dataPayloadFromParent = { item }

								// showCompleteProductCallback = {  }
								addToCartCallback = { () => this.props.add_product_to_cart(item.id) }
								removeFromCartCallback = { () => this.props.remove_product_from_cart(item.id) }
							
							/>
						</div>
				
					</Grid>

				))}

			</Grid>

		);
	}
}

ProductContainer.defaultProps = {
	// : ,
};

export default withResponsiveness(ProductContainer);