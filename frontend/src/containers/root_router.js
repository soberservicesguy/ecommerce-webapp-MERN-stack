import React, {Component} from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";

import {
	MyResponsiveNavigation,
	FooterContainer,
} from "./"

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

	ConnectedHomeContainer,
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
					<div style={{width:'95%', margin:'auto'}}>
						<MyResponsiveNavigation/>
					</div>

					<Switch>

						<Route exact path="/signup">
							<ConnectedSignUpContainer/>
						</Route>

						<Route exact path="/login">
							<ConnectedLoginContainer/>
						</Route>


						<Route exact path="/home">
							<ConnectedHomeContainer/>
						</Route>



						<Route exact path="/products">
							<ConnectedProductContainer/>
						</Route>

						<Route path="/products/:id">
							<ConnectedIndividualProduct/>
						</Route>



						<Route exact path="/blogposts">
							<ConnectedBlogPostContainer/>
						</Route>

						<Route path="/Individual-BlogPost">
							<ConnectedIndividualBlogPost/>
						</Route>



						<Route exact path="/cart">
							<ConnectedCartContainer/>
						</Route>

						<Route exact path="/orders">
							<ConnectedOrderContainer/>
						</Route>


						<Route path="/orders/:endpoint-param">
							<ConnectedIndividualOrder/>
						</Route>




						<Route exact path="/Bulk-Upload-Blogpost">
							<ConnectedBulkBlogpostUpload/>
						</Route>

						<Route exact path="/Bulk-Upload-Carousel">
							<ConnectedBulkCarouselUpload/>
						</Route>

						<Route exact path="/Bulk-Upload-Product">
							<ConnectedBulkProductUpload/>
						</Route>


					{/* in case no match made in route */}
						<Route path="/*">
							<ConnectedHomeContainer/>
						</Route>

					</Switch>

					<div style={{backgroundColor: 'black'}}>
						<FooterContainer/>
					</div>

				</div>
			</Router>
		);
	}
}


export default RootRouterContainer;






// 		const handleProfileMenuOpen = (event) => {
// 			this.setState(
// 				prev => (
// 					{
// 						...prev,
// 						anchorEl:  event.currentTarget
// 					}
// 				),
// 			);
// 		};
// 		const handleMobileMenuClose = () => {
// 			this.setState(
// 				prev => (
// 					{
// 						...prev,
// 						mobileMoreAnchorEl: null
// 					}
// 				),
// 			);			
// 		};
// 		const handleMenuClose = () => {
// 			this.setState(
// 				prev => (
// 					{
// 						...prev,
// 						anchorEl: null
// 					}
// 				),
// 			);
// 			handleMobileMenuClose();
// 		};
// 		const handleMobileMenuOpen = (event) => {
// 			this.setState(
// 				prev => (
// 					{
// 						...prev,
// 						mobileMoreAnchorEl: event.currentTarget
// 					}
// 				),
// 			);
// 		};

// //  -------------- A MENU WHICH SHOWS UP WHEN YOU CLICK THE LAST ICON ON APP BAR ON DESKTOP STARTS HERE ------------- 
// 		const menuId = 'primary-search-account-menu';
// 		const renderMenu = (
// 			<Menu
// 				anchorEl={this.state.anchorEl}
// 				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
// 				id={menuId}
// 				keepMounted
// 				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
// 				open={ Boolean(this.state.anchorEl) }
// 				onClose={handleMenuClose}
// 			>
// 				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
// 				<MenuItem onClick={handleMenuClose}>My account</MenuItem>
// 			</Menu>
// 		);
// //  -------------- A MENU WHICH SHOWS UP WHEN YOU CLICK THE LAST ICON ON APP BAR ON DESKTOP ENDS HERE ------------- 


