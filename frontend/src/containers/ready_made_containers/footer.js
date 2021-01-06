import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import axios from 'axios';
//IMPORT COMPONENTS
import {ComponentName} from "../components";
// IMPORT CONTAINER
import InlineComponentsContainer from "./inline_components_container";
// IMPORT material-ui stuff
import { withStyles } from '@material-ui/styles';
import { 
	Grid, 
	// Button 
} from "@material-ui/core";
// IMPORT responsiveness hook
import withResponsiveness from "../responsiveness_hook";

const styles = theme => ({
  root: {
    height: 48,
    color: props => (props.cool) ? 'red' : 'black',
    [theme.breakpoints.up('sm')]:{
    	paddingLeft:100
    },
    '&:hover':{
    	paddingLeft:10	
    }
  },
});

class FooterContainer extends Component {
	constructor(props) {
		super(props);
		// - ONLY SET STATES WHEN NEEDED, ONLY IF THE DATA NEEDES TO BE USED AGAIN AND AGAIN - //
// STATE	
		this.state = {
	    isMobile: false,
	    fetchedData:[],
	  }	
	}

// COMPONENT DID MOUNT
	// - NEVER RUN A METHOD WHICH INVOLVES SETTING STATE IN IT FOLLOWED BY RUNNING ANOTHER ONE USING THE UPDATED STATE - //	
  componentDidMount() {
	// EVENT LISTENER FOR WINDOW SIZE
    window.addEventListener('resize', this.throttledHandleWindowResize);

// FETCHING DATA FOR COMPONENT
  	// axios.get(utils.baseUrl + utils.someEndPoint, 
	// 		// {params: {ID: 12345}}
	//   )
	//   .then( (response) => {
	//     console.log(response.data);
	//     this.setState(
	//     	prev => (
	//     		{
	//     			...prev,
	//     			fetchedData:response.data
	//     		}
	//     	),
	//     );
	//   })
	//   .catch( (error) => {
	//     console.log(error);
	//   })
	//   .then( () => {
	//     // always executed
	//   });
  }

// SETTING THROTTLE FOR EVENT LISTENER FOR WINDOW SIZE
	throttledHandleWindowResize = () => {
    return throttle(() => {
      this.setState({ isMobile: window.innerWidth < 480 })
    }, 200);
  }

// COMPONENT WILL UNMOUNT
  componentWillUnmount() {
	// REMOVING WINDOW SIZE EVENT LISTENER
    window.removeEventListener('resize', this.throttledHandleWindowResize);
  }

// GET REQUESTS CALLBACK (FIREBASE)
	makeGetRequest(){
		axios.get('https://rest-api-react-native.firebaseio.com/particular_user.json', 
			// {
		 //    params: {
		 //      ID: 12345
		 //    }
		 //  }
	  )
	  .then(function (response) {
	    console.log(response.data);
	  })
	  .catch(function (error) {
	    console.log(error);
	  })
	  .then(function () {
	    // always executed
	  });
	}

// POST REQUESTS CALLBACK (FIREBASE)
	makePostRequest(){
		axios.put('https://rest-api-react-native.firebaseio.com/particular_user3/friend.json', 
			{
				panda:{
			    firstName: 'Frede',
			    lastName: 'Flintstone'
			  }
			}
	  )
	  .then(function (response) {
	    console.log(response.data);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	}

// ASYNC GET REQUESTS CALLBACK (FIREBASE)
	makeAsyncGetRequest(){
	  try {
	    const response =  axios.get('https://rest-api-react-native.firebaseio.com/particular_user.json', 
				// {
			 //    params: {
			 //      ID: 12345
			 //    }
			 //  }
		  );
	    console.log(response.data);
	  } catch (error) {
	    console.error(error);
	  }
	}

// ASYNC POST REQUESTS CALLBACK (FIREBASE)
	makgeAsyncPostRequest(){
	  try {
	    const response =  axios.post('https://rest-api-react-native.firebaseio.com/particular_user3/friend.json', 
				{
					panda:{
				    firstName: 'Frede',
				    lastName: 'Flintstone'
				  }
				});
	    console.log(response);
	  } catch (error) {
	    console.error(error);
	  }
	}

// RENDER METHOD
	render() {
		const { classes } = this.props;
		const {_xs, _sm, _md, _lg, _xl} = this.props;
		
		return (
			<div>
				<Grid container direction="row" spacing={0} style={{backgroundColor: 'white' , paddingLeft:50}} >
					<Grid item xs={12} sm={12} md={3}>
						<div
							style={{
								marginTop:100,
								marginRight:150,
							}}
						>
							<img 
								src={this.props.companyLogo}
								style={{
									objectFit:'fill', 
									width: 80, 
									height:80,
									// paddingTop:this.props.surroundedPadding,
									// paddingBottom:this.props.surroundedPadding+10,
									// paddingLeft:this.props.surroundedPadding,
									paddingRight:this.props.imagePaddingRight,
									marginBottom:50
								}} 
							/>
							<p
								style={{
									fontSize:this.props.firstColumnFontSize,
									color:this.props.firstColumnFontColor
								}}
							>
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
					<Grid item xs={12} sm={12} md={3}>
						<div
							style={{
								marginTop:100,
								marginRight:150
							}}
						>
							<p
								style={{
									fontSize:20,
									fontWeight:'bold',
									color:this.props.headingsColor,
									// fontSize:this.props.secondColumnFontSize
								}}
							>
								NAVIGATE
							</p>

							<div
								style={{
									marginTop:20,
								}}
							>
								<a href="#" onClick={()=>null}
									style={{
										fontWeight:'bold',
										color:this.props.secondColumnFontColor,
										fontSize:this.props.secondColumnFontSize
									}}
								>
									HOME
								</a>
							</div>

							<div
								style={{
									marginTop:10,
								}}
							>
								<a href="#" onClick={()=>null}
									style={{
										fontWeight:'bold',
										color:this.props.secondColumnFontColor,
										fontSize:this.props.secondColumnFontSize
									}}
								>
									GRID SYSTEM
								</a>
							</div>

							<div
								style={{
									marginTop:10,
								}}
							>
								<a href="#" onClick={()=>null}
									style={{
										fontWeight:'bold',
										color:this.props.secondColumnFontColor,
										fontSize:this.props.secondColumnFontSize
									}}
								>
									SERVICES
								</a>
							</div>

							<div
								style={{
									marginTop:10,
								}}
							>					
								<a href="#" onClick={()=>null}
									style={{
										fontWeight:'bold',
										color:this.props.secondColumnFontColor,
										fontSize:this.props.secondColumnFontSize
									}}
								>
									PORTFOLIO
								</a>
							</div>

							<div
								style={{
									marginTop:10,
								}}
							>
								<a href="#" onClick={()=>null}
									style={{
										fontWeight:'bold',
										color:this.props.secondColumnFontColor,
										fontSize:this.props.secondColumnFontSize
									}}
								>
									BLOG
								</a>
							</div>

							<div
								style={{
									marginTop:10,
								}}
							>
								<a href="#" onClick={()=>null}
									style={{
										fontWeight:'bold',
										color:this.props.secondColumnFontColor,
										fontSize:this.props.secondColumnFontSize
									}}
								>
									SHOP
								</a>
							</div>

							<div
								style={{
									marginTop:10,
								}}
							>
								<a href="#" onClick={()=>null}
									style={{
										fontWeight:'bold',
										color:this.props.secondColumnFontColor,
										fontSize:this.props.secondColumnFontSize
									}}
								>
									PAGES
								</a>
							</div>

						</div>
					</Grid>
					<Grid item xs={12} sm={12} md={3}>
						<div
							style={{
								marginTop:100,
								marginRight:150
							}}
						>
							<p
								style={{
									fontSize:20,
									fontWeight:'bold',
									color:this.props.headingsColor
								}}
							>
								ABOUT US
							</p>

							<div
								style={{
									marginTop:20,
								}}
							>
								<a href="#" onClick={()=>null}
									style={{
										color:this.props.thirdColumnFontColor,
										fontSize:this.props.thirdColumnFontSize										
										// fontWeight:'bold',
									}}
								>
									COMPANY
								</a>
							</div>

							<div
								style={{
									marginTop:10,
								}}
							>
								<a href="#" onClick={()=>null}
									style={{
										// fontWeight:'bold',
										color:this.props.thirdColumnFontColor,
										fontSize:this.props.thirdColumnFontSize
									}}
								>
									WHAT WE DO
								</a>
							</div>

							<div
								style={{
									marginTop:10,
								}}
							>
								<a href="#" onClick={()=>null}
									style={{
										// fontWeight:'bold',
										color:this.props.thirdColumnFontColor,
										fontSize:this.props.thirdColumnFontSize
									}}
								>
									HELP CENTER
								</a>
							</div>

							<div
								style={{
									marginTop:10,
								}}
							>					
								<a href="#" onClick={()=>null}
									style={{
										color:this.props.thirdColumnFontColor,
										fontSize:this.props.thirdColumnFontSize
										// fontWeight:'bold',
									}}
								>
									TERMS OF SERVICE
								</a>
							</div>

							<div
								style={{
									marginTop:10,
								}}
							>
								<a href="#" onClick={()=>null}
									style={{
										color:'grey',
										// fontWeight:'bold',
										color:this.props.thirdColumnFontColor,
										fontSize:this.props.thirdColumnFontSize
									}}
								>
									CONTACT
								</a>
							</div>

						</div>

					</Grid>
					<Grid item  xs={12} sm={12} md={3}>
						<div
							style={{
								marginTop:100,
							}}
						>
							<p
								style={{
									fontSize:20,
									fontWeight:'bold',
									color:this.props.headingsColor
								}}
							>
								RECENT POSTS
							</p>

							<div
								style={{
									marginTop:20,
								}}
							>
								<a href="#" onClick={()=>null}
									style={{
										color:this.props.fourthColumnFontColor,
										fontSize:this.props.fourthColumnFontSize
										// fontWeight:'bold',
									}}
								>
									New trends in web design
								</a>
								<br/>
								<p
									style={{
										color:this.props.fourthColumnFontColor,
										fontSize:12
									}}
								>
									July 10
								</p>
							</div>

							<div
								style={{
									marginTop:15,
								}}
							>
								<a href="#" onClick={()=>null}
									style={{
										color:this.props.fourthColumnFontColor,
										fontSize:this.props.fourthColumnFontSize
										// fontWeight:'bold',
									}}
								>
									The sound of life
								</a>
								<br/>
								<p
									style={{
										color:this.props.fourthColumnFontColor,
										fontSize:12
									}}
								>
									October 10
								</p>

							</div>

							<div
								style={{
									marginTop:15,
								}}
							>
								<a href="#" onClick={()=>null}
									style={{
										color:this.props.fourthColumnFontColor,
										fontSize:this.props.fourthColumnFontSize
										// fontWeight:'bold',
									}}
								>
									Time for minimalism
								</a>
								<br/>
								<p
									style={{
										color:this.props.fourthColumnFontColor,
										fontSize:12
									}}
								>
									September 21
								</p>

							</div>
						</div>

					</Grid>
				</Grid>


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
  headingsColor:'black',
  backgroundColor:'#eee',
  firstColumnFontSize:13,
  firstColumnFontColor:'grey',
  secondColumnFontSize:15,
  secondColumnFontColor:'grey',
  thirdColumnFontSize:14,
  thirdColumnFontColor:'grey',
  fourthColumnFontSize:13,
  fourthColumnFontColor:'grey',
  companyLogo:require('../images/samosa.jpeg'),
  facebookLogo:require('../images/samosa.jpeg'),
  twitterLogo:require('../images/samosa.jpeg'),
  linkedinLogo:require('../images/samosa.jpeg'),
};

export default withResponsiveness(withStyles(styles)(FooterContainer));