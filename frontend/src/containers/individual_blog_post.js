
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

const styles = theme => ({
  root: {
    height: 48,
    // color: props => (props.cool) ? 'red' : 'black',
    [theme.breakpoints.up('sm')]:{
    	paddingLeft:100
    },
  },
});


class IndividualIndividualBlogPost extends Component {
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

  		var base64Image = "data:image/jpeg;base64," + this.props.current_blogpost.image_thumbnail_filepath

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
  					{this.props.current_blogpost.title}
  				</p>
  				
  				<p>
  					{this.props.current_blogpost.first_para}
  				</p>
  				
  				<p>
  					{this.props.current_blogpost.initial_tags}
  				</p>
  				
  				<p>
  					{this.props.current_blogpost.second_para}
  				</p>
  				
  				<p>
  					{this.props.current_blogpost.qouted_para}
  				</p>
  				
  				<p>
  					{this.props.current_blogpost.third_para}
  				</p>
  				
  				<p>
  					{this.props.current_blogpost.fourth_para}
  				</p>
  				
  				<p>
  					{this.props.current_blogpost.all_tags}
  				</p>
  				
  			</div>
		);
	}
}
	
IndividualIndividualBlogPost.defaultProps = {
	//:,
};

export default withRouter(withResponsiveness(withStyles(styles)(IndividualIndividualBlogPost)));
