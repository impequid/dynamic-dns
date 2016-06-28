// import external

import koaRouter from 'koa-router';
import koaBody from 'koa-body';

// import internal

import config from '../../config';
import {applyLogin, getIP, removeLogin} from '../../utilities';
import impequidDatabase from '../../database/impequid';
import actions from '../../actions';

// routes

const router = koaRouter();
const body = koaBody();

/**
 * @description react authentication app with captcha for new users
 */
router.get('/:token@:server', function * () {

	const {token, server} = this.params;

	try {
		const impequidResponse = yield actions.impequid.verify({token, server});

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
				actions.error.couldNotUpdateToken(this, error);
			}
		} catch (error) { // new user
			this.body = actions.render.captcha({server, impequidResponse});
		}
	} catch (error) {
		actions.error.couldNotVerifyImpequidToken(this, error);
	}
});

/**
 * @description after finishing captcha
 */
router.post('/finish', body, function * () {

	const {captcha, token, server} = this.request.body;

	try { // verify captcha
		yield actions.captcha.verify({
			captcha,
			ip: getIP(this)
		});
		try { // verify token
			const id = yield actions.impequid.getUserID({token, server});

			const entry = yield impequidDatabase.setUser({
				impequidId: id,
				impequidServer: server,
				impequidToken: token
			});

			applyLogin(this, entry);

			actions.success.generic(this);
		} catch (error) {
			actions.error.invalidToken(this, error);
		}

	} catch (error) {
		actions.error.captchaFailed(this, error);
	}
});

/**
 * @description logout
 * @http DELETE /api/authenticate
 */
router.delete('/', function * () {
	removeLogin(this);
	actions.success.generic(this);
});

export default router;
