// import external

import koaRouter from 'koa-router';
import koaBody from 'koa-body';

// import internal

import {addSubdomain, removeSubdomain, newToken} from './domains';
import {loginify, removeLogin} from '../../utilities';

// routes

const router = koaRouter();
const body = koaBody();

router.post('/addSubdomain', body, function * () {

	this.fallback = true;
	yield loginify(this, addSubdomain.bind(this));

});

router.get('/removeSubdomain/:token', body, function * () {

	this.fallback = true;
	yield loginify(this, removeSubdomain.bind(this));

});

router.get('/newToken/:token', body, function * () {

	this.fallback = true;
	yield loginify(this, newToken.bind(this));

});

router.get('/logout', function * () {

	removeLogin(this);

	this.redirect('/');

});

// export

export default router;
