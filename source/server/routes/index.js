// import external

import koaRouter from 'koa-router';

// import internal

import domainRouter from './api/domains';
import updateRouter from './api/update';
import authenticateRouter from './api/authenticate';
import fallbackRouter from './api/fallback';

import mainApp from './apps/main';

// setup main router

const router = koaRouter();

/* /favicon */

router.get('/favicon.ico', function * () {
	this.redirect('https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/12-cube.svg/64px-12-cube.svg.png');
});

// api

router.use('/api/domain', domainRouter.routes(), domainRouter.allowedMethods());
router.use('/api/update', updateRouter.routes(), updateRouter.allowedMethods());
router.use('/api/authenticate', authenticateRouter.routes(), authenticateRouter.allowedMethods());
router.use('/api/fallback', fallbackRouter.routes(), fallbackRouter.allowedMethods());

// main app

router.get('/', mainApp);
router.get('/dashboard', function * () {
	this.redirect('/dashboard/domains');
});
router.get('/dashboard*', mainApp);

// export

export default router;
