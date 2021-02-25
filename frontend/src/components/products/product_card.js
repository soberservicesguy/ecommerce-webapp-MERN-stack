import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
	withRouter,
	Link,
} from "react-router-dom";

import axios from 'axios';
import firebase from 'firebase';

import {
	ComponentForShowingProduct
} from "."

import utils from "../../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";

import Share from '@material-ui/icons/Share';
import ThumbUp from '@material-ui/icons/ThumbUp';


class ProductCard extends Component {
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


		// let {}

		return (
		  	<div>

		  		<div>
					{/* first the parent / card component */}
			  		<Link 
			  			to={{ pathname: `/products/:id=${this.props.dataPayloadFromParent.endpoint}`, state:{price:'valueable'} }}
			  			style={{color: 'inherit', textDecoration: 'inherit'}}
					>
				  		<ComponentForShowingProduct
							dataPayloadFromParent = { this.props.dataPayloadFromParent }
				  		/>
				  	</Link>
		  		</div>

				<div style={{
					display:'flex',
					flexDirection:'row',
					justifyContent: 'space-between',
				}}>

					<div style={{
						flex:4
					}}>
						<button
							onClick = {() => this.props.add_product_to_cart(this.props.dataPayloadFromParent)}
							style={{
								ouline:'none',
								background:'none',
								backgroundColor:'grey',
								color:'white',
								paddingLeft:20,
								paddingRight:20,
								paddingTop:10,
								paddingBottom:10,
								width:'100%',
							}}
						>
							ADD TO CART
						</button>
					</div>

					<div style={{
						flex:1,
						margin:'auto',
					}}>
						<ThumbUp style={{color:'grey', fontSize:25, marginLeft:20,}}/>
					</div>

					<div style={{
						flex:1,
						margin:'auto',
					}}>
						<Share style={{color:'grey', fontSize:25, }}/>
					</div>

				</div>

		  	</div>
		);
	}
}
	
ProductCard.defaultProps = {

};

// export default ProductCard; // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(ProductCard);