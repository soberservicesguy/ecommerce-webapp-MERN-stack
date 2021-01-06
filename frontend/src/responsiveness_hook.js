import React from 'react';
import { useMediaQuery } from 'react-responsive'

function withResponsiveness(Component) {
  return function WrappedComponent(props) {

// using all hooks from useMediaQuery

  	const _smStart = useMediaQuery({ query: '(min-width: 601px)' }) 
  	const _smEnd = useMediaQuery({ query: '(max-width: 960px)' }) 
    
		const _mdStart = useMediaQuery({ query: '(min-width: 961px)' }) 
  	const _mdEnd = useMediaQuery({ query: '(max-width: 1280px)' })

		const _lgStart = useMediaQuery({ query: '(min-width: 1281px)' }) 
  	const _lgEnd = useMediaQuery({ query: '(max-width: 1920px)' })

  	const _xs = useMediaQuery({ query: '(max-width: 600px)' }) 
    const _sm = _smStart && _smEnd 
  	const _md = _mdStart && _mdEnd
  	const _lg = _lgStart && _lgEnd
		const _xl = useMediaQuery({ query: '(min-width: 1921px)' })   	

  	// const isDesktopOrLaptop = useMediaQuery({
  	//     query: '(min-device-width: 1224px)'
  	//   })

    // const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })

    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    // const isTabletOrMobileDevice = useMediaQuery({
    //   query: '(max-device-width: 1224px)'
    // })

    // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })


    // const myHookValue = useMyHook();

    return (
// including all hooks to be used with the component
    	<Component 
				{...props}
				_xs={_xs} 
				_sm={_sm}
				_md={_md}
				_lg={_lg}
				_xl={_xl}
				// isDesktopOrLaptop={isDesktopOrLaptop} 
				// isBigScreen={isBigScreen}
				// isTabletOrMobile={isTabletOrMobile}
				// isTabletOrMobileDevice={isTabletOrMobileDevice}
				// isPortrait={isPortrait}
				// isRetina={isRetina}
			/>
		)
	}
}

export default withResponsiveness;

// class MyDiv extends React.Component {
//   render(){
//     const myHookValue = this.props.myHookValue;
//     return <div>{myHookValue}</div>;
//   }
// }

// export default withMyHook(MyDiv);