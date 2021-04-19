import React, { Component } from 'react';

import PropTypes from 'prop-types';

import axios from 'axios';
import firebase from 'firebase';

import utils from "../utilities";

import {
	withRouter,
} from "react-router-dom";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../responsiveness_hook";


class IndividualCartItem extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
		const { serial_number } = this.props.navigation.params

		const styles = {

		}

		axios.get(utils.baseUrl + '/blogposts/blogpost-with-summarized-children', 
			{params: {serial_number: serial_number } }
		)
		.then((response) => {
			this.props.set_current_cart_item(response.data)
		})
		.catch((error) => {
			console.log(error);
		})

	}

// RENDER METHOD
	render() {

		// modifiable attributes are supplied by previous container
		const {
				} = this.props.match.params 

		// only using schemafields from axios request which are not modifiable attributes
		const {
				endpoint, 
				image_thumbnail_filepath, 
				title, 
				first_para, 
				initial_tags, 
				second_para, 
				third_para, 
				fourth_para, 
				all_tags, 
				timestamp_of_uploading, 
				} = this.props.current_cart_item



		const current_cart_item = this.props.current_cart_item



	  	return (
		  	<div>
		  	</div>
		);
	}
}
	
IndividualCartItem.defaultProps = {
	//:,
};


// export default IndividualCartItem // REMOVE withResponsiveness and withStyles as much as possible
export default withRouter(withResponsiveness(IndividualCartItem))