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

import { 
	withRouter,
	Link,
} from "react-router-dom";


class MyResponsiveNavigation extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}


// RENDER METHOD
	render() {
			
	  	const {_xs, _sm, _md, _lg, _xl} = this.props

	  	const styles = {

	  	}

	  	const navigation_options = [
	  		{option_name:'Home', endpoint:'home'},
	  		{option_name:'Products', endpoint:'products'},
	  		{option_name:'Blogposts', endpoint:'blogposts'},
	  		{option_name:'Cart', endpoint:'cart'},
	  		{option_name:'Login', endpoint:'login'},
	  		{option_name:'Signup', endpoint:'signup'},
	  		{option_name:'Order', endpoint:'order'},
	  	]

	  	const {pathname} = this.props.location;

		return (

			<div style={{
				// backgroundColor: 'blue',
				paddingTop:20,
				paddingBottom:20,
			}}>			
				<Grid container direction="row" alignItems="center">
					
					<Grid item xs={12} sm={12} md={12 - navigation_options.length} lg={12 - navigation_options.length} xl={12 - navigation_options.length}>
						<div style={{
							display:'flex', 
							flexDirection:'row', 
							alignItems:'center', 
							width:'30%', 
							margin:(_xs || _sm) ? 'auto' : 0,
							marginBottom:(_xs || _sm) ? 20 : 0,
						}}>
							<img src={utils.ecommerce_logo} alt="" 
								style={{
									width:70, 
									height:70, 
									resizeMode: "stretch",
									borderRadius: 70/2,
								}}
							/>
							<p style={{
								fontWeight:'bold',
								fontSize:20,
								marginBottom:0,
								marginLeft:10,
								color:'grey',
							}}>
								E-Commerce
							</p>
						</div>							
			  		</Grid>


						{navigation_options.map((item, index)=>(
			

							<Grid item xs={12} sm={12} md={1} lg={1} xl={1}>

						  		<Link 
						  			to={`/${item.endpoint}`} 
						  			style={{
						  				color: 'inherit', 
						  				textDecoration: 'inherit',
						  			}}
								>
									<p style={{
										textAlign:'center',
										marginBottom: 0,
										paddingBottom: 0,
										fontSize:18,
										fontWeight:'bold',
										// color:'grey',
									// color of active link
										color:( `/${item.endpoint}` === pathname) ? 'black' : 'grey',
									// border below active link
										// borderBottomWidth:( item.endpoint === this.state.current_route) ? 3 : 0,
										// borderBottomColor:'black',
										// borderBottomStyle:'solid',
										// marginLeft:20,
										// marginRight:20,
						  				marginBottom:15,
									}}>
										{item.option_name}
									</p>
								</Link>
						
							</Grid>

						))}


				</Grid>
			</div>


		);
	}
}

MyResponsiveNavigation.defaultProps = {
	// : ,
};

export default withRouter(withResponsiveness(MyResponsiveNavigation));