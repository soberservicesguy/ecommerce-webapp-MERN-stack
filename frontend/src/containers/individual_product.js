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

import { withRouter } from "react-router-dom";


class IndividualIndividualProduct extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
	}

// RENDER METHOD
	render() {
		const { classes } = this.props;
		const {_xs, _sm, _md, _lg, _xl} = this.props

		const styles = {

		}

		var base64Image = "data:image/jpeg;base64," + this.props.current_product.image_thumbnail_filepath

		return (
			<div style={styles.imageContainer}>
				<img src={base64Image} alt="" 
					style={{
						width:200, 
						height:400, 
						resizeMode: "contain"
					}}
				/>

				<p>
					{this.props.current_product.category}
				</p>
				
				<p>
					{this.props.current_product.title}
				</p>
				
				<p>
					{this.props.current_product.initial_quantity}
				</p>
				
				<p>
					{this.props.current_product.product_size}
				</p>
				
				<p>
					{this.props.current_product.product_color}
				</p>
				
				<p>
					{this.props.current_product.price}
				</p>
				
			</div>
		);

	}
}
	
IndividualIndividualProduct.defaultProps = {
	//:,
};

export default withRouter(withResponsiveness(IndividualIndividualProduct));