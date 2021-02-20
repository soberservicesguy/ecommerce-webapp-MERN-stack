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
	ConnectedBlogPostCard,
	ConnectedCreateBlogPost,
} from '../redux_stuff/connected_components';



class BlogPostContainer extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
		axios.get(utils.baseUrl + '/blogpostings/blogposts-list-with-children',)
		.then((response) => {
			this.props.set_fetched_blogposts(response.data)
		})
		.catch((error) => {
			console.log(error);
		})


	}
	get_10_more_items() {
		axios.get(utils.baseUrl + `/blogpostings/blogposts-list-next-10-with-children`)
		.then((response) => {
			this.props.set_fetched_10_more_blogpost(response.data)
		})
		.catch((error) => {
			console.log(error);
		})		
	}

// RENDER METHOD
	render() {
			
		const total_blogposts = this.props.total_blogposts

	  	const {_xs, _sm, _md, _lg, _xl} = this.props

	  	const styles = {

	  	}

		return (

			<Grid container direction="row" style={{backgroundColor: '#eee'}} >
				
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
		  			<ConnectedCreateBlogPost/>
		  		</Grid>

				{total_blogposts.map((item, index)=>(

					<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
						<ConnectedBlogPostCard
							dataPayloadFromParent = { item }
						
						/>
					</Grid>

				))}

			</Grid>

		);
	}
}

BlogPostContainer.defaultProps = {
	// : ,
};

export default withResponsiveness(BlogPostContainer);