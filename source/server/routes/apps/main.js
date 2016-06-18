// import external

import ReactDOM from 'react-dom/server';
import React from 'react';

// import internal

import config from '../../config';
import {getUser} from '../../utilities';
import domainDatabase from '../../database/domains';

// components

import MainComponent from '../../apps/main';

// routes

export default function * render () {
	const path = this.url;

	const user = getUser(this);

	if (user.valid) {
		try {
			const domains = yield domainDatabase.list({user});
			try {
				this.body = ReactDOM.renderToStaticMarkup(
					<MainComponent path={path} initialState={{
						server: {
							name: config.server.name,
							domain: config.domain,
							url: config.server.url,
							maxDomains: config.maxDomains
						},
						domains,
						impequid: config.impequid,
						user
					}}/>
				);
			} catch (error) {
				this.body = {
					error: 'could not render app'
				};
				this.status = 500;
			}
		} catch (error) {
			this.body = {
				error: 'could not fetch domains'
			};
			this.status = 500;
		}
	} else {
		// redirect when accessing logged-in-only resources
		if (['/'].indexOf(this.path) !== -1) {
			this.body = ReactDOM.renderToStaticMarkup(
				<MainComponent path={path} initialState={{
					server: {
						name: config.server.name,
						domain: config.domain,
						url: config.server.url
					},
					impequid: config.impequid
				}}/>
			);
		} else {
			this.redirect('/');
		}
	}
}
