
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
		useParams,
		useRouteMatch
} from "react-router-dom";

import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	InputBase,
	Badge,
	MenuItem,
	Menu,
} from '@material-ui/core';

import { fade } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

// IMPORT CONNECTED CONTAINERS
import {
	ConnectedLoginContainer,
	ConnectedCarouselContainer,
	ConnectedIndividualCarousel,
	ConnectedProductContainer,
	ConnectedIndividualProduct,
	ConnectedCartContainer,
	ConnectedIndividualCartItem,
	ConnectedOrderContainer,
	ConnectedIndividualOrder,
	ConnectedBlogPostContainer,
	ConnectedIndividualBlogPost,
} from "../redux_stuff/connected_components";

// IMPORT material-ui stuff
import { withStyles } from '@material-ui/styles';
import { Grid, Button } from "@material-ui/core";
// IMPORT responsiveness hook
import withResponsiveness from "../responsiveness_hook";


const styles = theme => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade( theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade( theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
});



class RootRouterContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			anchorEl:null,
			mobileMoreAnchorEl:null,
		}

	}

	render() {

	    const { classes } = this.props;

		const handleProfileMenuOpen = (event) => {
			this.setState(
				prev => (
					{
						...prev,
						anchorEl:  event.currentTarget
					}
				),
			);
		};
		const handleMobileMenuClose = () => {
			this.setState(
				prev => (
					{
						...prev,
						mobileMoreAnchorEl: null
					}
				),
			);			
		};
		const handleMenuClose = () => {
			this.setState(
				prev => (
					{
						...prev,
						anchorEl: null
					}
				),
			);
			handleMobileMenuClose();
		};
		const handleMobileMenuOpen = (event) => {
			this.setState(
				prev => (
					{
						...prev,
						mobileMoreAnchorEl: event.currentTarget
					}
				),
			);
		};

//  -------------- A MENU WHICH SHOWS UP WHEN YOU CLICK THE LAST ICON ON APP BAR ON DESKTOP STARTS HERE ------------- 
		const menuId = 'primary-search-account-menu';
		const renderMenu = (
			<Menu
				anchorEl={this.state.anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				id={menuId}
				keepMounted
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={ Boolean(this.state.anchorEl) }
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
				<MenuItem onClick={handleMenuClose}>My account</MenuItem>
			</Menu>
		);
//  -------------- A MENU WHICH SHOWS UP WHEN YOU CLICK THE LAST ICON ON APP BAR ON DESKTOP ENDS HERE ------------- 


//  -------------- A MENU WHICH SHOWS UP WHEN YOU CLICK THE LAST ICON ON APP BAR ON MOBILE STARTS HERE ------------- 
		const mobileMenuId = 'primary-search-account-menu-mobile';
		const renderMobileMenu = (
			<Menu
				anchorEl={this.state.mobileMoreAnchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				id={mobileMenuId}
				keepMounted
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open= { Boolean(this.state.mobileMoreAnchorEl) }
				onClose={handleMobileMenuClose}
			>
				<MenuItem>
					<IconButton aria-label="show 4 new mails" color="inherit">
						<Badge badgeContent={4} color="secondary">
							<MailIcon />
						</Badge>
					</IconButton>
					<p style={{position:'relative', top:10}} >Messages</p>
				</MenuItem>
				<MenuItem>
					<IconButton aria-label="show 11 new notifications" color="inherit">
						<Badge badgeContent={11} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<p style={{position:'relative', top:10}}>Notifications</p>
				</MenuItem>
				<MenuItem onClick={handleProfileMenuOpen}>
					<IconButton
						aria-label="account of current user"
						aria-controls="primary-search-account-menu"
						aria-haspopup="true"
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
					<p style={{position:'relative', top:10}}>Profile</p>
				</MenuItem>
			</Menu>
		);
//  -------------- A MENU WHICH SHOWS UP WHEN YOU CLICK THE LAST ICON ON APP BAR ON MOBILE ENDS HERE ------------- 	  

		return (
			<Router>
				<div className={classes.grow}>
					<AppBar position="static">
						<Toolbar>
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="open drawer"
							>
								<MenuIcon />
							</IconButton>
							
							<Typography className={classes.title} variant="h6" noWrap>
								Material-UI
							</Typography>
							
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder="Search…"
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									inputProps={{ 'aria-label': 'search' }}
								/>
							</div>
							
							<div className={classes.grow} />
							
							<div className={classes.sectionDesktop}>


{/* ------------ MENU OPTIONS STARTS HERE ------------ */}						

								<Link to="/login">
									<IconButton aria-label="show 4 new mails" color="inherit">
										<p>
											LOGIN
										</p>

									</IconButton>
								</Link>

								<Link to="/carousels">
									<IconButton aria-label="show 4 new mails" color="inherit">
										<p>
											Carousel
										</p>

									</IconButton>
								</Link>

								<Link to="/products">
									<IconButton aria-label="show 4 new mails" color="inherit">
										<p>
											Product
										</p>

									</IconButton>
								</Link>

								<Link to="/carts">
									<IconButton aria-label="show 4 new mails" color="inherit">
										<p>
											Cart
										</p>

									</IconButton>
								</Link>

								<Link to="/orders">
									<IconButton aria-label="show 4 new mails" color="inherit">
										<p>
											Order
										</p>

									</IconButton>
								</Link>

								<Link to="/blogposts">
									<IconButton aria-label="show 4 new mails" color="inherit">
										<p>
											BlogPost
										</p>

									</IconButton>
								</Link>
							
								<Link to="/home">
									<IconButton aria-label="show 17 new notifications" color="inherit">
										<Badge badgeContent={17} color="secondary">
											<NotificationsIcon />
										</Badge>
									</IconButton>
								</Link>
							
								<Link to="/home">
									<IconButton
										edge="end"
										aria-label="account of current user"
										aria-controls={menuId}
										aria-haspopup="true"
										onClick={handleProfileMenuOpen}
										color="inherit"
									>
										<AccountCircle />
									</IconButton>
								</Link>
							
							</div>

{/* ------------ THREE VERTICAL DOTS BUTTON ONLY FOR MOBILE STARTS HERE ------------ */}
							<Link to="/home" className={classes.sectionMobile}> 
								<div className={classes.sectionMobile}>
									<IconButton
										aria-label="show more"
										aria-controls={mobileMenuId}
										aria-haspopup="true"
										onClick={handleMobileMenuOpen}
										color="inherit"
									>
										<MoreIcon />
									</IconButton>
								</div>
							</Link>
{/* ------------ THREE VERTICAL DOTS BUTTON ONLY FOR MOBILE ENDS HERE ------------ */}							

						</Toolbar>

{/* ------------ SUB MENUS WHEN YOU CLICK THE LAST BUTTON IN MENU STARTS HERE ------------ */}
						{renderMobileMenu}
						{renderMenu}
{/* ------------ SUB MENUS WHEN YOU CLICK THE LAST BUTTON IN MENU STARTS HERE ------------ */}						

					</AppBar>


					<Switch>

						<Route exact path="/login">
							<ConnectedLoginContainer/>
						</Route>



						<Route exact path="/carousels">
							<ConnectedCarouselContainer/>
						</Route>



						<Route path="/carousels/:endpoint-param">
							<ConnectedIndividualCarousel/>
						</Route>



						<Route exact path="/products">
							<ConnectedProductContainer/>
						</Route>



						<Route path="/products/:endpoint-param">
							<ConnectedIndividualProduct/>
						</Route>



						<Route exact path="/cart">
							<ConnectedCartContainer/>
						</Route>



						<Route path="/cart/:cart-param">
							<ConnectedIndividualCartItem/>
						</Route>


						<Route exact path="/orders">
							<ConnectedOrderContainer/>
						</Route>



						<Route path="/orders/:endpoint-param">
							<ConnectedIndividualOrder/>
						</Route>



						<Route exact path="/blogposts">
							<ConnectedBlogPostContainer/>
						</Route>



						<Route path="/blogposts/:serial_number-param">
							<ConnectedIndividualBlogPost/>
						</Route>


						{/*<Route path="/home">
							<HomeContainer/>
						</Route>*/}
					</Switch>
				</div>
			</Router>
		);
	}
}


export default withResponsiveness(withStyles(styles)(RootRouterContainer));
// export default RootRouterContainer;
