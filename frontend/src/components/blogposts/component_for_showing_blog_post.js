import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";


class ComponentForShowingBlogPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {

		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		const styles = {

		}

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist
		var base64Image = "data:image/jpeg;base64," + data.image_thumbnail_filepath

		return (
			<div style={styles.outerContainer}>

				<div style={styles.imageContainer}>
					<img src={base64Image} alt="" 
						style={{
							width:200, 
							height:400, 
							resizeMode: "contain"
						}}
					/>
				</div>

				<p>
					{ data.endpoint }
				</p>

				<p>
					{ data.title }
				</p>
				<p>
					{ data.first_para }
				</p>
				<p>
					{ data.initial_tags }
				</p>
				<p>
					{ data.second_para }
				</p>
				<p>
					{ data.third_para }
				</p>
				<p>
					{ data.fourth_para }
				</p>
				<p>
					{ data.all_tags }
				</p>
				<p>
					{ data.timestamp_of_uploading }
				</p>
			</div>
		);
	}
}
	
ComponentForShowingBlogPost.defaultProps = {

};

// export default ComponentForShowingBlogPost;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(ComponentForShowingBlogPost)