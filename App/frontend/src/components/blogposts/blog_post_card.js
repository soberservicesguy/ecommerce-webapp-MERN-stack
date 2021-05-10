import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
	withRouter,
	Link,
} from "react-router-dom";

import axios from 'axios';
import firebase from 'firebase';
import utils from "../../utilities";


import {
	ComponentForShowingBlogPost
} from "."


class BlogPostCard extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded: false,
		}	

	}


// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		const styles = {

		}

		return (
		  	<div>

		  		<div>
					{/* first the parent / card component */}
			  		<Link 
			  			to = {{ pathname: `/blogposts/:id=${this.props.dataPayloadFromParent.endpoint}`, state:{price:'valueable'} }}
			  			style = {{color: 'inherit', textDecoration: 'inherit'}}
			  			onClick = { () => this.props.set_current_blogpost(this.props.dataPayloadFromParent) }
					>
				  		<ComponentForShowingBlogPost
				  			getIndividualImage = {this.props.getIndividualImage}
							dataPayloadFromParent = { this.props.dataPayloadFromParent }
				  		/>
				  	</Link>
		  		</div>

		  	</div>
		);
	}
}
	
BlogPostCard.defaultProps = {

};

export default BlogPostCard;