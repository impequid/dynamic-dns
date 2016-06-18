// import external
import koaRouter from 'koa-router';

// setup main router

const router = koaRouter();

/* /favicon */

router.get('/favicon.ico', function * () {
	this.redirect('https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/12-cube.svg/64px-12-cube.svg.png');
});

/* /api/domains */

import domainRouter from './api/domains';
router.use('/api/domain', domainRouter.routes(), domainRouter.allowedMethods());

/* /api/update */

import updateRouter from './api/update';
router.use('/api/update', updateRouter.routes(), updateRouter.allowedMethods());

/* /api/authenticate */

import authenticateRouter from './api/authenticate';
router.use('/api/authenticate', authenticateRouter.routes(), authenticateRouter.allowedMethods());

/* /api/fallback */

import fallbackRouter from './api/fallback';
router.use('/api/fallback', fallbackRouter.routes(), fallbackRouter.allowedMethods());

/* / */

import mainApp from './apps/main';
router.get('/', mainApp);
router.get('/dashboard', function * () {
	this.redirect('/dashboard/domains');
});
router.get('/dashboard*', mainApp);

// export

export default router;
