// import external
import koaRouter from 'koa-router';
import koaBody from 'koa-body';
import recaptchaValidator from 'recaptcha-validator';
import React from 'react';
import ReactDOM from 'react-dom/server';
import request from 'superagent';

// import internal

import config from '../config';
import {applyLogin, getIP} from '../utilities';
import impequidDatabase from '../database/impequid';

// components

import Captcha from '../apps/captcha';

// routes
const router = koaRouter();
const body = koaBody();

/**
 * @description react authentication app with captcha for new users
 */
router.get('/:token@:server', function * () {
	const {token, server} = this.params;

	try {
		const impequidResponse = yield new Promise((resolve, reject) => {
			request
				.get(`http://${server}/api/external/verify`)
				.set('token', token)
				.end((error, response) => {
					if (!error) {
						resolve(response.body);
					} else {
						reject(error);
					}
				});
		});

		try { // returning user
			const user = yield impequidDatabase.getUser({
				impequid: {
					id: impequidResponse.user,
					server
				}
			});
			applyLogin(this, user);
			this.redirect('/');
		} catch (error) { // new user
			this.body = ReactDOM.renderToString(
				<Captcha initialState={{
					server,
					token,
					user: impequidResponse.id,
					reCaptchaKey: config.reCaptcha.public,
					links: config.links,
					serverName: config.server.name
				}}/>
			);
		}
	} catch (error) {
		this.body = {
			error: 'Could not contact impequid server, is it down?'
		};
		this.status = 500;
	}
});

/**
 * @description after finishing captcha
 */
router.post('/finish', body, function * () {
	const {captcha, token, server} = this.request.body;
	const ip = getIP(this);

	console.log(captcha, token, server);

	// verify captcha

	try {
		// yield recaptchaValidator.promise(config.reCaptcha.secret, captcha, ip);

		// verify token

		try {
			const impequidResponse = yield new Promise((resolve, reject) => {
				request
					.get(`http://${server}/api/external/verify`)
					.set('token', token)
					.end((error, response) => {
						if (!error) {
							resolve(response.body);
						} else {
							reject(error);
						}
					});
			});

			const entry = yield impequidDatabase.setUser({
				impequid: {
					id: impequidResponse.user,
					server,
					token
				}
			});

			console.log(entry);

			applyLogin(this, entry);

			this.body = {
				success: true
			};
		} catch (error) {
			console.error(error);
			this.body = {
				error: 'invalid token'
			};
			this.status = 403;
		}

	} catch (error) {
		this.body = {
			error: 'captcha failed'
		};
		this.status = 403;
	}
});

export default router;
