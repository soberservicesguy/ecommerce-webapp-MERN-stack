import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// IMPORT material-ui stuff
import { withStyles } from '@material-ui/styles';
import { 
	// Grid, 
	// Button 
} from "@material-ui/core";
// IMPORT responsiveness hook
import withResponsiveness from "../responsiveness_hook";


class TextBoxWithBackgroundImage extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
// RENDER METHOD
	render() {

		const { classes } = this.props;
		const {_xs, _sm, _md, _lg, _xl} = this.props;

		return (
			<div
				style={{
					backgroundImage:`url(${this.props.backgroundImage})`,
					backgroundRepeat: 'no-repeat',
					// backgroundAttachment: 'fixed',
					height:'100%',
					width:'100%',
					backgroundSize: 'cover', // contain / stretch
					backgroundPosition: 'center',
				}}
			>
				<p
					style={{
						paddingLeft:30,
						paddingBottom: 30,
						// textAlign:'left',
						width:200, //'30%',
						paddingLeft:20,
						paddingTop:20,
						paddingBottom:20,
						paddingRight:20,
						height:90, // '20%',
						backgroundColor: 'white',
						position:'relative',
						bottom: this.props.verticalDisplacement, //'70%',
						left:this.props.horizontalDisplacement,
						fontSize:20,
					}}
				>
					{this.props.text} <br/> {this.props.newLineText} 
				</p>

			</div>
		);
	}
}
	
TextBoxWithBackgroundImage.defaultProps = {
  // : ,
};

export default withResponsiveness(TextBoxWithBackgroundImage);

// DOCSTRING
	// This is only suitable for putting inside masonries
