import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//IMPORT COMPONENTS
// IMPORT material-ui stuff
import { 
	Grid, 
	// Button 
} from "@material-ui/core";
// IMPORT responsiveness hook
import withResponsiveness from "../responsiveness_hook";
import utils from "../utilities";

import { 
	withRouter,
	Link,
} from "react-router-dom";


class FooterContainer extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
	  }	
	}

// COMPONENT DID MOUNT
  componentDidMount() {
  }


// RENDER METHOD
	render() {
		const { classes } = this.props;
		const {_xs, _sm, _md, _lg, _xl} = this.props;

		const styles = {
			outerContainer:{
				borderBottom:this.props.borderStyle,
				paddingBottom: (_md || _lg || _xl) ? 50 : 0,
				width:'90%',
				margin:'auto',
				marginBottom:10,
				// backgroundColor: '#000000',
				height:500,
			},
			firstColumnContainer:{
				marginTop:100,
				// paddingLeft:100,
				textAlign:(_md || _lg || _xl) ? 'left' : 'center',
				paddingBottom:100,
				marginLeft:(_md || _lg || _xl) ? 100 : 0,
			},

			companyLogoImageStyle:{
				objectFit:'fill', 
				width: 80, 
				height:80,
				// paddingTop:this.props.surroundedPadding,
				// paddingBottom:this.props.surroundedPadding+10,
				// paddingLeft:this.props.surroundedPadding,
				paddingRight:this.props.imagePaddingRight,
				marginBottom:50,
				borderRadius:80/2,
			},

			secondColumnWrapper:{
				marginTop:100,
				marginLeft: (_md || _lg || _xl) ? 50 : 0,
				textAlign: (_md || _lg || _xl) ? 'left' : 'center',
			},
			secondColumnLinkText:{
				fontWeight:'bold',
				color:this.props.secondColumnFontColor,
				fontSize:this.props.secondColumnFontSize
			},
			thirdColumnLinkText:{
				color:this.props.thirdColumnFontColor,
				fontSize:this.props.thirdColumnFontSize										
				// fontWeight:'bold',
			},

			headingText:{
				fontSize:20,
				fontWeight:'bold',
				color:this.props.headingsColor,
				// fontSize:this.props.secondColumnFontSize
			},

			thirdColumnContainer:{
				marginTop:100,
				// marginRight:150,
				textAlign:(_md || _lg || _xl) ? 'left' : 'center',
			},

			fourthColumnContainer:{
				marginTop:100,
				textAlign:(_md || _lg || _xl) ? 'left' : 'center',
			},
			fourthColumnLinkText:{
				color:this.props.fourthColumnFontColor,
				fontSize:this.props.fourthColumnFontSize,
				// fontWeight:'bold',
				marginTop:0, 
				paddingTop:0, 
				marginBottom:0, 
				paddingBottom:0,
			},
			fourthColumnLinkSmallerText:{
				color:this.props.fourthColumnFontColor,
				fontSize:12
			},
		}

		return (

				<div style={styles.outerContainer}>

					<Grid container direction="row">

						<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
							<div style={styles.firstColumnContainer}>
								<img 
									src={this.props.companyLogo}
									style={styles.companyLogoImageStyle} 
								/>
								<p style={{fontSize:this.props.firstColumnFontSize, color:this.props.firstColumnFontColor}}>
									555 California str, Suite 100
									<br/>
									San Francisco, CA 94107
									<br/><br/>
									1-800-312-2121
									<br/>
									1-800-310-1010
									<br/><br/>
									info@haswell.com 
								</p>
							</div>
						</Grid>

						<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
							<div style={styles.secondColumnWrapper}>
								<p style={styles.headingText}>
									NAVIGATE
								</p>


								<div style={{marginTop:20,}}>
									<Link to="/login">
										<p style={styles.secondColumnLinkText}>
											LOGIN
										</p>
									</Link>
								</div>

								<div style={{marginTop:10,}}>
									<Link to="/signup">
										<p style={styles.secondColumnLinkText}>
											SIGN UP
										</p>
									</Link>
								</div>



								<div style={{marginTop:10,}}>
									<Link to="/blogposts">
										<p style={styles.secondColumnLinkText}>
											BLOGPOSTS
										</p>
									</Link>
								</div>



								<div style={{marginTop:10,}}>
									<Link to="/images">
										<p style={styles.secondColumnLinkText}>
											IMAGES
										</p>
									</Link>
								</div>


								<div style={{marginTop:10,}}>
									<Link to="/videos">
										<p style={styles.secondColumnLinkText}>
											VIDEOS
										</p>
									</Link>
								</div>

								{(this.props.isAllowedImagesControl) ? (

									<div style={{marginTop:10,}}>
										<Link to="/Bulk-Upload-Image">
											<p style={styles.secondColumnLinkText}>
												UPLOAD BULK IMAGES
											</p>
										</Link>
									</div>

									) : (
										null
									)
								}

								{(this.props.isAllowedVideosControl) ? (

									<div style={{marginTop:10,}}>
										<Link to="/Bulk-Upload-Video">
											<p style={styles.secondColumnLinkText}>
												UPLOAD BULK VIDEOS
											</p>
										</Link>
									</div>

									) : (
										null
									)
								}

								{(this.props.isAllowedBlogpostsControl) ? (

									<div style={{marginTop:10,}}>
										<Link to="/Bulk-Upload-Blogpost">
											<p style={styles.secondColumnLinkText}>
												UPLOAD BULK BLOGPOSTS
											</p>
										</Link>
									</div>

									) : (
										null
									)
								}


								{/*<div style={{marginTop:10,}}>
									<Link to="/blogposts">
										<p style={styles.secondColumnLinkText}>
											SHOP
										</p>
									</Link>
								</div>



								<div style={{marginTop:10,}}>
									<Link to="/blogposts">
										<p style={styles.secondColumnLinkText}>
											PAGES
										</p>
									</Link>
								</div>*/}

							</div>
						</Grid>

						<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
							<div style={styles.thirdColumnContainer}>
								<p style={styles.headingText}>
									ABOUT US
								</p>


								<div style={{marginTop:20,}}>
									<Link to="/images">
										<p style={styles.thirdColumnLinkText}>
											COMPANY
										</p>
									</Link>
								</div>

								<div style={{marginTop:10,}}>
									<Link to="/images">
										<p style={styles.thirdColumnLinkText}>
											WHAT WE DO
										</p>
									</Link>
								</div>


								<div style={{marginTop:10,}}>
									<Link to="/images">
										<p style={styles.thirdColumnLinkText}>
											HELP CENTER
										</p>
									</Link>
								</div>

								<div style={{marginTop:10,}}>
									<Link to="/images">
										<p style={styles.thirdColumnLinkText}>
											TERMS OF SERVICE
										</p>
									</Link>
								</div>

								<div style={{marginTop:10,}}>
									<Link to="/images">
										<p style={styles.thirdColumnLinkText}>
											CONTACT
										</p>
									</Link>
								</div>

							</div>
						</Grid>

						<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
							<div style={styles.fourthColumnContainer}>
								<p style={styles.headingText}>
									RECENT POSTS
								</p>


								<div style={{marginTop:20,}}>
									<Link to="/blogposts">
										<p style={styles.fourthColumnLinkText}>
											New trends in web design
										</p>
										<p style={styles.fourthColumnLinkSmallerText}>
											July 10
										</p>
									</Link>
								</div>

								<div style={{marginTop:10,}}>
									<Link to="/blogposts">
										<p style={styles.fourthColumnLinkText}>
											New trends in web design
										</p>
										<p style={styles.fourthColumnLinkSmallerText}>
											July 10
										</p>
									</Link>
								</div>

								<div style={{marginTop:15,}}>
									<Link to="/blogposts">
										<p style={styles.fourthColumnLinkText}>
											The sound of life
										</p>
										<p style={styles.fourthColumnLinkSmallerText}>
											October 10
										</p>
									</Link>
								</div>

								<div style={{marginTop:0,}}>
									<Link to="/blogposts">
										<p style={styles.fourthColumnLinkText}>
											Time for minimalism
										</p>
										<p style={styles.fourthColumnLinkSmallerText}>
											September 21
										</p>
									</Link>
								</div>

							</div>
						</Grid>
					</Grid>

			{/*bottom credits*/}

				<div
					style={{
						margin:'auto',
						width:'80%',
						paddingLeft:0,
					}}
				>
					<div
						style={{
							float:'left',
							marginTop:40,
						}}
					>
						<a href="#" onClick={()=>null}
							style={{
								color:this.props.firstColumnFontColor,
								marginLeft:0,
								paddingLeft:0,
								fontSize:10
								// fontWeight:'bold',
							}}
						>
							© HASWELL 2020
						</a>

					</div>

					<div
						style={{
							float:'right',
							marginTop:40,
						}}
					>
						<img 
							src={this.props.facebookLogo}
							style={{
								objectFit:'fill', 
								width: 30, 
								height:30,
								paddingRight:this.props.imagePaddingRight,
								marginBottom:50
							}} 
						/>
						<img 
							src={this.props.twitterLogo}
							style={{
								objectFit:'fill', 
								width: 30, 
								height:30,
								paddingRight:this.props.imagePaddingRight,
								marginBottom:50,
								marginLeft:15,
							}} 
						/>
						<img 
							src={this.props.linkedinLogo}
							style={{
								objectFit:'fill', 
								width: 30, 
								height:30,
								paddingRight:this.props.imagePaddingRight,
								marginBottom:50,
								marginLeft:15,
							}} 
						/>

					</div>

				</div>

			</div>
		);
	}
}

FooterContainer.defaultProps = {
  //:,
  containerWidth:'90%',
  borderStyle:'1px solid grey',
  headingsColor:'white',
  backgroundColor:'#eee',
  firstColumnFontSize:13,
  firstColumnFontColor:'grey',
  secondColumnFontSize:15,
  secondColumnFontColor:'grey',
  thirdColumnFontSize:14,
  thirdColumnFontColor:'grey',
  fourthColumnFontSize:13,
  fourthColumnFontColor:'grey',
  companyLogo:utils.image,
  facebookLogo:require('../images/samosa.jpeg'),
  twitterLogo:require('../images/samosa.jpeg'),
  linkedinLogo:require('../images/samosa.jpeg'),
};

export default withResponsiveness(withRouter(FooterContainer));