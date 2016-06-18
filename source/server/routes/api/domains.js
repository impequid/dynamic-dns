// import external
import koaRouter from 'koa-router';
import koaBody from 'koa-body';

// import internal
import domains from '../../domains';
import domainDatabase from '../../database/domains';
import {loginify} from '../../utilities';

// routes
const router = koaRouter();
const body = koaBody();

/**
 * @description list all domains for the current user
 * @http GET /api/domains/
 */
router.get('s/', function * () {

	const k = this;
	yield loginify(this, async function (user) {
		try {

			const list = await domainDatabase.list({user});
			k.body = list;

		} catch (exception) {
			console.error(exception);
			k.body = {
				error: 'something went wrong'
			};
			k.status = 500;
		}
	});

});

/**
 * @description delete a subdomain
 * @http DELETE /api/domain/:token
 */
router.delete('/:token', function * () {
	yield loginify(this, removeSubdomain.bind(this));
});

export async function removeSubdomain (user) {
	const {token} = this.params;

	try {

		const entry = await domainDatabase.remove({token});

		try {
			await domains.remove({
				subdomain: entry.subdomain
			});
			if (this.fallback) {
				this.redirect('/dashboard/domains');
			} else {
				this.body = {
					success: true
				};
			}
		} catch (error) {
			this.body = {
				error: 'could not remove IP from CloudFlare'
			};
			this.status = 500;
		}
	} catch (error) {
		this.body = {
			error: 'could not remove database entry'
		};
		this.status = 500;
	}
}

/**
 * @description add a new subdomain
 * @http PUT /api/domain/
 */
router.put('/', body, function * () {
	yield loginify(this, addSubdomain.bind(this));
});

export async function addSubdomain (user) {
	const {subdomain} = this.request.body;

	try {

		console.log(`${user.impequidId}@${user.impequidServer} trying to add ${subdomain}`);

		const newDomain = await domainDatabase.add({user, subdomain});

		if (this.fallback) {
			this.redirect(`/dashboard/domains/${subdomain}`)
		} else {
			this.body = newDomain;
		}

	} catch (error) {
		console.error(error);
		this.body = {
			error: 'something went wrong'
		};
		this.status = 403;
	}
}

/**
 * @description get a new token for a domain
 * @http POST /api/domain/:token
 */
router.post('/:token', function * () {
	yield loginify(this, newToken.bind(this));
});

export async function newToken (user) {
	const {token} = this.params;

	try {
		const newToken = await domainDatabase.newToken({token});
		if (this.fallback) {
			this.redirect(`/dashboard/domains/${newToken.subdomain}`);
		} else {
			this.body = newToken;
		}
	} catch (exception) {
		this.body = {
			error: 'something went wrong'
		};
		this.status = 500;
	}
}

export default router;
