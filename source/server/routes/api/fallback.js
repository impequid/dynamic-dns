// import external

import koaRouter from 'koa-router';
import koaBody from 'koa-body';

// import internal

import {removeLogin, login} from '../../utilities';
import actions from '../../actions';

// routes

const router = koaRouter();
const body = koaBody();

router.post('/addSubdomain', login, body, function * () {

	const {subdomain} = this.request.body;

	try {
		yield actions.domain.add({
			user: this.user,
			subdomain
		});
		this.redirect(`/dashboard/domains/${subdomain}`);
	} catch (error) {
		actions.error.couldNotAddDomain(this, error);
	}
});

router.get('/removeSubdomain/:token', login, function * () {
	try {
		yield actions.domain.remove({
			token: this.params.token
		});
		this.redirect('/dashboard/domains');
	} catch (error) {
		// TODO differentiate these errors
		// actions.error.couldNotRemoveFromCloudFlare(this, error);
		actions.error.couldNotRemoveDatabaseEntry(this, error);
	}
});

router.get('/newToken/:token', login, function * () {
	try {
		const {subdomain} = yield actions.domain.refreshToken({
			token: this.params.token
		});
		this.redirect(`/dashboard/domains/${subdomain}`);
	} catch (error) {
		actions.error.couldNotRefreshToken(this, error);
	}
});

router.get('/logout', function * () {

	removeLogin(this);

	this.redirect('/');

});

// export

export default router;
