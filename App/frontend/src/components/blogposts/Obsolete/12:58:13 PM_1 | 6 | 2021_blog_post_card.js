
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
	withRouter,
	Link,
} from "react-router-dom";

import axios from 'axios';
import firebase from 'firebase';

import {
	ComponentForShowingBlogPost
} from "."

import utils from "../../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";


const styles = theme => ({
	root: {
		maxWidth: 380,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},

});

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

// export default BlogPostCard; // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(withStyles(styles)(BlogPostCard));
