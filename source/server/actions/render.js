// import external

import React from 'react';
import ReactDOM from 'react-dom/server';

// import internal

import actions from './';

// import components

import Captcha from '../apps/captcha';
import Main from '../apps/main';

// functions

export function captcha ({server, impequidResponse}) {
	return ReactDOM.renderToString(
		<Captcha initialState={actions.hydrate.captcha({
			server,
			impequidResponse
		})}/>
	);
}

export async function main ({path, user}) {
	return ReactDOM.renderToStaticMarkup(
		<Main path={path} initialState={
			await actions.hydrate.main({user})
		}/>
	)
}

// export

const exported = {
	captcha,
	main
};

export default exported;
