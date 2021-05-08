import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";



class ComponentForShowingProduct extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			// image_thumbnail_filepath:''
			image_src: null
		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

		let image_object_id = this.props.dataPayloadFromParent.image_thumbnail_filepath
		
		fetch(`${utils.baseUrl}/products/get-image-stream?image_object_id=${image_object_id}`, {
		  method: 'GET',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json'
		  },
		})
	    .then(response => this.validateResponse(response))
	    .then(response => response.blob())
	    .then(blob => {
	    	this.setState({ image_src: URL.createObjectURL(blob) })
	    })

	}

	validateResponse(response) {
	    if (!response.ok) {
	        throw Error(response.statusText);
	    }
	    return response;
	}

	render() {

		const styles = {

		}

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist
		// var base64Image = "data:image/jpeg;base64," + data.image_thumbnail_filepath
		var base64Image = "data:image/jpeg;base64," + this.state.image_thumbnail_filepath

		return (

			<div style={{
				marginLeft:10,
				marginRight:10,
			}}>
				<img 
					// src={base64Image}
					src={this.state.image_src}
					// src={utils.image} 
					alt="" 
					style={{
						width:'100%', 
						height:400, 
						resizeMode: "stretch"
					}}
				/>

				<p style={{
					fontSize:20,
					marginTop:20,
					color:'grey',
				}}>
					{ data.title }  <span style={{float:'right'}}>{ data.product_size }</span>
				</p>

				<p style={{
					fontSize:20,
					marginTop:20,
					fontWeight:'bold',
				}}>
					<span style={{textDecoration: 'line-through', fontWeight:'normal',}}>${ data.price + 20 }</span> ${ data.price }<span style={{float:'right', fontWeight:'normal', color:'grey'}}>{ data.product_color }</span>
				</p>

			</div>			
		);
	}
}
	
ComponentForShowingProduct.defaultProps = {

};

// export default ComponentForShowingProduct;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(ComponentForShowingProduct)
					// { data.endpoint }
				// <p>
				// 	{ data.initial_quantity }
				// </p>
				// <p>
				// 	{ data.timestamp_of_uploading }
				// </p>