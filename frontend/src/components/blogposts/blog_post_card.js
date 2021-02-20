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
			  		<ComponentForShowingBlogPost
						dataPayloadFromParent = { this.props.dataPayloadFromParent }
			  		/>
		  		</div>

				<div>
					{/* 2nd show individual summary of childs */}
				</div>

				<div>
					{/* 3rd show individual button for showing childs */}
				</div>

				<div>
					{/* 4th create individual child options like comment / like */}
				</div>

		  	</div>
		);
	}
}
	
BlogPostCard.defaultProps = {

};

export default BlogPostCard;