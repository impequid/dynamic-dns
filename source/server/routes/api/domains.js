// import external

import koaRouter from 'koa-router';
import koaBody from 'koa-body';

// import internal

import {login} from '../../utilities';
import actions from '../../actions';

// routes

const router = koaRouter();
const body = koaBody();

/**
 * @description list all domains for the current user
 * @http GET /api/domains/
 */
router.get('s/', login, function * () {
	try {
		this.body = yield actions.domain.list({
			user: this.user
		});
	} catch (error) {
		actions.error.couldNotGetDomains(this, error);
	}
});

/**
 * @description delete a subdomain
 * @http DELETE /api/domain/:token
 */
router.delete('/:token', login, function * () {
	try {
		yield actions.domain.remove({
			token: this.params.token
		});
		actions.success.generic(this);
	} catch (error) {
		// TODO differentiate these errors
		// actions.error.couldNotRemoveFromCloudFlare(this, error);
		actions.error.couldNotRemoveDatabaseEntry(this, error);
	}
});

/**
 * @description add a new subdomain
 * @http PUT /api/domain/
 */
router.put('/', login, body, function * () {
	try {
		this.body = yield actions.domain.add({
			user: this.user,
			subdomain: this.request.body.subdomain
		});
	} catch (error) {
		actions.error.couldNotAddDomain(this, error);
	}
});

/**
 * @description get a new token for a domain
 * @http POST /api/domain/:token
 */
router.post('/:token', login, function * () {
	try {
		this.body = yield actions.domain.refreshToken({
			token: this.params.token
		});
	} catch (error) {
		actions.error.couldNotRefreshToken(this, error);
	}
});

export default router;
