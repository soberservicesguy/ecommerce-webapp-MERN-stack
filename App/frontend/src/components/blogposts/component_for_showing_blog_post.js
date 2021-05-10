import { 
	// withRouter,
	Link,
} from "react-router-dom";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";

import Share from '@material-ui/icons/Share';
import ThumbUp from '@material-ui/icons/ThumbUp';

class ComponentForShowingBlogPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			image_src: null,
		}

	}

	getImage(){

		// this.setState({ image_src: null })
		let image_object_id = this.props.dataPayloadFromParent.image_thumbnail_filepath

		axios.get(`${utils.baseUrl}/blogpostings/get-image`, 
			{
				params: {
					image_object_id: image_object_id
				}
			}
		)
	    .then(async (response) => {
	    	if (response.data.success){
		    	this.setState({ image_src: "data:image/jpeg;base64," + response.data.image})
	    	}

		});


	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	componentDidUpdate(prevProps, prevState, snapshot) {


		if (prevProps.getIndividualImage === false && this.props.getIndividualImage === true){
			console.log('getting image')
			this.getImage()

		}

	}


	render() {

		const styles = {

		}

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist
		var base64Image = "data:image/jpeg;base64," + data.image_thumbnail_filepath


		return (

			<div style={{
				marginLeft:20,
				marginRight:20,
				marginBottom:20,
			}}>
				<img 
					// src={base64Image}
					// src={utils.image} 
					src={this.state.image_src}
					alt="" 
					style={{
						width:'100%', 
						height:400, 
						resizeMode: "stretch"
					}}
				/>

				<p style={{
					fontSize:20,
					marginTop:20,
					color:'grey',
				}}>
					{ data.title }
				</p>

				<p style={{
					color:'grey',
					marginBottom:40,
				}}>
					{ data.first_para }
				</p>

				<div style={{
					display: 'flex',
					flexDirection:'row',
					justifyContent: 'space-between',
					borderTopWidth:1,
					borderTopColor:'#eee',
					borderTopStyle:'solid',
					paddingTop:20,
				}}>
					<div style={{flex:3}}>
				  		<Link 
				  			to={`/blogposts/:id=${this.props.dataPayloadFromParent.endpoint}`} 
				  			style={{color: 'inherit', textDecoration: 'inherit'}}
				  			onClick={() => this.props.set_current_blogpost(data)}
						>
							<p style={{
								fontWeight:'bold',
								marginTop:20,
							}}>
								READ MORE
							</p>
						</Link>						
					</div>

					<div style={{
						flex:1,
						display:'flex',
						flexDirection:'row',
						justifyContent: 'flex-end'
					}}>
						<div style={{
							flex:1,
							margin:'auto',
							textAlign: 'right',
						}}>
							<ThumbUp style={{color:'grey', fontSize:25, }}/>
						</div>

						<div style={{
							flex:1,
							margin:'auto',
							textAlign: 'right',
						}}>
							<Share style={{color:'grey', fontSize:25, }}/>
						</div>
					</div>
				</div>


			</div>			


		);
	}
}
	
ComponentForShowingBlogPost.defaultProps = {

};

// export default ComponentForShowingBlogPost;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(ComponentForShowingBlogPost)

				// <p>
				// 	{ data.endpoint }
				// </p>

				// <p>
				// 	{ data.title }
				// </p>
				// <p>
				// 	{ data.initial_tags }
				// </p>
				// <p>
				// 	{ data.second_para }
				// </p>
				// <p>
				// 	{ data.third_para }
				// </p>
				// <p>
				// 	{ data.fourth_para }
				// </p>
				// <p>
				// 	{ data.all_tags }
				// </p>
				// <p>
				// 	{ data.timestamp_of_uploading }
				// </p>
