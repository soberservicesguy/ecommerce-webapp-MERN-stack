import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../utilities";

import withResponsiveness from "../responsiveness_hook";



class QuantityAdjuster extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 1
		}
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
	}

	increment() {
		this.setState(prev => {
			this.props.adjust_quantity_callback(prev.value + 1)
			return {...prev, value:  prev.value + 1 }
		})
	}

	decrement() {
		this.setState(prev => {
			this.props.adjust_quantity_callback((prev.value > 0) ? prev.value - 1 : 0)
			return {...prev, value: (prev.value > 0) ? prev.value - 1 : 0 }
		})
	}

	render() {
	
		return (
			<div style={{
				display:'flex',
				flexDirection:'row',
				justifyContent: 'center',
				alignItems:'center',
			}}>
				<div style={{flexBasis:30,}}>
					<button onClick={this.decrement} style={{height:50, width:'100%'}}>
						-
					</button>
				</div>

				<div style={{flexBasis:30,}}>
					<input type="text" value={this.state.value} readonly style={{width:50, height:50, width:50, textAlign:'center'}}/>
				</div>

				<div style={{flexBasis:30}}>
					<button onClick={this.increment} style={{height:50, width:'100%'}}>
						+
					</button>  
				</div>

			</div>
		);
	}
}

QuantityAdjuster.defaultProps = {

};

export default withResponsiveness(QuantityAdjuster)