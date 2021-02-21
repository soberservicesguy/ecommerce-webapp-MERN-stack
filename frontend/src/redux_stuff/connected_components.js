
import { connect } from "react-redux";
import {mapStateToProps, mapDispatchToProps} from "./store_configuration";

import {

	RootRouterContainer,
	SignUpContainer,
	CarouselContainer,
	IndividualCarousel,
	ProductContainer,
	IndividualProduct,
	OrderContainer,
	IndividualOrder,
	BlogPostContainer,
	IndividualBlogPost,
	CartContainer,
	IndividualCartItem,	
	LoginContainer,

	HomeContainer,

} from "../containers";





import {
	CreateCarousel,
	ComponentForShowingCarousel,
	CarouselCard,
} from "../components/carousels"

import {
	CreateProduct,
	ComponentForShowingProduct,
	ProductCard,
} from "../components/products"

import {
	CreateOrder,
	ComponentForShowingOrder,
	OrderCard,
} from "../components/orders"

import {
	CreateBlogPost,
	ComponentForShowingBlogPost,
	BlogPostCard,
} from "../components/blogposts"

import {
	ComponentForShowingCart,
} from "../components/cart"

import {
	BulkBlogpostUpload,
	BulkCarouselUpload,
	BulkProductUpload,
} from "../components/"

export const ConnectedHomeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeContainer);

export const ConnectedRootRouterContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(RootRouterContainer);

export const ConnectedLoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer);


export const ConnectedCreateCarousel = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateCarousel);

export const ConnectedCarouselCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(CarouselCard);

export const ConnectedComponentForShowingCarousel = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingCarousel);

export const ConnectedCreateProduct = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateProduct);

export const ConnectedProductCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductCard);

export const ConnectedComponentForShowingProduct = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingProduct);

export const ConnectedCreateOrder = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateOrder);

export const ConnectedOrderCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(OrderCard);

export const ConnectedComponentForShowingOrder = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingOrder);

export const ConnectedCreateBlogPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateBlogPost);

export const ConnectedBlogPostCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogPostCard);

export const ConnectedComponentForShowingBlogPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingBlogPost);


export const ConnectedIndividualCarousel = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualCarousel);

export const ConnectedCarouselContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CarouselContainer);



export const ConnectedIndividualProduct = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualProduct);

export const ConnectedProductContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductContainer);



export const ConnectedIndividualOrder = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualOrder);

export const ConnectedOrderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(OrderContainer);



export const ConnectedIndividualBlogPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualBlogPost);

export const ConnectedBlogPostContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogPostContainer);


export const ConnectedCartContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CartContainer);

export const ConnectedComponentForShowingCart = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingCart);

export const ConnectedIndividualCartItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualCartItem);

export const ConnectedSignUpContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpContainer);




export const ConnectedBulkBlogpostUpload = connect(
	mapStateToProps,
	mapDispatchToProps
)(BulkBlogpostUpload);


export const ConnectedBulkCarouselUpload = connect(
	mapStateToProps,
	mapDispatchToProps
)(BulkCarouselUpload);


export const ConnectedBulkProductUpload = connect(
	mapStateToProps,
	mapDispatchToProps
)(BulkProductUpload);
