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


class IndividualIndividualOrder extends Component {
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

	  	const styles = {

	  	}

	  	return (
	  		<Grid container direction="row" spacing={4} style={{backgroundColor: '#eee'}} >

	  			<Grid item container direction="column" xs={12} sm={12} md={2} lg={3}>
	  				<Grid item>
	  				</Grid>

	  				<Grid item>
	  				</Grid>

	  				<Grid item>
	  				</Grid>
	  			</Grid>

	  			<Grid item container direction="column" xs={12} sm={12} md={8} lg={6}>
	  				<Grid item>
	  				</Grid>

	  				<Grid item>
	  				</Grid>

	  				<Grid item>
	  				</Grid>
	  			</Grid>

	  			<Grid item container direction="column" xs={12} sm={12} md={2} lg={3}>
	  				<Grid item>
	  				</Grid>

	  				<Grid item>
	  				</Grid>

	  				<Grid item>
	  				</Grid>
	  			</Grid>

	  		</Grid>
		);
	}
}
	
IndividualIndividualOrder.defaultProps = {
	//:,
};

export default withRouter(withResponsiveness(IndividualIndividualOrder));