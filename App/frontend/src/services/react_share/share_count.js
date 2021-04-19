import React from 'react';
import {
	FacebookShareCount,
	// HatenaShareCount,
	// OKShareCount,
	// PinterestShareCount,
	// RedditShareCount,
	// TumblrShareCount,
	// VKShareCount
} from "react-share";

class ShareCounts extends React.Component {
 
	render() {
		return (

// option 1
			<FacebookShareCount 
				url={"https://www.YOUR_URL.com"}
			/>

// option 2
			<FacebookShareCount url={shareUrl}>
				{shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
			</FacebookShareCount>
		)
	}
}
 
export default ShareCounts;