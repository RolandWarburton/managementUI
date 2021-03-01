import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// When https://github.com/mui-org/material-ui/issues/13394 gets fixed, replace the <> tags with <React.strict>
// Until then this fixes the findDOMNode is deprecated in StrictMode warning https://github.com/Yuvaleros/material-ui-dropzone/issues/250 in MUI
ReactDOM.render(
	<>
		<App />
	</>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