// //  -------------- A MENU WHICH SHOWS UP WHEN YOU CLICK THE LAST ICON ON APP BAR ON MOBILE STARTS HERE ------------- 
// 		const mobileMenuId = 'primary-search-account-menu-mobile';
// 		const renderMobileMenu = (
// 			<Menu
// 				anchorEl={this.state.mobileMoreAnchorEl}
// 				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
// 				id={mobileMenuId}
// 				keepMounted
// 				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
// 				open= { Boolean(this.state.mobileMoreAnchorEl) }
// 				onClose={handleMobileMenuClose}
// 			>
// 				<MenuItem>
// 					<IconButton aria-label="show 4 new mails" color="inherit">
// 						<Badge badgeContent={4} color="secondary">
// 							<MailIcon />
// 						</Badge>
// 					</IconButton>
// 					<p style={{position:'relative', top:10}} >Messages</p>
// 				</MenuItem>
// 				<MenuItem>
// 					<IconButton aria-label="show 11 new notifications" color="inherit">
// 						<Badge badgeContent={11} color="secondary">
// 							<NotificationsIcon />
// 						</Badge>
// 					</IconButton>
// 					<p style={{position:'relative', top:10}}>Notifications</p>
// 				</MenuItem>
// 				<MenuItem onClick={handleProfileMenuOpen}>
// 					<IconButton
// 						aria-label="account of current user"
// 						aria-controls="primary-search-account-menu"
// 						aria-haspopup="true"
// 						color="inherit"
// 					>
// 						<AccountCircle />
// 					</IconButton>
// 					<p style={{position:'relative', top:10}}>Profile</p>
// 				</MenuItem>
// 			</Menu>
// 		);
// //  -------------- A MENU WHICH SHOWS UP WHEN YOU CLICK THE LAST ICON ON APP BAR ON MOBILE ENDS HERE ------------- 	  








// 					<AppBar position="static">
// 						<Toolbar>
// 							<IconButton
// 								edge="start"
// 								className={classes.menuButton}
// 								color="inherit"
// 								aria-label="open drawer"
// 							>
// 								<MenuIcon />
// 							</IconButton>
							
// 							<Typography className={classes.title} variant="h6" noWrap>
// 								Material-UI
// 							</Typography>
							
// 							<div className={classes.search}>
// 								<div className={classes.searchIcon}>
// 									<SearchIcon />
// 								</div>
// 								<InputBase
// 									placeholder="Search…"
// 									classes={{
// 										root: classes.inputRoot,
// 										input: classes.inputInput,
// 									}}
// 									inputProps={{ 'aria-label': 'search' }}
// 								/>
// 							</div>
							
// 							<div className={classes.grow} />
							
// 							<div className={classes.sectionDesktop}>


// {/* ------------ MENU OPTIONS STARTS HERE ------------ */}						
// 								<Link to="/signup">
// 									<IconButton aria-label="show 4 new mails" color="inherit">
// 										<p>
// 											SIGNUP
// 										</p>

// 									</IconButton>
// 								</Link>

// 								<Link to="/login">
// 									<IconButton aria-label="show 4 new mails" color="inherit">
// 										<p>
// 											LOGIN
// 										</p>

// 									</IconButton>
// 								</Link>

// 								<Link to="/blogposts">
// 									<IconButton aria-label="show 4 new mails" color="inherit">
// 										<p>
// 											BlogPost
// 										</p>

// 									</IconButton>
// 								</Link>

// 								<Link to="/products">
// 									<IconButton aria-label="show 4 new mails" color="inherit">
// 										<p>
// 											Product
// 										</p>

// 									</IconButton>
// 								</Link>

// 								<Link to="/cart">
// 									<IconButton aria-label="show 4 new mails" color="inherit">
// 										<p>
// 											Cart
// 										</p>

// 									</IconButton>
// 								</Link>

// 								<Link to="/orders">
// 									<IconButton aria-label="show 4 new mails" color="inherit">
// 										<p>
// 											Order
// 										</p>

// 									</IconButton>
// 								</Link>
							
// 								<Link to="/home">
// 									<IconButton aria-label="show 17 new notifications" color="inherit">
// 										<Badge badgeContent={17} color="secondary">
// 											<NotificationsIcon />
// 										</Badge>
// 									</IconButton>
// 								</Link>
							
							
// 							</div>

// 						</Toolbar>

// {/* ------------ SUB MENUS WHEN YOU CLICK THE LAST BUTTON IN MENU STARTS HERE ------------ */}
// 						{renderMobileMenu}
// 						{renderMenu}
// {/* ------------ SUB MENUS WHEN YOU CLICK THE LAST BUTTON IN MENU STARTS HERE ------------ */}						

// 					</AppBar>



// import {
// 	AppBar,
// 	Toolbar,
// 	IconButton,
// 	Typography,
// 	InputBase,
// 	Badge,
// 	MenuItem,
// 	Menu,
// } from '@material-ui/core';

// import { fade } from '@material-ui/core/styles';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
