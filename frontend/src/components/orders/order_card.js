import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
	withRouter,
	Link,
} from "react-router-dom";

import axios from 'axios';
import firebase from 'firebase';

import {
	ComponentForShowingOrder
} from "."

import utils from "../../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";



class OrderCard extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded: false,
			users: [],
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
			  		<ComponentForShowingOrder
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
	
OrderCard.defaultProps = {

};

// export default OrderCard; // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(OrderCard);