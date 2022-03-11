import React, {Component} from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";

// IMPORT CONNECTED CONTAINERS
import {
	ConnectedSignUpContainer,
	ConnectedLoginContainer,
	ConnectedIndividualCarousel,
	ConnectedProductContainer,
	ConnectedIndividualProduct,
	ConnectedCartContainer,
	ConnectedIndividualCartItem,
	ConnectedOrderContainer,
	ConnectedIndividualOrder,
	ConnectedBlogPostContainer,
	ConnectedIndividualBlogPost,
	ConnectedBulkBlogpostUpload,
	ConnectedBulkCarouselUpload,
	ConnectedBulkProductUpload,
	ConnectedBulkProductCategoryUpload,
	// ConnectedStripeCheckout,
	ConnectedHomeContainer,
	ConnectedFooterContainer,
	ConnectedResponsiveNavigation
} from "../redux_stuff/connected_components";



class RootRouterContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	render() {


		return (
			<Router>
				<div>

					<Switch>


						<Route exact path="/" render={() => (
							(this.props.isSignedIn) ? (
								<Redirect to="/home"/>
							) : (
								<Redirect to="/login"/>
							)
						)}/>


						<Route exact path="/signup">
							<ConnectedSignUpContainer/>
						</Route>

						<Route exact path="/login">
							<ConnectedLoginContainer/>
						</Route>


						<Route exact path="/home" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedHomeContainer/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>


						<Route exact path="/blogposts" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedBlogPostContainer/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>

						<Route exact path="/blogposts/:id" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedIndividualBlogPost/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>

						<Route exact path="/products/:category" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedProductContainer/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>



						<Route exact path="/products" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedProductContainer/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>

						<Route exact path="/product/:id" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedIndividualProduct/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>


						<Route exact path="/cart" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedCartContainer/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>

						<Route exact path="/order" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedOrderContainer/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>



						{/*<Route path="/orders/:endpoint-param">
							<ConnectedIndividualOrder/>
						</Route>*/}


						<Route exact path="/order" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedOrderContainer/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>


						<Route exact path="/Bulk-Upload-Carousel" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedBulkCarouselUpload/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>

						<Route exact path="/Bulk-Upload-Blogpost" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedBulkBlogpostUpload/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>


						<Route exact path="/Bulk-Upload-Product" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedBulkProductUpload/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>



{/*						<Route exact path="/Stripe-Checkout" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedStripeCheckout/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>
*/}

						<Route exact path="/Bulk-Upload-Product-Category" render={() => (
							(this.props.isSignedIn) ? (
								<React.Fragment>
									<div style={{width:'95%', margin:'auto'}}>
										<ConnectedResponsiveNavigation/>
									</div>
				
									<ConnectedBulkProductCategoryUpload/>
				
									<div style={{backgroundColor: 'black'}}>
										<ConnectedFooterContainer/>
									</div>
								</React.Fragment>
							) : (
								<Redirect to="/login"/>
							)
						)}/>


				{/* if no match was made with endpoint then redirect to sign up */}
						<Route path="/*">
							(this.props.isSignedIn) ? (
								<Redirect to="/home"/>
							) : (
								<Redirect to="/login"/>
							)
						</Route>

					</Switch>

				</div>
			</Router>
		);
	}
}


export default RootRouterContainer;