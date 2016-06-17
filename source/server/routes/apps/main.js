// import external

import koaRouter from 'koa-router';
import ReactDOM from 'react-dom/server';
import React from 'react';

// import internal

import config from '../../config';

// components

import MainComponent from '../../apps/main';

// routes

const router = koaRouter();

router.get('/', render);
router.get('/dashboard', render);

function * render () {
	const path = this.url;

	this.body = ReactDOM.renderToStaticMarkup(
		<MainComponent path={path} initialState={{
			serverName: config.server.name,
			domain: config.domain,
			impequid: config.impequid
		}}/>
	);
}

export default router;
