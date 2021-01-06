import React from 'react';
import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	FacebookMessengerShareButton,
	WhatsappShareButton,
	PinterestShareButton,
	EmailShareButton,
} from "react-share";

class ShareOnPlatform extends React.Component {
 
	render() {
		return (
			<FacebookShareButton
				url={"https://www.YOUR_URL.com"}
				quote={"say something"}
				hashtag={"#eatRight"}
			/>
		)
	}
}
 
export default ShareOnPlatform;