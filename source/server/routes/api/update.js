// import external

import koaRouter from 'koa-router';

// import internal

import {getIP} from '../../utilities';
import actions from '../../actions';

// routes

const router = koaRouter();

router.get('/:token', function * () {
	try {
		this.body = yield actions.domain.update({
			token: this.params.token,
			ip: getIP(this)
		});
	} catch (error) {
		actions.error.couldNotUpdateDomain(this, error);
	}
});

// export

export default router;
