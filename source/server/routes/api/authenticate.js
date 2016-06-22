// import external
import koaRouter from 'koa-router';
import koaBody from 'koa-body';
import recaptchaValidator from 'recaptcha-validator';
import React from 'react';
import ReactDOM from 'react-dom/server';
import request from 'superagent';
import ImpequidAPI from 'impequid-api';

// import internal

import config from '../../config';
import {applyLogin, getIP, removeLogin} from '../../utilities';
import impequidDatabase from '../../database/impequid';

// components

import Captcha from '../../apps/captcha';

// routes
const router = koaRouter();
const body = koaBody();

/**
 * @description react authentication app with captcha for new users
 */
router.get('/:token@:server', function * () {

	const {token, server} = this.params;

	try {
		const impequidResponse = yield (async function () {
			const iqa = new ImpequidAPI({token, server, debug: true});
			iqa.token = await iqa.getBackgroundToken();
			const user = await iqa.getUser();
			return {
				id: user.id,
				token: iqa.token
			};
		})();

		try { // returning user
			const user = yield impequidDatabase.getUser({
				impequidId: impequidResponse.id,
				impequidServer: server
			});
			try {
				yield impequidDatabase.setUser({
					impequidId: impequidResponse.id,
					impequidServer: server,
					impequidToken: impequidResponse.token
				});
				applyLogin(this, user);
				this.redirect('/dashboard');
			} catch (error) {
				console.log(error);
				this.body = {
					error: 'could not update token'
				};
				this.status = 500;
			}
		} catch (error) { // new user
			this.body = ReactDOM.renderToString(
				<Captcha initialState={{
					server,
					token: impequidResponse.token,
					user: impequidResponse.id,
					reCaptchaKey: config.reCaptcha.public,
					links: config.links,
					serverName: config.server.name
				}}/>
			);
		}
	} catch (error) {
		this.body = {
			error: 'Could not verify impequid token.'
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

	// verify captcha

	console.log(captcha, token, server);

	try {
		yield recaptchaValidator.promise(config.reCaptcha.secret, captcha, ip);

		// verify token

		try {
			const id = yield (async function (resolve, reject) {
				const iqa = new ImpequidAPI({token, server, debug: true});
				const user = await iqa.getUser();
				console.log(user);
				return user.id
			})();

			const entry = yield impequidDatabase.setUser({
				impequidId: id,
				impequidServer: server,
				impequidToken: token
			});

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

/**
 * @description logout
 */
router.delete('/', function * () {

	removeLogin(this);

});

export default router;
