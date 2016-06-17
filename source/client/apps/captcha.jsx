import ReactDOM from 'react-dom';
import React from 'react';
import App from '../components/captcha';
import actions from '../actions/captcha';

window.onload = () => {
	actions.hydrate(window.INITIAL_STATE);

	ReactDOM.render(
		<App history={true}/>,
		document.getElementById('app')
	);
};
