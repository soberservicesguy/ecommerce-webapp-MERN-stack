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



class IndividualIndividualBlogPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			image_src: null,
		}	
	}

	getImage(){

		// this.setState({ image_src: null })
		let image_object_id = this.props.current_blogpost.image_thumbnail_filepath

		axios.get(`${utils.baseUrl}/blogpostings/get-image`, 
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
		this.getImage()
	}

// RENDER METHOD
	render() {
		const {_xs, _sm, _md, _lg, _xl} = this.props

		// var base64Image = "data:image/jpeg;base64," + this.props.current_blogpost.image_thumbnail_filepath

		const styles = {
			outerContainer:{
				margin:'auto',
				width:'80%'
			},


			imageContainer:{
				marginTop:30,
			},
			image:{
				width:'100%', 
				height:400, 
				resizeMode: "contain"
			},

			titleText:{
				fontWeight:'bold',
				fontSize:30,
				marginTop:40,
				marginBottom:0,
			},
			initialTagsText:{
				fontSize:15,
				marginTop:0,
				color:'grey',
			},

			firstParaText:{
				fontSize:20,
				marginTop:30,
				color:'grey',
			},
			secondParaText:{
				fontSize:20,
				marginTop:30,
				color:'grey',
			},
			qoutedParaText:{
				fontSize:20,
				marginTop:50,
				color:'grey',
				borderLeftWidth:2,
				borderLeftStyle:'solid',
				borderLeftColor:'#eee',
				paddingTop:30,
				paddingBottom:30,
				paddingLeft:40,
			},
			thirdParaText:{
				fontSize:20,
				marginTop:30,
				color:'grey',				
			},
			fourthParaText:{
				fontSize:20,
				marginTop:30,
				color:'grey',				
			},
			allTagsText:{
				borderTopColor:'#eee',
				borderTopWidth:2,
				borderTopStyle:'solid',
				paddingTop:30,
				fontSize:15,
				marginTop:30,
				color:'grey',								
			}

		}

		return (
			<div style={styles.outerContainer}>
				<div style={styles.imageContainer}>
					<img 
						src={this.state.image_src}
						// src={base64Image}
						// src={utils.image} 
						alt="" 
						style={styles.image}
					/>
				</div>


				<p style={styles.titleText}>
					{this.props.current_blogpost.title}
				</p>

				<p style={styles.initialTagsText}>
					{this.props.current_blogpost.initial_tags}
				</p>
				

				<p style={styles.firstParaText}>
					{this.props.current_blogpost.first_para}
				</p>
				
				
				<p style={styles.secondParaText}>
					{this.props.current_blogpost.second_para}
				</p>
				
{/*				<p style={styles.qoutedParaText}>
					{this.props.current_blogpost.qouted_para}
				</p>*/}
				
				<p style={styles.thirdParaText}>
					{this.props.current_blogpost.third_para}
				</p>
				
				<p style={styles.fourthParaText}>
					{this.props.current_blogpost.fourth_para}
				</p>
				
				<p style={styles.allTagsText}>
					{this.props.current_blogpost.all_tags}
				</p>
				
			</div>
		);
	}
}
	
IndividualIndividualBlogPost.defaultProps = {
	//:,
};

export default withRouter(withResponsiveness(IndividualIndividualBlogPost));