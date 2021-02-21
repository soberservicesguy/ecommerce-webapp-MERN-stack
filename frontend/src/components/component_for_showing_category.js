import { 
	withRouter,
	Link,
} from "react-router-dom";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../responsiveness_hook";


class ComponentForShowingCategory extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			hovered:false
		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist
		var base64Image = "data:image/jpeg;base64," + data.image_filepath

		const styles = {

			imageContainer:{
				// backgroundImage: `url("${base64Image}")`,
				backgroundImage: `url("${utils.image}")`,
				backgroundColor: '#cccccc',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				width:'100%',
				height:this.props.local_height,
			},

			innerContentContainer:{
				// opacity:1
				paddingTop:20,
				paddingLeft:20,
			},
			innerContentHiddenContainer:{
				opacity:0
			},

			categoryText:{
				fontWeight:'bold',
				fontSize:18,
				color:'grey',
			},
			titleText:{
				fontSize:22,
				color:'#eee',
				fontWeight:'bold',
				paddingBottom:0,
				marginBottom:5,
			},

		}

		return (


			<div 
				style={styles.imageContainer}
				onMouseEnter={ () => this.setState(prev => ({...prev, hovered:true})) }
				onMouseLeave={ () => this.setState(prev => ({...prev, hovered:false})) }
			>

				<div style={(this.state.hovered) ? styles.innerContentContainer : styles.innerContentHiddenContainer}>
			  		<Link 
			  			to={`/images/:id=${this.props.dataPayloadFromParent.endpoint}`} 
			  			style={{color: 'inherit', textDecoration: 'inherit'}}
					>
						<div style={{height:70,}}>
							<p style={styles.titleText}>
								Title { data.title }
							</p>						
							<p style={styles.categoryText}>
								Category { data.category }
							</p>
						</div>
					</Link>

					{this.props.children}

				</div>
			</div>

		);
	}
}
	
ComponentForShowingCategory.defaultProps = {

};

// export default ComponentForShowingCategory;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(ComponentForShowingCategory)
					// <p>
					// 	{ data.endpoint }
					// </p>
					// <p>
					// 	{ data.timestamp_of_uploading }
					// </p>
					// <p>
					// 	{ data.description }
					// </p>
					// <p>
					// 	{ data.all_tags }
					// </p>