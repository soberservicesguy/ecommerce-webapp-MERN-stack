import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import axios from 'axios';
//IMPORT COMPONENTS
// import {ComponentName} from "../components";
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

class ContentAtExtremeEndsContainer extends Component {
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
			// <Grid container direction="row" spacing={4} style={{backgroundColor: '#eee'}} >

			// 	<Grid item container direction="column" xs={12} sm={12} md={2} lg={3}>
			// 		<Grid item>
			// 		</Grid>

			// 		<Grid item>
			// 		</Grid>

			// 		<Grid item>
			// 		</Grid>
			// 	</Grid>

			// 	<Grid item container direction="column" xs={12} sm={12} md={8} lg={6}>
			// 		<Grid item>
			// 		</Grid>

			// 		<Grid item>
			// 		</Grid>
			// 	</Grid>

			// 	<Grid item container direction="column" xs={12} sm={12} md={2} lg={3}>
			// 		<Grid item>
			// 		</Grid>

			// 		<Grid item>
			// 		</Grid>

			// 		<Grid item>
			// 		</Grid>
			// 	</Grid>

			// </Grid>
			<div
				style={{
					width:this.props.containerWidth,
					height:this.props.containerHeight,
					backgroundColor: this.props.containerColor,
					margin:'auto',
					// display:'flex',
					// flexDirection:'row',
					// alignItems:'center',
					// alignContent:'center',
					// justifyContent: 'center',
				}}
			>

				<Grid container direction="row" justify="space-between" alignItems="center" spacing={0}>
					<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
						{this.props.children[0]}
					</Grid>
					<Grid item>
						{this.props.children[1]}
					</Grid>
				</Grid>

			</div>				
		);
	}
}

ContentAtExtremeEndsContainer.defaultProps = {
  //:,
  containerWidth:'90%',
  containerHeight:200,
  containerColor:null
};

export default withResponsiveness(withStyles(styles)(ContentAtExtremeEndsContainer));