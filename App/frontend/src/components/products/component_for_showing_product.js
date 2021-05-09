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
			image_src: null,
		}

	}

	getImage(){

		// this.setState({ image_src: null })
		let image_object_id = this.props.dataPayloadFromParent.image_thumbnail_filepath

		axios.get(`${utils.baseUrl}/products/get-image`, 
			{
				params: {
					image_object_id: image_object_id
				}
			}
		)
	    .then(async (response) => {
	    	if (response.data.success){
		    	this.setState({ image_src: "data:image/jpeg;base64," + response.data.image})
	    	}

		});


	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	componentDidUpdate(prevProps, prevState, snapshot) {


		if (prevProps.getIndividualImage === false && this.props.getIndividualImage === true){
			console.log('getting image')
			this.getImage()

		}

	}

	render() {

		const styles = {

		}

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist

		return (

			<div style={{
				marginLeft:10,
				marginRight:10,
			}}>
				<img 
					src={this.state.image_src}
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

export default withResponsiveness(ComponentForShowingProduct)