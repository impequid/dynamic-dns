// import external
import koaRouter from 'koa-router';
import koaBody from 'koa-body';

// import internal
import domains from '../domains';
import domainDatabase from '../database/domains';
import {loginify} from '../utilities';

// routes
const router = koaRouter();
const body = koaBody();

/**
 * @list all domains for the current user
 */
router.get('/', function * () {

	const k = this;
	yield loginify(this, async function (user) {
		try {

			const list = await domainDatabase.list(user);
			k.body = list;

		} catch (exception) {
			console.error(exception);
			k.body = 'something went wrong';
			k.status = 401;
		}
	});

});

router.delete('/', body, function * (next) {

	const {subdomain} = this.request.body;
	const {name} = this.session;

	try {
		yield domains.remove(name, subdomain);
		this.body = 'success';
	} catch (exception) {
		console.error(exception);
		this.body = 'something went wrong';
		this.status = 500;
	}

});

router.put('/', body, function * (next) {

	const {subdomain} = this.request.body;
	const {name} = this.session;

	try {

		console.log(`${name} trying to add ${subdomain}`);

		const newDomain = yield domains.add(name, subdomain);
		this.body = newDomain.token;

	} catch (exception) {
		this.body = 'something went wrong';
		this.status = 403;
	}

});

router.post('/', body, function * (next) {
	const {subdomain} = this.request.body;
	const {name} = this.session;

	try {
		const token = yield domains.newToken(name, subdomain);
		this.body = token
	} catch (exception) {
		this.body = 'something went wrong';
		this.status = 500;
	}

});

export default router;
