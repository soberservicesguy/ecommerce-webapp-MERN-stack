
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Router, Route} from 'react-router-dom'
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
// IMPORT store
import {store} from "./redux_stuff/store_configuration";
// IMPORT ConnectedAppContainer
import {
	ConnectedRootRouterContainer,
} from "./redux_stuff/connected_components";

import { RootRouter } from "./containers/";

// IMPORT themeprovider for material ui
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./material_ui_theme";

export default function App() {
  return (
    <Provider store={store}>
	    <ThemeProvider theme={theme}>
		    <ConnectedRootRouterContainer/>
	    </ThemeProvider>
    </Provider>
  );
}
