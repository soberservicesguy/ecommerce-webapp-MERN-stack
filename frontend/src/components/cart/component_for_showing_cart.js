
import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";

const styles = theme => ({
	outerContainer: {
	},
});

class ComponentForShowingCart extends Component {
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
					{ data.price }
				</p>
				<p>
					{ data.initial_quantity }
				</p>
				<p>
					{ data.product_size }
				</p>
				<p>
					{ data.product_color }
				</p>
				<p>
					{ data.timestamp_of_uploading }
				</p>
			</div>
		);
	}
}
	
ComponentForShowingCart.defaultProps = {

};


// export default ComponentForShowingCart;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(withStyles(styles)(ComponentForShowingCart))
