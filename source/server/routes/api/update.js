// import external
import koaRouter from 'koa-router';

// import internal
import domainDatabase from '../../database/domains';
import {getIP} from '../../utilities';

// routes
const router = koaRouter();

router.get('/:token', function * () {

	const {token} = this.params;
	const ip = getIP(this);

	try {
		const result = yield domainDatabase.update({token, ip});
		this.body = result;
	} catch (error) {
		this.body = {
			error: 'something went wrong'
		};
		this.status = 500;
	}
});

export default router;
